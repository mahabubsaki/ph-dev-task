'use client';


import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { xcodeLightInit } from '@uiw/codemirror-theme-xcode';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { indentUnit } from '@codemirror/language';

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../_hooks/useAuth";
import { useParams } from "next/navigation";

const SingleProjectPage = () => {
    const { socket, user } = useAuth();
    const { projectID } = useParams();
    const [height, setHeight] = useState(0);
    const [code, setCode] = useState('');
    const handleCodeChange = ({ code }) => {
        setCode(code);
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

    useLayoutEffect(() => {

        const handleResize = (e) => {

            setHeight(e.target.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        setHeight(window.innerHeight);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);





    return (
        <div className="flex">
            <div className="flex-[3_3_0%]">
                <CodeMirror
                    maxHeight='100%'

                    minHeight={(height) + 'px'}
                    basicSetup={false}
                    theme={xcodeLightInit({
                        settings: {
                            background: 'rgba(254, 255, 172, 0.5)',
                            foreground: '#0000FF',
                            caret: '#000',
                            selection: 'rgba(0,0,0,0.15)',
                            lineHighlight: 'rgba(0,0,0,0.05)',
                            gutterBackground: 'rgba(255, 215, 0,0.8)',
                            gutterForeground: '#000',
                        }
                    })}
                    value={code}
                    onChange={(value) => {
                        socket.emit('code-change', {
                            code: value,
                            room: projectID
                        });
                    }}

                    extensions={[javascript({ jsx: true }), indentUnit.of("\t"),
                    basicSetup(),


                    ]}

                />
            </div>
            <div className="flex-1">

            </div>
        </div>
    );
};

export default SingleProjectPage;