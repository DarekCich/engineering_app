import { readFile,saveFile } from './txt';
import React, { useEffect, useState } from 'react';

const txt = ({file}) => {
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
    </div>
  );
};

export default txt;
