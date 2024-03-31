import React, { useState,useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { readFile,saveFile } from './md';
const MarkdownEditor = ({file}) => {
  const [text, setText] = useState('');

  const handleTextChange = (value) => {
    setText(value.target.value);
  };
  const handleSaveFile = () => {
    saveFile(file,text)
  }
  useEffect(()=>{
    let tmp = readFile(file)
    setText(tmp);
  },[])
  return (
    <div>
      <div className="editor">
      <button onClick={handleSaveFile}>save</button>
      <textarea
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className="preview">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
