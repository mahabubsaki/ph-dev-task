'use client';


import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../_hooks/useAuth";
import { useParams } from "next/navigation";
import Editor, { EditorProps, Monaco } from '@monaco-editor/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BadgeAlert, Lock, MessageSquare } from "lucide-react";


import ChatDrawer from "../_components/ChatDrawer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createFeedback } from "../_actions";
import envConfigs from "@/app/_configs/envConfigs";
import axiosSecure from "@/app/_configs/axiosSecureConfig";


interface ChangeItem {
    range: any;
    rangeLength: number;
    text: string;
    owner: string;
    timestamp: number;
}

interface Change {
    changes: ChangeItem[];
    timestamp: number;
}

const applyEdit = (content: string, edit: Record<string, any>) => {
    const { range, text } = edit;
    const startOffset = content.length > 0 ? offsetAt(content, range.startLineNumber, range.startColumn) : 0;
    const endOffset = offsetAt(content, range.endLineNumber, range.endColumn);
    return `${content.substring(0, startOffset)}${text}${content.substring(endOffset)}`;
};
const offsetAt = (content: string, lineNumber: number, column: number) => {
    let line = 1;
    let offset = 0;
    while (line < lineNumber) {
        const index = content.indexOf("\n", offset);
        if (index === -1) { return content.length; }
        offset = index + 1;
        line++;
    }
    return offset + column - 1;
};
const groupChangesByOwnerAndAction = (changes: any[]) => {
    const result = [];
    let currentGroup: any[] = [];
    let currentOwner = changes[0]?.owner;
    // let currentAction = changes[0]?.action;

    changes.forEach(change => {
        // change.owner !== currentOwner || change.action !== currentAction
        if (change.owner !== currentOwner) {
            result.push(currentGroup);
            currentGroup = [];
            currentOwner = change.owner;
            // currentAction = change.action;
        }
        currentGroup.push(change);
    });

    if (currentGroup.length) {
        result.push(currentGroup);
    }

    return result;
};


