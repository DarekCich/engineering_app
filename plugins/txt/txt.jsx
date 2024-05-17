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
        <div className={styles.body}>
            <button className={styles.but} onClick={handleSave}>save</button>
            <textarea className={styles.textarea} value={content} onChange={handleTextChange} />
        </div>
    );
};

export default txt;
