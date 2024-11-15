import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 


interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value = '', onChange }) => {
  const [content, setContent] = useState<string>(value);

  const handleChange = (newValue: string) => {
    setContent(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <ReactQuill 
        theme="snow" 
        value={content} 
        onChange={handleChange} 
        placeholder="Write something amazing..."
      />
    </div>
  );
};

export default RichTextEditor;
