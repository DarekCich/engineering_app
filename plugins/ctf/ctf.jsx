// RichTextEditor.js

import React, { useState } from 'react';
import ReactQuill from 'react-quill';

import styles from './ctf.module.css'; // Zaimportuj lokalne style CSS jako moduł CSS

const RichTextEditor = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div className={styles.richTextEditorContainer}>
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
