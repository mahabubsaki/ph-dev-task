'use client';


import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../_hooks/useAuth";
import { useParams } from "next/navigation";
import Editor from '@monaco-editor/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import ChatDrawer from "../_components/ChatDrawer";
const applyEdit = (content, edit) => {
    const { range, rangeLength, text } = edit;
    const startOffset = content.length > 0 ? offsetAt(content, range.startLineNumber, range.startColumn) : 0;
    const endOffset = offsetAt(content, range.endLineNumber, range.endColumn);
    return `${content.substring(0, startOffset)}${text}${content.substring(endOffset)}`;
};
const offsetAt = (content, lineNumber, column) => {
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

const SingleProjectPage = () => {
    const { socket, user, handleCodeChange, code, setCode, editorRef } = useAuth();
    const { projectID } = useParams();


    const historyRef = useRef([]);

    const applyChangeLocally = (change) => {
        const { changes, timestamp } = change;
        changes.forEach((changeItem) => {
            const { range, rangeLength, text, owner } = changeItem;
            setCode(prevContent =>
                applyEdit(prevContent, { range, rangeLength, text })
            );
        });
        changes[0].timestamp = timestamp;


        historyRef.current.push(changes[0]);


    };



    const [theme, setTheme] = useState('vs-dark');

    function handleEditorDidMount(editor, monaco) {
        import("monaco-themes/themes/Dracula.json").then((data) => {
            monaco.editor.defineTheme("Blackboard", data);
            setTheme('Blackboard');
        });
        editorRef.current = editor;
    }
    const scrollRef = useRef(null);


    const handleInitialDocument = ({ content, changes }) => {

        setCode(content);
        historyRef.current = changes;

    };
    const handleEditorChange = (change) => {
        console.log(scrollRef);
        applyChangeLocally(change);

        scrollRef.current.scrollIntoView({ behavior: 'smooth' });

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
        return () => {
            socket.off('initial-document', handleInitialDocument);
            socket.off('editor-change', handleEditorChange);
        };
    }, []);






    const groupChangesByOwnerAndAction = (changes) => {
        const result = [];
        let currentGroup = [];
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

    const separatedChanges = groupChangesByOwnerAndAction(historyRef.current);

    const modyFied = separatedChanges.map((item, index) => {


        const message = item[0].owner + ' ' + 'updated' + ' ' + item.length + ' characters';

        if (item[0].action === 'insert') {
            return {
                message,
                code: item[item.length - 1].currentCode,
                startingTime: item[0].timestamp || new Date(),

            };
        } else {

            // const code = separatedChanges[index - 1].reduce((acc, cur) => acc + cur.text, '').slice(item.reduce((acc, cur) => acc + cur.rangeLength, 0) * -1);
            // return {
            //     message,
            //     code,
            //     startingTime: item[0].timestamp,
            //     endingTime: item[item.length - 1].timestamp
            // };
        }

    }).filter(item => !!item);


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
                                applyChangeLocally(change);
                                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        options={{}}
                        onMount={handleEditorDidMount}
                    />


                </div>
                <div className="w-[34%] p-5 h-[100dvh] overflow-y-auto">
                    <h1 className="text-2xl font-bold">History Logs</h1>

                    {
                        modyFied.map((item, index) => {
                            return <div key={index} className="flex gap-2 flex-col">
                                <p> {item.message} at {new Date(item.startingTime).toLocaleTimeString()}</p>
                                <SyntaxHighlighter language="javascript" style={dark}>
                                    {item.code}
                                </SyntaxHighlighter>
                            </div>;
                        })
                    }
                    <div ref={scrollRef} />
                </div>
            </div>
            <ChatDrawer />
        </>
    );
};

export default SingleProjectPage;