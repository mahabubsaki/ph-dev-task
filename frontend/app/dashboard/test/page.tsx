
'use client';

import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';


const Test = () => {
    const editorRef = useRef(null);
    const [theme, setTheme] = useState('vs-dark');

    function handleEditorDidMount(editor, monaco) {
        import("monaco-themes/themes/Dracula.json").then((data) => {
            monaco.editor.defineTheme("Blackboard", data);
            setTheme('Blackboard');
        });
        console.log(editor?.ITokenThemeRule);
        editorRef.current = editor;
    }



    return (
        <Editor
            height="100dvh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            theme={theme}
            onChange={(value) => {

            }}

            options={{

                fontSize: 18,
                fontLigatures: true,
            }}
            onMount={handleEditorDidMount}
        />
    );
};

export default Test;