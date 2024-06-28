'use client';


import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { xcodeLightInit } from '@uiw/codemirror-theme-xcode';

import { useEffect, useState } from "react";
import useAuth from "../_hooks/useAuth";

const SingleProjectPage = () => {
    const { socket } = useAuth();
    const [connected, setConnected] = useState(false);
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);
    console.log(connected);



    useEffect(() => {

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket]);


    return (
        <CodeMirror
            maxHeight='100%'
            minHeight={`500px`}
            value={''}
            basicSetup={{
                crosshairCursor: true
            }}
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

            extensions={[javascript({ jsx: true })]}
            onChange={(e, es) => {
                console.log(e, es);

            }}
        />
    );
};

export default SingleProjectPage;