const SingleProjectPage = () => {
    const { socket, user, handleCodeChange, code, setCode, editorRef } = useAuth();
    const { projectID } = useParams();


    const historyRef = useRef<ChangeItem[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [id, setId] = useState(null);
    const [currentFeedbackId, setCurrentFeedbackId] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [documentMeta, setDocumentMeta] = useState({
        title: '',
        owner: ''
    });

    const [theme, setTheme] = useState('vs-dark');



    const applyChangeLocally = (change: Change) => {
        const { changes, timestamp } = change;
        changes.forEach((changeItem: Record<string, any>) => {
            const { range, rangeLength, text } = changeItem;
            setCode((prevContent: string) =>
                applyEdit(prevContent, { range, rangeLength, text })
            );
        });
        changes[0].timestamp = timestamp;
        console.log({ changes });


        historyRef.current.push(changes[0]);


    };


    function handleEditorDidMount(editor: any, monaco: Monaco) {
        import("monaco-themes/themes/Dracula.json").then((data) => {
            monaco.editor.defineTheme("Blackboard", data as any);
            setTheme('Blackboard');
        });
        editorRef.current = editor;
    }
    const scrollRef = useRef<null | HTMLDivElement>(null);


    const handleInitialDocument = ({ content, changes, title, owner }: {
        content: string;
        changes: ChangeItem[];
        title: string;
        owner: string;

    }) => {
        console.log('initial document', content, changes, title, owner);
        setCode(content);
        setDocumentMeta({ title, owner });
        historyRef.current = changes;

    };
    const handleEditorChange = (change: Change) => {
        console.log(change, 'change');
        // if ((change as Record<string, any>).room !== projectID) return;
        applyChangeLocally(change);

        scrollRef.current && scrollRef.current.scrollIntoView({ behavior: 'smooth' });

    };









    const separatedChanges = groupChangesByOwnerAndAction(historyRef.current);

    const modyFied = separatedChanges.map((item, index) => {
        console.log({ item });

        const message = item[0].owner + ' ' + 'updated' + ' ' + item.length + ' characters';

        if (item[0].action === 'insert') {
            return {
                message,
                code: item[item.length - 1].currentCode,
                startingTime: item[0].timestamp || new Date(),
                id: item[0]._id

            };
        }

    }).filter(item => !!item);
    console.log({ modyFied });

    const { data, refetch } = useQuery({
        queryKey: ['feedbacks', currentFeedbackId, user?.id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(envConfigs.publicApiUrl + `/projects/feedbacks/${currentFeedbackId}?id=${user.id}`);
            return data?.data || [];
        },
        enabled: !!currentFeedbackId,
        initialData: []

    });

    console.log(data);


    const { mutate, isPending } = useMutation({
        mutationKey: ['feedback'],
        mutationFn: createFeedback,
        onSettled: async (data) => {
            setModalOpen(false);
            setFeedbackText('');
            if (!data.success) {
                return toast.error(data.message);
            }
            toast.success(data.message);


            refetch();
            socket.emit('new_feedback_client', 'new feedback created');

        }
    });
    const handleFeedback = () => {
        if (feedbackText.trim() === '') return toast.error('Feedback cannot be empty');
        mutate({ feedback: feedbackText, changeId: id, project: projectID });
    };
    const handleNewFeedback = () => {
        refetch();
    };

    useEffect(() => {
        if (user) {
            socket.emit('join_private', {
                room: projectID,
                user: user
            });
            socket.on('reflact-change', handleCodeChange);
        }

        return () => {
            socket.off('reflact-change', handleCodeChange);


        };
    }, [projectID, user]);

    useEffect(() => {
        socket.on('initial-document', handleInitialDocument);
        socket.on('editor-change', handleEditorChange);
        socket.on('new_feedback', handleNewFeedback);
        return () => {
            socket.off('initial-document', handleInitialDocument);
            socket.off('editor-change', handleEditorChange);
            socket.off('new_feedback', handleNewFeedback);
        };
    }, []);



    return (
        <>

            <div className="flex">
                <div className="w-[66%] overflow-hidden">

                    <Editor
                        height="100dvh"
                        defaultLanguage="javascript"

                        theme={theme}
                        value={code}

                        onChange={(value, event) => {

                            if (event) {
                                const timestamp = new Date();

                                const changes = event.changes.map(change => ({
                                    range: change.range,
                                    rangeLength: change.rangeLength,
                                    text: change.text,
                                    owner: user.username,
                                    action: change.range.startColumn === change.range.endColumn ? 'insert' : 'delete',
                                    currentCode: value,
                                }));


                                const change = {
                                    timestamp,
                                    changes,
                                    document: value,
                                    room: projectID,
                                };

                                socket.emit('editor-change-client', change);
                                // applyChangeLocally(change as any);
                                scrollRef.current && scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        options={{}}
                        onMount={handleEditorDidMount}
                    />


                </div>
                <div className="w-[34%] p-5 h-[100dvh] overflow-y-auto">
                    <h1 className="text-2xl font-bold">History Logs</h1>
                    {documentMeta.title && <div className="flex items-center gap-2">
                        <Lock />
                        <p className="text-xl">Title : <span className="font-bold">{documentMeta.title}</span> created by {documentMeta.owner}</p>
                    </div>}

                    {
                        modyFied.map((item, index) => {
                            return <div key={index} className="flex gap-2 flex-col my-5">
                                <p> {item.message} at {new Date(item.startingTime).toLocaleTimeString()}</p>
                                <SyntaxHighlighter language="javascript" style={dark}>
                                    {item.code}
                                </SyntaxHighlighter>
                                <div className="flex gap-4">
                                    <Button onClick={() => {

                                        setId(item.id);
                                        setModalOpen(true);
                                    }} className="flex-1 flex gap-2 items-center">
                                        <MessageSquare /> Give Feedback
                                    </Button>
                                    <Button onClick={() => {
                                        setCurrentFeedbackId(item.id);
                                        setFeedbackModalOpen(true);
                                    }} className="flex-1 flex gap-2 items-center">
                                        <BadgeAlert /> Check Feedbacks
                                    </Button>
                                </div>
                            </div>;
                        })
                    }
                    <div ref={scrollRef} />
                </div>
            </div>
            <ChatDrawer />
            <Dialog open={modalOpen} onOpenChange={(open) => {

                setModalOpen(open);
                if (!open) {
                    setFeedbackText('');
                    setId(null);
                };
            }}>

                <DialogContent onInteractOutside={() => setModalOpen(false)} className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Provide Feedback</DialogTitle>

                    </DialogHeader>

                    <Label htmlFor="project-name">Feedback</Label>
                    <Input value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} id="project-name" placeholder="Enter project name" />

                    <DialogFooter>
                        <Button onClick={handleFeedback} type="button" disabled={isPending}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={feedbackModalOpen} onOpenChange={(open) => {

                setFeedbackModalOpen(open);
                if (!open) {
                    setId(null);
                };
            }}>

                <DialogContent onInteractOutside={() => setFeedbackModalOpen(false)} className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>All Feedbacks for this code</DialogTitle>

                    </DialogHeader>

                    {
                        data?.map((item: Record<string, any>, index: number) => {
                            return <div key={index} className="flex gap-2 flex-col my-2">
                                <p>{index + 1}. &quot;{item.feedback}&quot; by {item.user.username} at {new Date(item.createdAt).toLocaleTimeString()}</p>
                            </div>;
                        })
                    }
                    {data?.length === 0 && <p>No feedbacks yet</p>}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SingleProjectPage;