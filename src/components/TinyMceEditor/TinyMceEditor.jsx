import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMceEditor = ({ introductionOfTheGame, setIntroductionOfTheGame }) => {
  const handleEditorChange = (newContent) => {
    setIntroductionOfTheGame(newContent);
  };

  return (
    <div className="w-[95%] mx-auto">
      <Editor
        apiKey={process.env.TINY_MCE_KEY}
        value={introductionOfTheGame}
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
          ],
          toolbar:
            "undo redo | h3Button h4Button | fontsize | fontfamily  | bold italic underline strikethrough forecolor backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help | \
            ",
          font_size_formats: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
          font_family_formats:
            "Oswald=oswald; Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times;",
          content_style:
            '@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");',
          font_size_input_default_unit: "px",

          setup: function (editor) {
            // Remplacer l'icône du bouton H3 par du texte
            editor.ui.registry.addButton("h3Button", {
              text: "Titre", // Texte à afficher
              onAction: function () {
                editor.execCommand("FormatBlock", false, "h3");
              },
              onSetup: function (buttonApi) {
                // Activer le bouton quand le format H3 est sélectionné
                const nodeChangeHandler = function () {
                  const isActive =
                    editor.queryCommandValue("FormatBlock") === "h3";
                  buttonApi.active = isActive;
                };
                editor.on("NodeChange", nodeChangeHandler);

                return function () {
                  editor.off("NodeChange", nodeChangeHandler);
                };
              },
            });

            // Ajouter un nouveau bouton pour les h4
            editor.ui.registry.addButton("h4Button", {
              text: "Sous-titre", // Texte à afficher
              onAction: function () {
                editor.execCommand("FormatBlock", false, "h4");
              },
              onSetup: function (buttonApi) {
                // Activer le bouton quand le format H4 est sélectionné
                const nodeChangeHandler = function () {
                  const isActive =
                    editor.queryCommandValue("FormatBlock") === "h4";
                  buttonApi.active = isActive;
                };
                editor.on("NodeChange", nodeChangeHandler);

                return function () {
                  editor.off("NodeChange", nodeChangeHandler);
                };
              },
            });
          },

          content_style:
            "h3 { font-size: 20px; font-weight: bold; } h4 { font-size: 18px; font-weight: bold; }",
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TinyMceEditor;
