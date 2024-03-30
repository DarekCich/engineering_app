// RichTextEditor.js

import React, { useState } from 'react';


const RichTextEditor = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div>
    test abc

    </div>
  );
};

export default RichTextEditor;
