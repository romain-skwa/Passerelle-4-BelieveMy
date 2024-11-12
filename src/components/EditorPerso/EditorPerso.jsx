import React, { useState, useRef, useEffect } from 'react';
import "../../app/styles/formulary.css";
import { useClickOutside } from '@mantine/hooks';

function MyTextArea({onTextChange, setIntroductionOfTheGame}) {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('12px'); // default font size
  const [undoStack, setUndoStack] = useState([]);  
  const [redoStack, setRedoStack] = useState([]); 
  const [rectangleUnderA, setRectangleUnderA] = useState([]); 
  const [backgroundUnderPencil, setBackgroundUnderPencil] = useState([]); 
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false); // État pour la visibilité de la palette de couleurs
  const [isBackgroundColorPicker, setIsBackgroundColorPicker] = useState(false); // État pour la visibilité de la palette de couleurs
  const refUseClickOutside = useClickOutside(() => setIsColorPickerVisible(false));
  const refUseClickOutside2 = useClickOutside(() => setIsBackgroundColorPicker(false));
  const [alignment, setAlignment] = useState('left'); // État pour l'alignement du texte
  const textAreaRef = useRef(null);

  useEffect(() => {
    setIntroductionOfTheGame(text); // Synchronisation de l'état  
  }, [text]); 

  // Couleur 
  const colors = [
    "#FFFFFF", "#000000", "#FF0000", "#008000", "#00FF00", "#4CAF50", "#8BC34A", "#FFFF00", "#FFA500", "#800080",
    "#C0C0C0", "#808080", "#FFC0CB", "#FF69B4", "#66CCCC", "#33CCCC", "#0099CC", "#0066CC", "#0033CC", "#0000FF",
    "#663300", "#996600", "#CC6600", "#FF9900"
  ];

  const toggleColorPicker = () => { setIsColorPickerVisible(prev => !prev); }; // Inverser la visibilité

  const toggleBackgroundColorPicker = () => { setIsBackgroundColorPicker(prev => !prev); }; // Inverser la visibilité

  // Ajouter la balise automatiquement quand j'appuie sur "entrée"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setText((prevText) => prevText + '<br /> \n' ); // Ajoute un <br /> au texte
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setUndoStack([...undoStack, text]);  
    setText(newText);  
    setRedoStack([]); // Réinitialise le stack de rétablissement
    onTextChange(e.target.value); 
  };
  
  // Les boutons "Annuler" et "Rétablir"
  const handleUndo = () => {  
    if (undoStack.length > 0) {  
      const lastText = undoStack.pop();  
      setRedoStack([...redoStack, text]); // Ajoute l'état actuel au stack de rétablissement  
      setText(lastText);  
      setUndoStack([...undoStack]); // Met à jour le stack d'annulation  
    }  
  };  
  
  const handleRedo = () => {  
    if (redoStack.length > 0) {  
      const lastRedoText = redoStack.pop();  
      setUndoStack([...undoStack, text]); // Ajoute l'état actuel au stack d'annulation  
      setText(lastRedoText);  
      setRedoStack([...redoStack]); // Met à jour le stack de rétablissement  
    }  
  };

/*********** TITRE H2 ******************************************************************************** */
const handleH2Click = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');

  let newText;
  let newStartIndex;
  let newEndIndex;

  newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isH3 = p1.includes('<h3>') && p1.includes('</h3>');
      const isH2 = p1.includes('<h2>') && p1.includes('</h2>');
      const isP  = p1.includes('<p>') && p1.includes('</p>');

      if (isH3) {
        // Si c'est déjà un <h3>, le changer en <h2>
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = offset + p1.length; // Position de fin pour la sélection
        return p1.replace(/<h3>(.*?)<\/h3>/, '<h2>$1</h2>');
      } else if (isH2) {
        // Si c'est un <h2>, retirer les balises
        newStartIndex = offset;
        newEndIndex = offset + p1.length - 9; 
        console.log(`newStartIndex : `, newStartIndex);
        console.log(`newEndIndex : `, newEndIndex);
        return p1.replace(/<h2>(.*?)<\/h2>/, '$1');
      } else if (isP) {
        // Si c'est déjà un <p>, le changer en <h2>
        newStartIndex = offset;
        newEndIndex = offset + p1.length + 2; 
        console.log(`newStartIndex : `, newStartIndex);
        console.log(`newEndIndex : `, newEndIndex);
        return p1.replace(/<p>(.*?)<\/p>/, '<h2>$1</h2>');
      } else {
        // Sinon, l'encadrer avec les balises <h2>
        newStartIndex = offset;
        newEndIndex = newStartIndex + `<h2>${p1}</h2>`.length;
        console.log(`newStartIndex : `, newStartIndex);
        console.log(`newEndIndex : `, newEndIndex);
        return `<h2>${p1}</h2>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);

  // Sélectionner automatiquement le texte à présent modifié après un léger délai
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};

/*********** TITRE H3 ******************************************************************************** */
const handleH3Click = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');

  let newText;
  let newStartIndex;
  let newEndIndex;

  newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isH3 = p1.includes('<h3>') && p1.includes('</h3>');
      const isH2 = p1.includes('<h2>') && p1.includes('</h2>');
      const isP  = p1.includes('<p>') && p1.includes('</p>');

      if (isH2) {
        // Si c'est déjà un <h2>, le changer en <h3>
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = offset + p1.length; // Position de fin pour la sélection (pas de changement de longueur)
        return p1.replace(/<h2>(.*?)<\/h2>/, '<h3>$1</h3>');
      } else if (isH3) {
        // Si c'est un <h3>, retirer les balises
        newStartIndex = offset; 
        newEndIndex = offset + p1.length - 9; 
        return p1.replace(/<h3>(.*?)<\/h3>/, '$1');
      } else if (isP) {
        // Si c'est déjà un <p>, le changer en <h2>
        newStartIndex = offset;
        newEndIndex = offset + p1.length + 2; 
        console.log(`newStartIndex : `, newStartIndex);
        console.log(`newEndIndex : `, newEndIndex);
        return p1.replace(/<p>(.*?)<\/p>/, '<h3>$1</h3>');
      } else {
        // Sinon, l'encadrer avec les balises <h3>
        newStartIndex = offset; 
        newEndIndex = newStartIndex + `<h3>${p1}</h3>`.length; 
        return `<h3>${p1}</h3>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);

  // Sélectionner le texte modifié après un léger délai
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};
  
