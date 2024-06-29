'use client';


import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { xcodeLightInit } from '@uiw/codemirror-theme-xcode';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { indentUnit } from '@codemirror/language';



import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../_hooks/useAuth";
import { useParams } from "next/navigation";
import Editor from '@monaco-editor/react';


const SingleProjectPage = () => {
    const { socket, user, handleCodeChange, code, setCode, editorRef } = useAuth();
    const { projectID } = useParams();
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
    const historyRef = useRef([]);
    const applyEdit = (content, edit) => {
        const { range, rangeLength, text } = edit;
        const startOffset = content.length > 0 ? offsetAt(content, range.startLineNumber, range.startColumn) : 0;
        const endOffset = offsetAt(content, range.endLineNumber, range.endColumn);
        return `${content.substring(0, startOffset)}${text}${content.substring(endOffset)}`;
    };
    const applyChangeLocally = (change) => {
        const { changes } = change;
        changes.forEach((changeItem) => {
            const { range, rangeLength, text, owner } = changeItem;
            setCode(prevContent =>
                applyEdit(prevContent, { range, rangeLength, text })
            );
        });

        historyRef.current.push(change);
        console.log(historyRef.current);
    };



    const [theme, setTheme] = useState('vs-dark');

    function handleEditorDidMount(editor, monaco) {
        import("monaco-themes/themes/Dracula.json").then((data) => {
            monaco.editor.defineTheme("Blackboard", data);
            setTheme('Blackboard');
        });
        editorRef.current = editor;
    }


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






    return (
        <div className="flex">
            <div className="w-[66%] overflow-hidden">

                <Editor
                    height="100dvh"
                    defaultLanguage="javascript"

                    theme={theme}
                    value={code}

                    onChange={(value, event) => {
                        socket.emit('code-change', {
                            code: value,
                            room: projectID
                        });
                        // setCode(value);
                        if (event) {
                            const timestamp = new Date();
                            const changes = event.changes.map(change => ({
                                range: change.range,
                                rangeLength: change.rangeLength,
                                text: change.text,
                                owner: user.username,
                            }));

                            const change = {
                                timestamp,
                                changes,
                            };

                            // socket.emit('editor-change', change);
                            applyChangeLocally(change);
                        }
                    }}
                    options={{}}
                    onMount={handleEditorDidMount}
                />


            </div>
            <div className="w-[34%]">

            </div>
        </div>
    );
};

export default SingleProjectPage;