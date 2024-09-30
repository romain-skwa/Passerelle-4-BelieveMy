import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "../../app/styles/TinyMce.css";

const MyEditor = ({ value, onChange }) => {
  const handleEditorChange = (newContent) => {
    onChange(newContent);
  };

  return (
    <Editor
      apiKey="jwpduyj2wsgco2wubq610ogqntre0it79yiz6hx2cgpvq4j5" // Mets ici ton API key TinyMCE si nécessaire
      value={value}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default MyEditor;