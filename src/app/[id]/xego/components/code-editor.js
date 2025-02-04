'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = forwardRef(({ code, setCode, theme }, ref) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null); // Referencia para la instancia de Monaco

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco; // Almacena la instancia de Monaco
  };

  const handleChange = (value, event) => {
    setCode(value);
    console.log('Código actualizado:', value);
  };

  useImperativeHandle(ref, () => ({
    changeTheme: (newTheme) => {
      if (monacoRef.current) {
        monacoRef.current.editor.setTheme(newTheme);
      }
    },
    formatCode: () => {
      if (editorRef.current) {
        editorRef.current.getAction('editor.action.formatDocument').run();
      }
    },
    changeLanguage: (language) => {
      if (monacoRef.current && editorRef.current) {
        const model = editorRef.current.getModel();
        monacoRef.current.editor.setModelLanguage(model, language);
      }
    },
  }));

  return (
    <div className="w-full h-full">
      <Editor
        height="400px"
        defaultLanguage="javascript"
        language="javascript"
        value={code}
        onMount={handleEditorDidMount}
        onChange={handleChange}
        theme={theme}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}); 