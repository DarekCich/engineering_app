import { saveFile } from "./txt";
import React, { useEffect, useState } from "react";

const txt = ({ file }) => {
    const [text, setText] = useState(file);
    const handleTextChange = (value) => {
        setText(value.target.value);
    };
    const handleSaveFile = () => {
        saveFile(file, text);
    };

    return (
        <div>
            <div className="editor">
                <button onClick={handleSaveFile}>save</button>
                <textarea value={text} onChange={handleTextChange} />
            </div>
        </div>
    );
};

export default txt;