/*********** Taille du texte ******************************************************************************** */
const handleFontSizeChange = (e) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  const startIndex = textarea.selectionStart; // Position de départ de la sélection
  const endIndex = textarea.selectionEnd; // Position de fin de la sélection

  const newSize = e.target.value;

  let newText;
  let newStartIndex;
  let newEndIndex;

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');

  newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      // Si la nouvelle taille est "1rem", retirer la balise de taille de police
      if (newSize === "1rem") {
        const spanMatch = p1.match(/<span[^>]*style="font-size: [^"]*">([^<]+)<\/span>/);
        if (spanMatch) {
          const originalLength = p1.length; // Longueur de la sélection d'origine
          console.log(`originalLength : `, originalLength);

          const span0 = spanMatch[0];
          console.log(`span0 : `, span0);
          const spanLength = spanMatch[0].length; // Longueur de la balise <span>
          console.log(`spanLength : `, spanLength);

          // Longueur du contenu à l'intérieur de la balise
          const contentLength = spanMatch[1].length;
          console.log(`content : `, content);
          const content = spanMatch[1];
          console.log(`contentLength : `, contentLength);

          // Calculer la longueur des balises
          const lengthOfTags = spanLength - contentLength;
          console.log(`lengthOfTags : `, lengthOfTags);

          newStartIndex = offset; // Position de départ pour la sélection
          console.log(`newStartIndex : `, newStartIndex);
          newEndIndex = offset + (originalLength - lengthOfTags); // Ajuster la position de fin
          console.log(`newEndIndex : `, newEndIndex);
          return spanMatch[1]; // Retirer la balise et retourner le texte à l'intérieur
        }
      } else {
        // Sinon, vérifier si p1 contient déjà une balise <span> avec une taille de police
        const existingSpanMatch = p1.match(/<span[^>]*style="font-size: ([^"]*)">(.*?)<\/span>/);
        
        if (existingSpanMatch) {
          // Si une balise existe, on remplace la taille de police
          const newSpan = `<span style="font-size: ${newSize}">${existingSpanMatch[2]}</span>`;
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = offset + newSpan.length; // Ajuster la position de fin
          return newSpan;
        } else {
          // Sinon, ajouter une nouvelle balise
          const newSpan = `<span style="font-size: ${newSize}">${p1}</span>`;
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = offset + newSpan.length; // Ajuster la position de fin
          return newSpan;
        }
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);

  // Sélectionner le texte modifié après un léger délai
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};

/*********** Inclure dans Paragraphe ******************************************************************************** */
const handleParagraphClick = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');

  let newText;
  let newStartIndex;
  let newEndIndex;

  newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isH2 = p1.includes('<h2>') && p1.includes('</h2>');
      const isH3 = p1.includes('<h3>') && p1.includes('</h3>');
      const isP  = p1.includes('<p>') && p1.includes('</p>');

      if (isH2 || isH3) {
        // Si c'est déjà un <h2> ou <h3>, retirer les balises et les remplacer par <>
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = offset + `${p1}`.length -2 ; // Ajuster la position de fin
        return `<p>${p1.replace(/<\/?(h2|h3)>/g, '')}</p>`; // Remplacer les balises <h2> ou <h3> par <p>
      } else if (isP) {
        // Si c'est déjà un <p>, retirer les balises
        newStartIndex = offset; 
        newEndIndex = offset + p1.length - 7; // Ajuster la position de fin
        return p1.replace(/<p>(.*?)<\/p>/, '$1'); // Retirer les balises <p>
      } else {
        // Sinon, l'encadrer avec les balises <p>
        newStartIndex = offset; 
        newEndIndex = newStartIndex + `<p>${p1}</p>`.length; 
        return `<p>${p1}</p>`; // Encapsuler le texte avec <p>
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);

  // Sélectionner le texte modifié après un léger délai
  setTimeout(() => {
      textarea.setSelectionRange(newStartIndex, newEndIndex);
      textarea.focus();
  }, 0);
};

