import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./md.module.css"
const MarkdownEditor = ({ file, save }) => {
    const [text, setText] = useState(file);

    const handleTextChange = (value) => {
        setText(value.target.value);
    };
    const handleSaveFile = () => {
        save(text);
    };
    useEffect(() => {
        setText(file)
    }, [file]);
    return (
        <div className={styles.body}>
            <button className={styles.but} onClick={handleSaveFile}>save</button>
            <textarea className={styles.textarea} value={text} onChange={handleTextChange} />
            <div className={styles.preview}>
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownEditor;
