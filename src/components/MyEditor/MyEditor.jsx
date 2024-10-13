import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "../../app/styles/TinyMce.css";

const MyEditor = ({ value, onChange }) => {
  const handleEditorChange = (newContent) => {
    onChange(newContent);
  };

  return (
    <Editor
      apiKey="jwpduyj2wsgco2wubq610ogqntre0it79yiz6hx2cgpvq4j5"
      value={value}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'lists', // ajoutez ce plugin pour les listes
          'textcolor', // ajoutez ce plugin pour les couleurs de texte        
          'colorpicker', // ajoutez ce plugin pour la sélection de couleurs
          'format' // ajoutez ce plugin pour les formats de texte
        ],
        toolbar:
          'undo redo | h3Button | fontsizeselect | fontselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help | \
          ',
        setup: function (editor) {
          // Remplacer l'icône du bouton H3 par du texte
          editor.ui.registry.addButton('h3Button', {
              text: 'Titre',  // Texte à afficher
              onAction: function () {
                  editor.execCommand('FormatBlock', false, 'h3');
              },
              onSetup: function (buttonApi) {
                  // Activer le bouton quand le format H3 est sélectionné
                  const nodeChangeHandler = function () {
                      const isActive = editor.queryCommandValue('FormatBlock') === 'h3';
                      buttonApi.active = isActive;
                    };
                  editor.on('NodeChange', nodeChangeHandler);

                  return function () {
                      editor.off('NodeChange', nodeChangeHandler);
                  };
              }
          });
        },
        /*
        allow_conditional_comments: true, // Add this option
        formats: {
          alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'left' },
          aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'center' },
          alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'right' },
          bold: { inline: 'span', classes: 'bold' },
          italic: { inline: 'span', classes: 'italic' },
          underline: { inline: 'span', classes: 'underline', exact: true },
          strikethrough: { inline: 'del' },
          forecolor: { inline: 'span', classes: 'forecolor', styles: { color: '%value' } },
          hilitecolor: { inline: 'span', classes: 'hilitecolor', styles: { backgroundColor: '%value' } },
          custom_format: { block: 'h1', attributes: { title: 'Header' }, styles: { color: 'red' } }
        }*/
      }}
      onEditorChange={handleEditorChange} 
    />
  );
};

export default MyEditor;