/*********** Gras ******************************************************************************** */
const handleBoldClick = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  
  let newText;
  let newStartIndex;
  let newEndIndex;

  newText = textarea.value.replace(regex, (match, p1, offset) => { 
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {// font-style: italic; text-decoration: underline; text-decoration: line-through;
      const isBold = p1.includes('<b>') && p1.includes('</b>') && !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isH2 = p1.startsWith('<h2>') && p1.endsWith('</h2>') && !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isH3 = p1.startsWith('<h3>') && p1.endsWith('</h3>') && !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isParagraph = p1.startsWith('<p>') && p1.endsWith('</p>') && !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>') ;
      const isH2Bold = p1.includes('<h2') && p1.includes('font-weight: bold') && !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>') && !p1.includes('font-style: italic;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const isH3Bold = p1.includes('<h3') && p1.includes('font-weight: bold') && !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>') && !p1.includes('font-style: italic;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const isParagraphBold = p1.includes('<p') && p1.includes('font-weight: bold') && !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>') && !p1.includes('font-style: italic;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const otherStyle = !p1.includes('font-weight: bold;') && (p1.includes('font-style: italic;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') || p1.includes('background-color: #'));
      const boldAndOtherStyle = p1.includes('font-weight: bold;') && (p1.includes('font-style: italic;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') || p1.includes('background-color: #'));

      if (isBold) {
          // Si le texte est déjà en gras, retirer les balises
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = offset + p1.length - 7; // Position de fin pour la sélection (7 = longueur de <b></b>)
        return p1.replace(/<b>(.*?)<\/b>/, '$1');
      } else if (isH2) {
          // Si c'est un <h2>, ajouter le style
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = newStartIndex + `<h2 style="font-weight: bold;">${p1.slice(4, -5)}</h2>`.length; // Position de fin pour la sélection
        return `<h2 style="font-weight: bold;">${p1.slice(4, -5)}</h2>`;
      } else if (isH3) {
          // Si c'est un <h3>, ajouter le style
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = newStartIndex + `<h3 style="font-weight: bold;">${p1.slice(4, -5)}</h3>`.length; // Position de fin pour la sélection
        return `<h3 style="font-weight: bold;">${p1.slice(4, -5)}</h3>`;
      } else if (isParagraph) {
          console.log("C'est un paragraphe. On ajoute du gras");
          // Si c'est un <p>, ajouter le style
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = newStartIndex + `<p style="font-weight: bold;">${p1.replace(/<p[^>]*>/, '').replace('</p>', '')}</p>`.length; // Position de fin pour la sélection
        return `<p style="font-weight: bold;">${p1.replace(/<p[^>]*>/, '').replace('</p>', '')}</p>`;
      } else if (isH2Bold) {
          console.log("C'est un h2 avec du gras donc en appuyant une nouvelle fois, on enlève ce gras");
          // Si c'est un <h2> contenant font-weight: bold, retirer le style
          newStartIndex = offset; // Position de départ pour la sélection
          const content = p1.replace(/<h2[^>]*style="[^"]*font-weight:\s*bold\s*;?[^"]*"[^>]*>/, '').replace('</h2>', '');
          newEndIndex = newStartIndex + content.length + 9; // Position de fin pour la sélection
        return `<h2>${content}</h2>`;
      } else if (isH3Bold) {
          console.log("C'est un h3 avec du gras. On retire le gras");
          // Si c'est un <h3> contenant font-weight: bold, retirer le style
          newStartIndex = offset; // Position de départ pour la sélection
          const content = p1.replace(/<h3[^>]*style="[^"]*font-weight:\s*bold\s*;?[^"]*"[^>]*>/, '').replace('</h3>', '');
          newEndIndex = newStartIndex + content.length + 9; // Position de fin pour la sélection
        return `<h3>${content}</h3>`;
      } else if (isParagraphBold) {
          console.log("isParagraphBold ; C'est un paragraphe <p> avec du gras, donc on retire le gras");
          // Si c'est un <p> contenant font-weight: bold, retirer le style
          newStartIndex = offset; // Position de départ pour la sélection
          const content = p1.replace(/<p[^>]*style="[^"]*font-weight:\s*bold\s*;?[^"]*"[^>]*>/, '').replace('</p>', '');
          newEndIndex = newStartIndex + content.length + 7; // Position de fin pour la sélection
        return `<p>${content}</p>`;
      } else if (otherStyle) {
        console.log("otherStyle ; Il y a d'autres styles et on y ajoute du gras");
           // Si le texte a déjà d'autres styles, ajouter font-weight: bold      
          newStartIndex = offset;      
          newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-weight: bold;'
          // Ajouter font-weight: bold; aux styles existants      
        return p1.replace(/style="/, 'style="font-weight: bold; ');
      } else if (boldAndOtherStyle) {
        console.log("boldAndOtherStyle ; Il y a déjà des styles en plus de Bold et on va retirer font-weight: bold ");
          // Si le texte a déjà d'autres styles en plus de bold, retirer font-weight: bold      
          newStartIndex = offset;      
          newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-weight: bold;'
          // Ajouter font-weight: bold; aux styles existants      
        return p1.replace(/font-weight: bold;/,'');
      } else {
          // Si le texte n'est pas en gras, l'encadrer avec les balises <b>
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = newStartIndex + `<b>${p1}</b>`.length; // Position de fin pour la sélection
        return `<b>${p1}</b>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);

  // Sélectionner le texte modifié après un léger délai
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};
/*********** Italique ******************************************************************************** */
const handleItalicClick = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  
  let newText;
  let newStartIndex;
  let newEndIndex;

  newText = textarea.value.replace(regex, (match, p1, offset) => { 
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isItalic = p1.includes('<i>') && p1.includes('</i>') && !p1.includes('<b>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isH2 = p1.startsWith('<h2>') && p1.endsWith('</h2>') && !p1.includes('<b>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isH3 = p1.startsWith('<h3>') && p1.endsWith('</h3>') && !p1.includes('<b>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isParagraph = p1.startsWith('<p>') && p1.endsWith('</p>') && !p1.includes('<b>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isH2Italic = p1.includes('<h2') && p1.includes('font-style: italic') && !p1.includes('<b>') && !p1.includes('<u>') && !p1.includes('<s>') && !p1.includes('font-weight: bold;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const isH3Italic = p1.includes('<h3') && p1.includes('font-style: italic') && !p1.includes('<b>') && !p1.includes('<u>') && !p1.includes('<s>') && !p1.includes('font-weight: bold;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const isParagraphItalic = p1.includes('<p') && p1.includes('font-style: italic') && !p1.includes('<b>') && !p1.includes('<u>') && !p1.includes('<s>') && !p1.includes('font-weight: bold;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const otherStyle = !p1.includes('font-style: italic') && (p1.includes('font-weight: bold;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') || p1.includes('background-color: #'));
      const italicAndOtherStyle = p1.includes('font-style: italic') && (p1.includes('font-weight: bold;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') || p1.includes('background-color: #'));

      if (isItalic) {
        // Si le texte est déjà en italique, retirer les balises
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = offset + p1.length - 7; // Position de fin pour la sélection (7 = longueur de <i></i>)
        return p1.replace(/<i>(.*?)<\/i>/, '$1');
      } else if (isH2) {
          // Si c'est un <h2>, ajouter le style
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = newStartIndex + `<h2 style="font-style: italic;">${p1.slice(4, -5)}</h2>`.length; // Position de fin pour la sélection
        return `<h2 style="font-style: italic;">${p1.slice(4, -5)}</h2>`;
      } else if (isH3) {
          // Si c'est un <h3>, ajouter le style
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = newStartIndex + `<h3 style="font-style: italic;">${p1.slice(4, -5)}</h3>`.length; // Position de fin pour la sélection
        return `<h3 style="font-style: italic;">${p1.slice(4, -5)}</h3>`;
      } else if (isParagraph) {
          console.log("C'est un paragraphe. On ajoute de l'italique");
          // Si c'est un <p>, ajouter le style
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = newStartIndex + `<p style="font-style: italic;">${p1.replace(/<p[^>]*>/, '').replace('</p>','')}</p>`.length; // Position de fin pour la sélection
        return `<p style="font-style: italic;">${p1.replace(/<p[^>]*>/, '').replace('</p>','')}</p>`;
      } else if (isH2Italic) {
          console.log("C'est un h2 avec de l'italique donc en appuyant une nouvelle fois, on enlève cet italique");
          // Si c'est un <h2> contenant font-style: italic, retirer le style
          newStartIndex = offset; // Position de départ pour la sélection
          const content = p1.replace(/<h2[^>]*style="[^"]*font-style:\s*italic;?[^"]*"[^>]*>/, '').replace('</h2>', '');
          newEndIndex = newStartIndex + content.length + 9; // Position de fin pour la sélection
        return `<h2>${content}</h2>`;
      } else if (isH3Italic) {
          console.log("C'est un h3 avec de l'italique. On retire l'italique");
          // Si c'est un <h3> contenant font-style: italic, retirer le style
          newStartIndex = offset; // Position de départ pour la sélection
          const content = p1.replace(/<h3[^>]*style="[^"]*font-style:\s*italic;?[^"]*"[^>]*>/, '').replace('</h3>', '');
          newEndIndex = newStartIndex + content.length + 9; // Position de fin pour la sélection
        return `<h3>${content}</h3>`;
      } else if (isParagraphItalic) {
        console.log("isParagraphItalic ; C'est un paragraphe <p> avec de l'italique, donc on retire l'italique");
        // Si c'est un <p> contenant font-style: italic, retirer le style
          newStartIndex = offset; // Position de départ pour la sélection
          const content = p1.replace(/<p[^>]*style="[^"]*font-style:\s*italic;?[^"]*"[^>]*>/, '').replace('</p>', '');
          newEndIndex = newStartIndex + content.length + 7; // Position de fin pour la sélection
        return `<p>${content}</p>`;
      } else if (otherStyle) {
          console.log("otherStyle italic; Il y a d'autres styles et on y ajoute de l'italique");
          // Si le texte a déjà d'autres styles, ajouter font-weight: bold      
          newStartIndex = offset;      
          newEndIndex = newStartIndex + p1.length + 20; // 20 = longueur de 'font-weight: bold;'
          // Ajouter font-weight: bold; aux styles existants      
        return p1.replace(/style="/, 'style="font-style: italic; ');
      } else if (italicAndOtherStyle) {
          console.log("italicAndOtherStyle ; Il y a déjà des styles en plus de Italic et on va retirer font-style: italic; ");
          // Si le texte a déjà d'autres styles en plus de bold, retirer font-weight: bold      
          newStartIndex = offset;      
          newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-style: italic;'
          // Ajouter font-style: italic; aux styles existants      
        return p1.replace(/font-style: italic;/,'');
      } else {
          // Si le texte n'est pas en italique, l'encadrer avec les balises <i>
          newStartIndex = offset; // Position de départ pour la sélection
          newEndIndex = newStartIndex + `<i>${p1}</i>`.length; // Position de fin pour la sélection
        return `<i>${p1}</i>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);

  // Sélectionner le texte modifié après un léger délai
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};

/*********** Souligner ******************************************************************************** */
const handleUnderlineClick = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  
  let newText;
  let newStartIndex;
  let newEndIndex;

  newText = textarea.value.replace(regex, (match, p1, offset) => { 
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isUnderline = p1.includes('<u>') && p1.includes('</u>');
      const isH2 = p1.startsWith('<h2>') && p1.endsWith('</h2>') && !p1.includes('<i>') && !p1.includes('<b>') && !p1.includes('<s>');
      const isH3 = p1.startsWith('<h3>') && p1.endsWith('</h3>') && !p1.includes('<i>') && !p1.includes('<b>') && !p1.includes('<s>');
      const isParagraph = p1.startsWith('<p>') && p1.endsWith('</p>') && !p1.includes('<i>') && !p1.includes('<b>') && !p1.includes('<s>');
      const isH2Underline = p1.includes('<h2') && p1.includes('text-decoration: underline') && !p1.includes('<i>') && !p1.includes('<b>') && !p1.includes('<s>') && !p1.includes('font-style: italic;') && !p1.includes('font-weight: bold;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const isH3Underline = p1.includes('<h3') && p1.includes('text-decoration: underline') && !p1.includes('<i>') && !p1.includes('<b>') && !p1.includes('<s>') && !p1.includes('font-style: italic;') && !p1.includes('font-weight: bold;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const isParagraphUnderline = p1.includes('<p') && p1.includes('text-decoration: underline') && !p1.includes('<i>') && !p1.includes('<b>') && !p1.includes('<s>') && !p1.includes('font-style: italic;') && !p1.includes('font-weight: bold;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') && !p1.includes('background-color: #');
      const otherStyle = !p1.includes('text-decoration: underline;') && (p1.includes('font-style: italic;') || p1.includes('font-weight: bold;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') || p1.includes('background-color: #'));
      const underlineAndOtherStyle = p1.includes('text-decoration: underline;') && (p1.includes('font-style: italic;') || p1.includes('font-weight: bold;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') || p1.includes('background-color: #'));

      if (isUnderline) {
        // Si le texte est déjà souligné, retirer les balises
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = offset + p1.length - 7; // Position de fin pour la sélection (7 = longueur de <u></u>)
        return p1.replace(/<u>(.*?)<\/u>/, '$1');
      } else if (isH2) {
        // Si c'est un <h2>, ajouter le style
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = newStartIndex + `<h2 style="text-decoration: underline;">${p1.slice(4, -5)}</h2>`.length; // Position de fin pour la sélection
        return `<h2 style="text-decoration: underline;">${p1.slice(4, -5)}</h2>`;
      } else if (isH3) {
        // Si c'est un <h3>, ajouter le style
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = newStartIndex + `<h3 style="text-decoration: underline;">${p1.slice(4, -5)}</h3>`.length; // Position de fin pour la sélection
        return `<h3 style="text-decoration: underline;">${ p1.slice(4, -5)}</h3>`;
      } else if (isParagraph) {
        // Si c'est un <p>, ajouter le style
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = newStartIndex + `<p style="text-decoration: underline;">${p1.replace(/<p[^>]*>/, '').replace('</p>', '')}</p>`.length; // Position de fin pour la sélection
        return `<p style="text-decoration: underline;">${p1.replace(/<p[^>]*>/, '').replace('</p>', '')}</p>`;
      } else if (isH2Underline) {
        // Si c'est un <h2> contenant text-decoration: underline, retirer le style
        newStartIndex = offset; // Position de départ pour la sélection
        const content = p1.replace(/<h2[^>]*style="[^"]*text-decoration:\s*underline\s*;?[^"]*"[^>]*>/, '').replace('</h2>', '');
        newEndIndex = newStartIndex + content.length + 9; // Position de fin pour la sélection
        return `<h2>${content}</h2>`;
      } else if (isH3Underline) {
        // Si c'est un <h3> contenant text-decoration: underline, retirer le style
        newStartIndex = offset; // Position de départ pour la sélection
        const content = p1.replace(/<h3[^>]*style="[^"]*text-decoration:\s*underline\s*;?[^"]*"[^>]*>/, '').replace('</h3>', '');
        newEndIndex = newStartIndex + content.length + 9; // Position de fin pour la sélection
        return `<h3>${content}</h3>`;
      } else if (isParagraphUnderline) {
        // Si c'est un <p> contenant text-decoration: underline, retirer le style
        newStartIndex = offset; // Position de départ pour la sélection
        const content = p1.replace(/<p[^>]*style="[^"]*text-decoration:\s*underline\s*;?[^"]*"[^>]*>/, '').replace('</p>', '');
        newEndIndex = newStartIndex + content.length + 7; // Position de fin pour la sélection
        return `<p>${content}</p>`;
      } else if (otherStyle) {
        console.log("otherStyle Souligner ; Il y a d'autres styles et on y ajoute Underline")
        // Si le texte a déjà d'autres styles, ajouter text-decoration: underline
        newStartIndex = offset;      
        newEndIndex = newStartIndex + p1.length + 28; // 28 = longueur de 'text-decoration: underline;'
        return p1.replace(/style="/, 'style="text-decoration: underline; ');
      } else if (underlineAndOtherStyle) {
        // Si le texte a déjà d'autres styles en plus de souligné, retirer text-decoration: underline
        newStartIndex = offset;      
        newEndIndex = newStartIndex + p1.length + 25; // 25 = longueur de 'text-decoration: underline;'
        return p1.replace(/text-decoration: underline;/, '');
      } else {
        // Si le texte n'est pas souligné, l'encadrer avec les balises <u>
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = newStartIndex + `<u>${p1}</u>`.length; // Position de fin pour la sélection
        return `<u>${p1}</u>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);

  // Sélectionner le texte modifié après un léger délai
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};

/*********** Barrer le texte ******************************************************************************** */
const handleStrikeThroughClick = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  let newText;
  let newStartIndex;
  let newEndIndex;
  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isStrikeThrough = selectedText.includes('<s>') && selectedText.includes('</s>');
      if (isStrikeThrough) {
        // Si le texte est déjà barré, retirer les balises <s>
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = offset + p1.length - 7; // Position de fin pour la sélection (7 = longueur de <u></u>)        
        return p1.replace(/<s>(.*?)<\/s>/, '$1');
      } else {
        // Sinon, ajouter les balises <s>
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = newStartIndex + `<u>${p1}</u>`.length; // Position de fin pour la sélection        
        return `<s>${p1}</s>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);

  // Sélectionner le texte modifié après un léger délai
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};


/*********** Changer Couleur Texte ******************************************************************************** */
/* -------- Réinitialisation ------------------*/
const handleColorChange = (newColorText) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (newColorText === "") { // Pour réinitialiser
    const startIndex = textarea.selectionStart; // Position de départ de la sélection

    // Remplacer la balise <span style="color: ..."> et une balise de fermeture </span>
    const newText = textarea.value.replace(selectedText, selectedText.replace(/<span style="color: [^"]*">/, '').replace(/<\/span>/, ''));

    setText(newText);
    setRectangleUnderA('rgba(255, 255, 255, 0)');

    // Ajuster les indices de sélection
    const newStartIndex = startIndex; // Position de départ pour la sélection
    const newEndIndex = newStartIndex + (selectedText.replace(/<span style="color: [^"]*">/, '').replace(/<\/span>/, '').length); // Position de fin pour la sélection

    // Sélectionner le texte modifié
    setTimeout(() => {
      textarea.setSelectionRange(newStartIndex, newEndIndex);
      textarea.focus();
    }, 0);
  } else {
    handleColorClick(newColorText);
  }
};

/* -------- On change la couleur du texte ------------------*/
const handleColorClick = (newColorText) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) {
    return; // Si le texte sélectionné n'est pas trouvé
  }

  let newText;
  let newStartIndex;
  let newEndIndex;
  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isTextColorChanged = selectedText.includes('<span style="color:') && selectedText.includes('</span>');
      if (isTextColorChanged) {
        // Si une balise <span> existe déjà, remplacez la couleur de fond
        newStartIndex = offset;
        newEndIndex = offset + p1.length ; 
        return p1.replace(/(<span[^>]*style="color:).*?;/, `$1 ${newColorText};`);
      } else {
        // Sinon, créez une nouvelle balise <span> avec la couleur de fond
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = newStartIndex + `<span style="color: #******;">${p1}</span>`.length; // Position de fin pour la sélection
        return `<span style="color: ${newColorText};">${p1}</span>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  // Met à jour le textarea avec le nouveau texte
  setText(newText);
  setRectangleUnderA(newColorText);

  // Sélectionner le texte modifié
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};

/*********** Changer Background Texte ******************************************************************* */
  /* -------- Réinitialisation ------------------*/
  const handleBackgroundColorClick = (newColorBackgroundText) => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);  
  
    if (newColorBackgroundText === "") { // Pour réinitialiser
      if (selectedText === '') { return; }
      // Retirer uniquement les balises <span> avec background-color autour du texte sélectionné
      const startIndex = textarea.selectionStart;
      const endIndex = textarea.selectionEnd;
  
      // Utiliser une regex pour retirer uniquement les balises <span> avec background-color autour du texte sélectionné
      const newText = textarea.value.replace(/<span[^>]*style="[^"]*background-color[^"]*"[^>]*>(.*?)<\/span>/g, (match, p1, offset) => {
        if (offset >= startIndex && offset + match.length <= endIndex) {
          return p1; // Retirer la balise <span> si elle entoure le texte sélectionné
        }
        return match; // Retourner l'original pour les autres occurrences
      });
  
      setText(newText);
      setBackgroundUnderPencil('rgba(255, 255, 255, 0)');

       // Ajuster les indices de sélection
      const newStartIndex = startIndex; // Position de départ pour la sélection
      const newEndIndex = newStartIndex + (selectedText.replace(/<span style="background-color: [^"]*">/, '').replace(/<\/span>/, '').length); // Position de fin pour la sélection

      // Sélectionner le texte modifié
      setTimeout(() => {
        textarea.setSelectionRange(newStartIndex, newEndIndex);
        textarea.focus();
      }, 0);
    } else {
      console.log(`Changement de couleur de fond en : ${newColorBackgroundText}`);
      addBackgroundTag(newColorBackgroundText);
      setBackgroundUnderPencil(newColorBackgroundText);
    }
  };

/* -------- On change la couleur de FOND du texte ------------------*/
const addBackgroundTag = (newColorBackgroundText) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  if (selectedText === '') { return; }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) {
    return; // Si le texte sélectionné n'est pas trouvé
  }

  let newText;
  let newStartIndex;
  let newEndIndex;
  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isBackgroundColorChanged = selectedText.includes('<span style="background-color:') && selectedText.includes('</span>');

      if (isBackgroundColorChanged) {
        // Si une balise <span> existe déjà, remplacez la couleur de fond
        const updatedText = p1.replace(/(<span[^>]*style="background-color:).*?;/, `$1 ${newColorBackgroundText};`);
        newStartIndex = offset;
        newEndIndex = offset + p1.length;
        return updatedText; // Retourner le texte mis à jour
      } else {
        // Sinon, créez une nouvelle balise <span> avec la couleur de fond
        const newSpan = `<span style="background-color: ${newColorBackgroundText};">${p1}</span>`;
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = newStartIndex + `<span style="background-color: #******;">${p1}</span>`.length; // Position de fin pour la sélection
        return newSpan; // Retourner la nouvelle balise
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  // Met à jour le textarea avec le nouveau texte
  setText(newText);

  // Sélectionner le texte modifié
  setTimeout(() => {
    textarea.setSelectionRange(newStartIndex, newEndIndex);
    textarea.focus();
  }, 0);
};

  /********* Alignement de la sélection ************************************************************************/
  const handleAlignLeft = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') { return; }
    
    const startIndex = textarea.selectionStart; // Utiliser la position de départ de la sélection

    // Déclaration des variables pour le texte modifié et les indices
    let newText;
    let newStartIndex;
    let newEndIndex;

    // Expression régulière pour trouver la balise de positionnement existante
    const alignmentRegex = /<div style="text-align: (left|center|right);">(.*?)<\/div>/;

    // Utiliser une regex pour trouver l'occurrence spécifique
    const regex = new RegExp(`(${selectedText})`, 'g');

    newText = textarea.value.replace(regex, (match, p1, offset) => {
        // Vérifier si c'est l'occurrence que nous voulons formater
        if (offset === startIndex) {
            // Si le texte sélectionné contient déjà une balise d'alignement, on la retire
            if (alignmentRegex.test(p1)) {
                newStartIndex = offset; // Position de départ pour la sélection
                newEndIndex = offset + p1.replace(alignmentRegex, '$2').length; // Position de fin pour la sélection
                return p1.replace(alignmentRegex, '$2'); // Remplace par le texte sans la balise
            } 
        }
        return p1; // Retourner le texte original pour les autres occurrences
    });

    // Met à jour le textarea avec le nouveau texte
    setText(newText);

    // Sélectionner le texte modifié
    setTimeout(() => {
        textarea.setSelectionRange(newStartIndex, newEndIndex);
        textarea.focus();
    }, 0);
};

  const handleAlignCenter = () => {
    applyTextAlignment('center');
  };

  const handleAlignRight = () => {
    applyTextAlignment('right');
  };

  const applyTextAlignment = (align) => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    if (selectedText === '') { return; }

    const startIndex = textarea.selectionStart; // Position de départ de la sélection
    const endIndex = textarea.selectionEnd; // Position de fin de la sélection

    // Déclaration des variables pour le texte modifié et les indices
    let newText;
    let newStartIndex;
    let newEndIndex;

    // Expression régulière pour trouver la balise de positionnement existante
    const alignmentRegex = /<div style="text-align: (left|center|right);">(.*?)<\/div>/;

    // Utiliser une regex pour trouver l'occurrence spécifique
    const regex = new RegExp(`(${selectedText})`, 'g');

    newText = textarea.value.replace(regex, (match, p1, offset) => {
        // Vérifier si c'est l'occurrence que nous voulons formater
        if (offset === startIndex) {
            // Si le texte sélectionné contient déjà une balise d'alignement, on remplace la balise existante
            if (alignmentRegex.test(p1)) {
                newStartIndex = offset; // Position de départ pour la sélection
                newEndIndex = offset + `<div style="text-align: ${align};">${p1.replace(alignmentRegex, '$2')}</div>`.length; // Position de fin pour la sélection // Position de fin pour la sélection
                return p1.replace(alignmentRegex, `<div style="text-align: ${align};">$2</div>`);
            } else {
                // Sinon, ajoute la nouvelle balise d'alignement
                const newDiv = `<div style="text-align: ${align};">${p1}</div>`;
                newStartIndex = offset; // Position de départ pour la sélection
                newEndIndex = newStartIndex + newDiv.length; // Position de fin pour la sélection
                return newDiv; // Retourner la nouvelle balise
            }
        }
        return p1; // Retourner le texte original pour les autres occurrences
    });

    // Met à jour le textarea avec le nouveau texte
    setText(newText);

    // Sélectionner le texte modifié
    setTimeout(() => {
        textarea.setSelectionRange(newStartIndex, newEndIndex);
        textarea.focus();
    }, 0);
};
  /********* Retour à la ligne ************************************************************************/
  const insertLineBreak = () => {
    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Ajoute le <br/> à la position du curseur
    const newText = text.substring(0, start) + '<br/>' + text.substring(end);
    setText(newText);

    // Met à jour la position du curseur
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 5; // 5 est la longueur de "<br/>"
      textarea.focus();
    }, 0);
  };
  
  /********* Ajuster la hauteur du champ de texte ************************************************************************/
  const adjustTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      // Réinitialiser la hauteur pour calculer la nouvelle hauteur
      textArea.style.height = 'auto';
      // Ajuster la hauteur en fonction du scrollHeight
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextAreaHeight();
  }, [text]);

  return (
    <div className='border p-2'>
      <p 
        className='text-white text-center font-bold mb-3'
        style={{
          textShadow: "2px 2px 7px rgba(0, 0, 0, 1)",
        }}
        >
          Dans cette présentation, vous choisissez la mise forme du texte
      </p>
      <section className='py-2 flex'>
        <div className='boutonGris bouton' onClick={handleUndo}><img className='w-[80%]' src="/icons/undo-icon.png" alt="icon undo" /></div>
        <div className='boutonGris bouton' onClick={handleRedo}><img className='w-[80%]' src="/icons/redo-icon.png" alt="icon redo" /></div>
        <div className='longBoutonGris bouton' onClick={handleH2Click} title='<h2>'>Titre</div>
        <div className='longBoutonGris bouton' onClick={handleH3Click} title='<h3>'>Sous-titre</div>
        <div className='longBoutonGris bouton' onClick={handleParagraphClick} title='<p>'>Paragraphe</div>
        <div className='longBoutonGris bouton' onClick={insertLineBreak} title='<br/>'>Retour ligne</div>
         {/* Choisir la taille du texte ------------------------------------------------------- */}
         <select value={fontSize} className='p-1 border border-solid rounded' onChange={handleFontSizeChange} style={{ marginLeft: '10px' }}>
          <option >Taille du texte</option>
          <option value="0.5rem">x 0.5</option>
          <option value="0.75rem">x 0.75</option>
          <option value="1rem">Par défaut</option>
          <option value="1.5rem"> x 1.5</option>
          <option value="1.75rem">x 1.75</option>
          <option value="2rem">x 2</option>
          <option value="2.5rem">x 2.5</option>
          <option value="3rem">x 3</option>
        </select>        

        <div className='boutonGris bouton' onClick={handleBoldClick} title='<b>'><img className='w-[60%]' src="/icons/format-bold.png" alt="icon bold" /></div>
        <div className='boutonGris bouton' onClick={handleItalicClick} title='<i>'><img className='w-[60%]' src="/icons/italic-icon.png" alt="icon italic" /></div>
        <div className='boutonGris bouton' onClick={handleUnderlineClick} title='<u>'><img className='w-[60%]' src="/icons/underline-icon.png" alt="underline italic" /></div>
        <div className='boutonGris bouton' onClick={handleStrikeThroughClick} title='<s>'><img className='w-[60%]' src="/icons/strikethrough.png" alt="strikethrough italic" /></div>
        
        {/* Choisir la couleur du texte ------------------------------------------------------- */}
        <div className='boutonTextColor bouton' onClick={toggleColorPicker}>
          <div className='textColorLetter'>A</div>
          <div className='rectangleTextColor' style={{ backgroundColor: rectangleUnderA }}></div>

          {isColorPickerVisible && (
          <div ref={refUseClickOutside} className="color-palette">
            {colors.map((newColorText, index) => (
              <div
                key={index}
                style={{backgroundColor: newColorText, width: '20px', height: '20px', cursor: 'pointer', display: 'inline-block', margin: '2px'}}
                onClick={() => handleColorChange(newColorText)}
              />
            ))}
            <div style={{ backgroundColor: "#FFFFFF", width: '110px', height: '25px', cursor: 'pointer', display: 'flex', margin: '2px auto', alignItems:'center', justifyContent:'center', color:'black' }}
              onClick={() => handleColorChange("")}
            >
              Réinitialiser
            </div>
          </div>
          )}
        </div>

        {/* Choisir la couleur de l'arrière plan du texte ---------------------------------------- */}
        <div className='boutonBackgroundColor bouton' onClick={toggleBackgroundColorPicker}>
          <div className='textColorLetter iconPencil'><img src="/icons/pencil-icon.png" alt="Icon pencil" /></div>
          <div className='rectangleBackgroundTextColor' style={{ backgroundColor: backgroundUnderPencil }}></div>

          {isBackgroundColorPicker && (
            <div ref={refUseClickOutside2} className="color-palette">
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{backgroundColor: color, width: '20px', height: '20px', cursor: 'pointer', display: 'inline-block', margin: '2px'}}
                  onClick={() => handleBackgroundColorClick(color)}
                />
              ))}
              <div style={{ backgroundColor: "#FFFFFF", width: '110px', height: '25px', cursor: 'pointer', display: 'flex', margin: '2px auto', alignItems:'center', justifyContent:'center', color:'black' }}
                onClick={() => handleBackgroundColorClick("")}
              >
                Réinitialiser
              </div>
            </div>
          )}
        </div>

        <div className='boutonGris bouton' onClick={handleAlignLeft}><img className='w-[70%]' src="/icons/left-align-icon.png" alt="left-align-icon" /></div>
        <div className='boutonGris bouton' onClick={handleAlignCenter}><img className='w-[70%]' src="/icons/align-center-icon.png" alt="align-center-icon" /></div>
        <div className='boutonGris bouton' onClick={handleAlignRight}><img className='w-[70%]' src="/icons/right-align-icon.png" alt="right-align-icon" /></div>

      </section>

      <textarea
        id="textareaDescriptionJeu"
        ref={textAreaRef}
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown} 
        placeholder="Entrez votre texte ici..."
      />
      
    </div>    


  );
}

export default MyTextArea;