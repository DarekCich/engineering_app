// RichTextEditor.js

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";

import styles from "./ctf.module.css"; // Zaimportuj lokalne style CSS jako moduł CSS

const RichTextEditor = ({file, save}) => {
    const [text, setText] = useState(file);

    const handleChange = (value) => {
        setText(value);
    };
    const handleSave = async () => {
        await save(text);
    };
    useEffect(() => {
        setText(file);
    }, [file]);

    return (
        <div className={styles.richTextEditorContainer}>
            <button onClick={handleSave}>save</button>
            <h1 className={styles.richTextEditorHeader}>Rich Text Editor</h1>
            <div className={styles.editor}>
                <ReactQuill
                    value={text}
                    onChange={handleChange}
                    theme="snow"
                    className={styles.qlContainer}
                />
            </div>
        </div>
    );
};

export default RichTextEditor;
