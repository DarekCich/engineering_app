import React, { useState, useEffect } from "react";
import styles from "./txt.module.css";

const txt = ({ file, setFile, save }) => {
    const [content, setContent] = useState(file);
    const handleTextChange = (value) => {
        setContent(value.target.value);
    };
    const handleSave = async () => {
        save(content);
    };
    useEffect(() => {
        setContent(file);
    }, [file]);
    return (
        <div>
            <div className={styles.editor}>
                <button onClick={handleSave}>save</button>
                <textarea className={styles.textarea} value={content} onChange={handleTextChange} />
            </div>
        </div>
    );
};

export default txt;
