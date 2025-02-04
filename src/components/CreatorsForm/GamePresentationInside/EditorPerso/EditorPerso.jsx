import React, { useState, useRef, useEffect } from 'react';
import "@/app/styles/formulary.css";
import { useClickOutside } from '@mantine/hooks';
import { useLanguage } from "@/components/LanguageContext/LanguageContext";

function MyTextArea({onTextChange, introductionOfTheGame, setIntroductionOfTheGame}) {
  const [text, setText] = useState(introductionOfTheGame); // valeur initiale == introductionOfTheGame. Utile quand on fait réapparaitre ce composant
  const [fontSize, setFontSize] = useState('12px'); // default font size
  const [undoStack, setUndoStack] = useState([]);  
  const [redoStack, setRedoStack] = useState([]); 
  const [rectangleUnderA, setRectangleUnderA] = useState([]); 
  const [backgroundUnderPencil, setBackgroundUnderPencil] = useState([]); 
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false); // Palette de couleurs des lettres
  const [isBackgroundColorPicker, setIsBackgroundColorPicker] = useState(false); // Palette de couleurs fond des lettres
  const refUseClickOutside = useClickOutside(() => setIsColorPickerVisible(false)); // Fermer palette de couleurs des lettres
  const refUseClickOutside2 = useClickOutside(() => setIsBackgroundColorPicker(false));
  const textAreaRef = useRef(null);
  const { language } = useLanguage();
  
  useEffect(() => {
    setIntroductionOfTheGame(text); // Synchronisation de l'état  
  }, [text]); 

  useEffect(() => {
    setText(introductionOfTheGame);
  }, [introductionOfTheGame]);

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
        const isH3style = p1.includes('<h3') && p1.includes('</h3>');
        const isH2 = p1.includes('<h2>') && p1.includes('</h2>');
        const isH2style = p1.includes('<h2') && p1.includes('</h2>');
        const isP = p1.includes('<p>') && p1.includes('</p>');
        const isPstyle = p1.includes('<p') && p1.includes('</p>');

        if (isH3) { // Si c'est déjà un <h3>, le changer en <h2>
            newStartIndex = offset; // Position de départ pour la sélection
            newEndIndex = offset + p1.length; // Position de fin pour la sélection
            return p1.replace(/<h3>(.*?)<\/h3>/, '<h2>$1</h2>');
        } else if (isH3style) { // Si c'est déjà un <h3, le changer en <h2
            newStartIndex = offset; // Position de départ pour la sélection
            newEndIndex = offset + p1.length; // Position de fin pour la sélection
            return p1.replace(/<h3(.*?)<\/h3>/, '<h2$1</h2>');
        } else if (isH2) { // Si c'est un <h2>, retirer les balises
            newStartIndex = offset;
            newEndIndex = offset + p1.length - 9; 
            return p1.replace(/<h2>(.*?)<\/h2>/, '$1');
        } else if (isH2style) { // Si c'est déjà un <h2 , remplacer h2 par span
            newStartIndex = offset; 
            newEndIndex = offset + p1.length + 8; 
            return p1.replace(/<h2(.*?)<\/h2>/, '<span$1</span>');
        } else if (isP) { // Si c'est déjà un <p>, le changer en <h2>
            newStartIndex = offset;
            newEndIndex = offset + p1.length + 2; 
            return p1.replace(/<p>(.*?)<\/p>/, '<h2>$1</h2>');
        } else if (isPstyle) { // Si c'est déjà un <p>, le changer en <h2>
            newStartIndex = offset;
            newEndIndex = offset + p1.length + 2; 
            return p1.replace(/<p(.*?)<\/p>/, '<h2$1</h2>');
        } else { // Sinon, l'encadrer avec les balises <h2>
            newStartIndex = offset; 
            newEndIndex = newStartIndex + `<h2>${p1}</h2>`.length; 
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
      const isH2 = p1.includes('<h2>') && p1.includes('</h2>');
      const isH2style = p1.includes('<h2') && p1.includes('</h2>');
      const isH3 = p1.includes('<h3>') && p1.includes('</h3>');
      const isH3style = p1.includes('<h3') && p1.includes('</h3>');
      const isP  = p1.includes('<p>') && p1.includes('</p>');
      const isPstyle  = p1.includes('<p') && p1.includes('</p>');

      if (isH2) {
        // Si c'est déjà un <h2>, le changer en <h3>
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = offset + p1.length; // Position de fin pour la sélection (pas de changement de longueur)
        return p1.replace(/<h2>(.*?)<\/h2>/, '<h3>$1</h3>');
      } else if (isH2style) {
          // Si c'est déjà un <h2 , le changer en <h3
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = offset + p1.length; // Position de fin pour la sélection (pas de changement de longueur)
        return p1.replace(/<h2(.*?)<\/h2>/, '<h3$1</h3>');
      } else if (isH3) {
        // Si c'est un <h3>, retirer les balises
        newStartIndex = offset; 
        newEndIndex = offset + p1.length - 9; 
        return p1.replace(/<h3>(.*?)<\/h3>/, '$1');
      } else if (isH3style) {
        // Si c'est un <h3> avec au moins un style, remplacer h3 par span
        newStartIndex = offset; 
        newEndIndex = offset + p1.length + 4; 
        return p1.replace(/<h3(.*?)<\/h3>/, '<span$1</span>');
      } else if (isP) {
        // Si c'est déjà un <p>, le changer en <h2>
        newStartIndex = offset;
        newEndIndex = offset + p1.length + 2; 
        return p1.replace(/<p>(.*?)<\/p>/, '<h3>$1</h3>');
      } else if (isPstyle) {
        // Si c'est déjà un <p>, le changer en <h2>
        newStartIndex = offset;
        newEndIndex = offset + p1.length + 2; 
        return p1.replace(/<p(.*?)<\/p>/, '<h3$1</h3>');
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
  const newSize = e.target.value;

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
      const isStyled = p1.includes('font-weight: bold;') || (p1.includes('font-style: italic;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('color: #'));
      const isFontSizeSpan = (p1.includes('font-size:') && p1.includes('</span>')) && (!p1.includes('</h2>') || !p1.includes('</h3>') || !p1.includes('</p>')) && !isStyled;
      const isH2H3PnoStyle = (p1.startsWith('<h2>') || p1.startsWith('<h3>') || p1.startsWith('<p>')) && !p1.includes('span') && !p1.includes('font-size:') && !isStyled;
      const isH2H3PwithStyle = (p1.startsWith('<h2') || p1.startsWith('<h3') || p1.startsWith('<p')) && !p1.includes('span') && !p1.includes('font-size:') && isStyled;
      const isfont = p1.includes('font-size:');
      const spanStyled = p1.includes('<span') && isStyled && (!p1.startsWith('<h2>') || !p1.startsWith('<h3>') || !p1.startsWith('<p>'));
      const isH2H3PfontSize = (p1.startsWith('<h2 ') || p1.startsWith('<h3 ') || p1.startsWith('<p ')) && p1.includes('font-size:') && !isStyled;
        
      newStartIndex = offset; // Position de départ pour la sélection

      if(newSize === "1rem"){
        if(isFontSizeSpan){
          console.log("(isFontSizeSpan) : Font-size dans un span. Pas dans un h2, h3 ou P. Aucun autre style On supprime le style font-size et les balises span")
          // Supprimer la balise <span> tout en conservant le texte à l'intérieur
          newEndIndex = offset + p1.length  // Ajuster la longueur pour la balise
          return p1.replace(/<span[^>]*style="font-size: [^"]*">(.*?)<\/span>/, '$1');
        } else if (isH2H3PfontSize) {
          console.log("(isH2H3PfontSize) : Supprimer les balises h2, h3 ou p ainsi que 'font-size' et sa valeur");
          // Supprimer les balises <h2>, <h3>, <p> tout en conservant le texte à l'intérieur  
          newEndIndex = offset + p1.length 
          return p1.replace(/<(h2|h3|p)[^>]*>(.*?)<\/(h2|h3|p)>/g, '$2').replace(/font-size:\s*[^;]*;?\s*/g, ''); // Supprime les balises et font-size
        } else {
          // Supprimer font-size: et sa valeur tout en conservant le reste de la sélection
          console.log("Supprimer uniquement 'font-size' et sa valeur. On conserve le reste");
          newEndIndex = offset + p1.length 
          return p1.replace(/font-size:\s*[^;]*;?\s*/g, ''); // Supprime font-size et sa valeur    
        }}

      if(newSize !== "1rem"){
        if(isH2H3PnoStyle){
          console.log("isH2H3PnoStyle, dans un h2, h3 ou P sans aucun style, Ajouter font-size");
          // Dans un H2, un H3 ou un P sans aucun style, Ajouter style="font-size: ${newSize};" à la balise
          const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
          newEndIndex = offset + p1.length + (`<${tagName} style="font-size: ${newSize};">`.length + `</${tagName}>`.length);
          return p1.replace(/<(h2|h3|p)(.*?)>(.*?)<\/\1>/g, `<$1 style="font-size: ${newSize};"$2>$3</$1>`);
        } else if (isH2H3PwithStyle) {
          console.log(`isH2H3PwithStyle, Dans un H2, un H3 ou un P AVEC style, Ajouter style="font-size: ${newSize};" à la balise`);
          // Dans un H2, un H3 ou un P AVEC style, Ajouter style="font-size: ${newSize};" à la balise
          newEndIndex = offset + p1.length + (`style="font-size: ${newSize};`).length; 
          return p1.replace(/style="/, `style="font-size: ${newSize}; `);
        } else if (isfont){
          console.log("isfont, s'il font-size existe déjà, Changer sa valeur");  
            // Trouver la valeur actuelle de font-size
            const currentFontSizeMatch = p1.match(/font-size:\s*([^;]*);?/);      
            const currentFontSize = currentFontSizeMatch ? currentFontSizeMatch[0] : ''; // 'font-size: X;' ou une chaîne vide      
            const currentFontSizeLength = currentFontSize.length; // Longueur de l'ancien font-size      
            // Nouvelle valeur de font-size      
            const newFontSize = `font-size: ${newSize};`;      
            const newFontSizeLength = newFontSize.length; // Longueur de la nouvelle valeur     
            // Calculer newEndIndex
            newEndIndex = offset + p1.length - currentFontSizeLength + newFontSizeLength;
          return p1.replace(/font-size:\s*[^;]*;?/g, newFontSize);
        } else if (spanStyled){
          console.log("spanStyled, Dans un span avec au moins un style, Ajouter font-size");
          // Ajouter font-size dans une span qui a déjà au moins un style
          newEndIndex = offset + p1.length + (`style="font-size: ${newSize};`).length; 
          return p1.replace(/style="/, `style="font-size: ${newSize}; `);
        } else {
          console.log("else, on ajoute span + style = font-size");
          // Ajouter des balises span + style="font-size
          newEndIndex = offset + `<span style="font-size: ${newSize};">${p1}</span>`.length 
          return `<span style="font-size: ${newSize};">${p1}</span>`;
        }
      }      
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);
  // Restore selection after a slight delay
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
      const isH2style = p1.includes('<h2') && p1.includes('</h2>');
      const isH3 = p1.includes('<h3>') && p1.includes('</h3>');
      const isH3style = p1.includes('<h3') && p1.includes('</h3>');
      const isP  = p1.includes('<p>') && p1.includes('</p>');
      const isPstyle = p1.includes('<p') && p1.includes('</p>');

      if (isH2 || isH3) {
        // Si c'est déjà un <h2> ou <h3>, retirer les balises et les remplacer par <>
        newStartIndex = offset; // Position de départ pour la sélection
        newEndIndex = offset + `${p1}`.length -2 ; // Ajuster la position de fin
        return `<p>${p1.replace(/<\/?(h2|h3)>/g, '')}</p>`; // Remplacer les balises <h2> ou <h3> par <p>
      } else if (isP) {
        // Si c'est déjà un <p>, retirer les balises
        newStartIndex = offset; 
        newEndIndex = offset + p1.length - 7; 
        return p1.replace(/<p>(.*?)<\/p>/, '$1'); // Retirer les balises <p>
      } else if (isH2style || isH3style) {
        // Si c'est déjà un <h2> ou <h3> avec style, remplacer <h2> ou <h3> par <p>
        newStartIndex = offset; 
        newEndIndex = offset + p1.length ; 
        return `<p ${p1.replace(/<\/?(h2|h3)/g, '')}</p>`; // Retirer les balises <p>
      } else if (isPstyle) {
        // Si c'est déjà un <h2> ou <h3> avec style, remplacer <h2> ou <h3> par <p>
        newStartIndex = offset; 
        newEndIndex = offset + p1.length + 6; 
        return p1.replace(/<p(.*?)<\/p>/, '<span$1</span>');
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
      const notIUS = !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isBold = (p1.includes('<b>') && p1.includes('</b>'));     
      const isH2H3P = (p1.startsWith('<h2>') || p1.startsWith('<h3>') || p1.startsWith('<p>')) && notIUS;
      const isH2H3PBold = (p1.startsWith('<h2 ') || p1.startsWith('<h3 ') || p1.startsWith('<p ')) && p1.includes('font-weight: bold;') && (!p1.includes('font-style: italic;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') );
      const otherStyleButBold = !p1.includes('font-weight: bold;') && (p1.includes('font-style: italic;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );
      const boldAndOtherStyle = p1.includes('font-weight: bold;') && (p1.includes('font-style: italic;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );
      const spanBoldOnly = p1.includes('<span') && p1.includes('</span>') && p1.includes('font-weight: bold') && !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>') && !p1.includes('font-style: italic;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') ;
      const spanBoldAndOther = p1.includes('<span') && p1.includes('</span>') && p1.includes('font-weight: bold') && (p1.includes('font-style: italic;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );
      
      newStartIndex = offset; // Position de départ pour la sélection

      if (isBold) {
        // Si le texte est déjà en gras, retirer les balises
          newEndIndex = offset + p1.length - 7; // Position de fin pour la sélection (7 = longueur de <b></b>)
          return p1.replace(/<b>(.*?)<\/b>/, '$1');
      } else if (isH2H3P) {
        // Si le texte contient déjà des balises <h2>, <h3> ou <p>, ajouter le style de Gras
          console.log(`Le texte contient déjà une balise de titre ou de paragraphe, ajouter le Gras.`);
          const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
          newEndIndex = offset + p1.length + (`<${tagName} style="font-weight: bold;">`.length + `</${tagName}>`.length); // Ajuster la longueur pour la balise
          return p1.replace(/(<\/?)(h[2-3]|p)([^>]*>)/, `$1$2 style="font-weight: bold;"$3`); // Ajouter le style à la balise existante
      } else if (isH2H3PBold) {
        // Si le texte contient déjà des balises <h2>, <h3> ou <p>, RETIRER le style de Gras
          console.log(`isH2H3PBold ; Le texte contient déjà une balise de titre ou de paragraphe, RETIRER le Gras.`);
          const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
          newEndIndex = offset + p1.length + (`<${tagName} `.length); // Ajuster la longueur pour la balise
          return p1.replace(new RegExp(`\\s*style="[^"]*"`, 'i'), '');    
      } else if (otherStyleButBold) {
        // Si le texte a déjà d'autres styles, ajouter font-weight: bold      
          console.log("otherStyleButBold ; Il y a d'autres styles et on y ajoute du gras");
          newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-weight: bold;'
          // Ajouter font-weight: bold; aux styles existants      
          return p1.replace(/style="/, 'style="font-weight: bold; ');
      } else if (boldAndOtherStyle) {
        // Si le texte a déjà d'autres styles en plus de bold, retirer font-weight: bold      
          console.log("boldAndOtherStyle ; Il y a déjà des styles en plus de Bold et on va retirer font-weight: bold ");
          newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-weight: bold;'
          // Retirer font-weight: bold; aux styles existants      
          return p1.replace(/font-weight: bold;\s*/, '');
      } else if (spanBoldOnly) {
        // Si le texte a déjà d'autres styles en plus de bold, retirer font-weight: bold      
          console.log("spanBoldOnly ; On est dans une span contenant Bold et on va retirer la balise <span> et font-weight: bold ");
          newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-weight: bold;'
          // Retirer font-weight: bold ainsi que les balises <span>
          const content = p1.replace(/<span[^>]*style="[^"]*font-weight:\s*bold\s*;?[^"]*"[^>]*>(.*?)<\/span>/, '$1');
          return content; 
      } else if (spanBoldAndOther) {
        // Dans span, si le texte a déjà d'autres styles en plus de bold, retirer seulement font-weight: bold      
          console.log("spanBoldAndOther ; On est dans une span contenant Bold et d'autres style. Il faut effacer bold");
          newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-weight: bold;'
          // Retirer font-weight: bold; aux styles existants      
          return p1.replace(/font-weight: bold;/,'');
      } else {
        // Si le texte n'est pas en gras, l'encadrer avec les balises <b>
          newEndIndex = newStartIndex + `<b>${p1}</b>`.length;
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
      const notIUS = !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isItalic = (p1.includes('<i>') && p1.includes('</i>'));     
      const isH2H3P = (p1.startsWith('<h2>') || p1.startsWith('<h3>') || p1.startsWith('<p>')) && notIUS;
      const isH2H3PIitalic = (p1.startsWith('<h2 ') || p1.startsWith('<h3 ') || p1.startsWith('<p ')) && p1.includes('font-style: italic;') && (!p1.includes('font-weight: bold;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') );
      const otherStyleButItalic = !p1.includes('font-style: italic;') && (p1.includes('font-weight: bold;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );
      const italicAndOtherStyle = p1.includes('font-style: italic;') && (p1.includes('font-weight: bold;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );
      const spanItalicOnly = p1.includes('<span') && p1.includes('</span>') && p1.includes('font-style: italic') && !p1.includes('<b>') && !p1.includes('<u>') && !p1.includes('<s>') && !p1.includes('font-weight: bold;') && !p1.includes('text-decoration: underline;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') ;
      const spanItalicAndOther = p1.includes('<span') && p1.includes('</span>') && p1.includes('font-style: italic') && (p1.includes('font-weight: bold;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );

      newStartIndex = offset; // Position de départ pour la sélection

      if (isItalic) {
        // Si le texte est déjà en italique, retirer les balises
        newEndIndex = offset + p1.length - 7; // Position de fin pour la sélection (7 = longueur de <i></i>)
        return p1.replace(/<i>(.*?)<\/i>/, '$1');
      } else if (isH2H3P) {
        // Si le texte contient déjà des balises <h2>, <h3> ou <p>, ajouter le style d'italique
        console.log(`Le texte contient déjà une balise de titre ou de paragraphe, ajouter l'italique.`);
        const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
        newEndIndex = offset + p1.length + (`<${tagName} style="font-style: italic ;">`.length + `</${tagName}>`.length); // Ajuster la longueur pour la balise
        return p1.replace(/(<\/?)(h[2-3]|p)([^>]*>)/, `$1$2 style="font-style: italic;"$3`); // Ajouter le style à la balise existante
      } else if (isH2H3PIitalic) {
        // Si le texte contient déjà des balises <h2>, <h3> ou <p>, RETIRER le style d'italique
        console.log(`isH2H3PIitalic ; Le texte contient déjà une balise de titre ou de paragraphe, RETIRER l'italique.`);
        const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
        newEndIndex = offset + p1.length + (`<${tagName} `.length); // Ajuster la longueur pour la balise
        return p1.replace(new RegExp(`\\s*style="[^"]*"`, 'i'), '');    
      } else if (otherStyleButItalic) {
        // Si le texte a déjà d'autres styles, ajouter font-style: italic      
        console.log("otherStyleButItalic ; Il y a d'autres styles et on y ajoute de l'italique");
        newEndIndex = newStartIndex + p1.length + 20; // 20 = longueur de 'font-style: italic;'
        // Ajouter font-style: italic; aux styles existants      
        return p1.replace(/style="/, 'style="font-style: italic; ');
      } else if (italicAndOtherStyle) {
        // Si le texte a déjà d'autres styles en plus d'italique, retirer font-style: italic      
        console.log("italicAndOtherStyle ; Il y a déjà des styles en plus de l'italique et on va retirer font-style: italic ");
        newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-style: italic;'
        // Retirer font-style: italic; aux styles existants      
        return p1.replace(/font-style: italic;\s*/, '');
      } else if (spanItalicOnly) {
        // Si le texte a déjà d'autres styles en plus d'italique, retirer font-style: italic      
        console.log("spanItalicOnly ; On est dans une span contenant Italique et on va retirer la balise <span> et font-style: italic ");
        newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-style: italic;'
        // Retirer font-style: italic ainsi que les balises <span>
        const content = p1.replace(/<span[^>]*style="[^"]*font-style:\s*italic\s*;?[^"]*"[^>]*>(.*?)<\/span>/, '$1');
        return content; 
      } else if (spanItalicAndOther) {
        // Dans span, si le texte a déjà d'autres styles en plus d'italique, retirer seulement font-style: italic      
        console.log("spanItalicAndOther ; On est dans une span contenant Italique et d'autres styles. Il faut effacer italique");
        newEndIndex = newStartIndex + p1.length + 19; // 19 = longueur de 'font-style: italic;'
        // Retirer font-style: italic; aux styles existants      
        return p1.replace(/font-style: italic;/,'');
      } else {
        // Si le texte n'est pas en italique, l'encadrer avec les balises <i>
        newEndIndex = newStartIndex + `<i>${p1}</i>`.length;
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
  
  if (startIndex === -1) return;

  const regex = new RegExp(`(${selectedText})`, 'g');
  
  let newText;
  let newStartIndex;
  let newEndIndex;

  newText = textarea.value.replace(regex, (match, p1, offset) => { 
    if (offset === startIndex) {
      const notIUS = !p1.includes('<u>') && !p1.includes('<i>') && !p1.includes('<s>');
      const isUnderlined = (p1.includes('<u>') && p1.includes('</u>'));     
      const isH2H3P = (p1.startsWith('<h2>') || p1.startsWith('<h3>') || p1.startsWith('<p>')) && notIUS;
      const isH2H3PUnderlined = (p1.startsWith('<h2 ') || p1.startsWith('<h3 ') || p1.startsWith('<p ')) && p1.includes('text-decoration: underline;') && (!p1.includes('font-weight: bold;') && !p1.includes('font-style: italic;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') );
      const otherStyleButUnderlined = !p1.includes('text-decoration: underline;') && (p1.includes('font-weight: bold;') || p1.includes('font-style: italic;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );
      const underlinedAndOtherStyle = p1.includes('text-decoration: underline;') && (p1.includes('font-weight: bold;') || p1.includes('font-style: italic;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );
      const spanUnderlinedOnly = p1.includes('<span') && p1.includes('</span>') && p1.includes('text-decoration: underline') && !p1.includes('<b>') && !p1.includes('<i>') && !p1.includes('<s>') && !p1.includes('font-weight: bold;') && !p1.includes('font-style: italic;') && !p1.includes('text-decoration: line-through;') && !p1.includes('font-size:') && !p1.includes('color: #') ;
      const spanUnderlinedAndOther = p1.includes('<span') && p1.includes('</span>') && p1.includes('text-decoration: underline') && (p1.includes('font-weight: bold;') || p1.includes('font-style: italic;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('color: #') );

      newStartIndex = offset;

      if (isUnderlined) {
        newEndIndex = offset + p1.length - 7; 
        return p1.replace(/<u>(.*?)<\/u>/, '$1');
      } else if (isH2H3P) {
        const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
        newEndIndex = offset + p1.length + (`<${tagName} style="text-decoration: underline;">`.length + `</${tagName}>`.length);
        return p1.replace(/(<\/?)(h[2-3]|p)([^>]*>)/, `$1$2 style="text-decoration: underline;"$3`);
      } else if (isH2H3PUnderlined) {
        const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
        newEndIndex = offset + p1.length + (`<${tagName} `.length);
        return p1.replace(new RegExp(`\\s*style="[^"]*"`, 'i'), '');    
      } else if (otherStyleButUnderlined) {
        newEndIndex = newStartIndex + p1.length + 30; 
        return p1.replace(/style="/, 'style="text-decoration: underline; ');
      } else if (underlinedAndOtherStyle) {
        newEndIndex = newStartIndex + p1.length + 30; 
        return p1.replace(/text-decoration: underline;\s*/, '');
      } else if (spanUnderlinedOnly) {
        newEndIndex = newStartIndex + p1.length + 30; 
        const content = p1.replace(/<span[^>]*style="[^"]*text-decoration:\s*underline\s*;?[^"]*"[^>]*>(.*?)<\/span>/, '$1');
        return content; 
      } else if (spanUnderlinedAndOther) {
        newEndIndex = newStartIndex + p1.length + 30; 
        return p1.replace(/text-decoration: underline;/, '');
      } else {
        newEndIndex = newStartIndex + `<u>${p1}</u>`.length;
        return `<u>${p1}</u>`;
      }
    }
    return p1; 
  });

  setText(newText);

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

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  
  let newText;
  let newStartIndex;
  let newEndIndex;

  newText = textarea.value.replace(regex, (match, p1, offset) => { 
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      // Détermination des styles et balises existants
      const notIUS = !p1.includes('<i>') && !p1.includes('<u>') && !p1.includes('<s>');
      const isStrikeThrough = (p1.includes('<s>') && p1.includes('</s>'));     
      const isH2H3P = (p1.startsWith('<h2>') || p1.startsWith('<h3>') || p1.startsWith('<p>')) && notIUS;
      const isH2H3PStrikeThrough = (p1.startsWith('<h2 ') || p1.startsWith('<h3 ') || p1.startsWith('<p ')) && p1.includes('text-decoration: line-through;') && (!p1.includes('font-weight: bold;') && !p1.includes('font-style: italic;') && !p1.includes('text-decoration: underline;') && !p1.includes('font-size:') && !p1.includes('color: #') );
      const otherStyleButStrikeThrough = !p1.includes('text-decoration: line-through;') && (p1.includes('font-style: italic;') || p1.includes('font-weight: bold;') || p1.includes('font-size:') || p1.includes('color: #'));
      const strikeThroughAndOtherStyle = p1.includes('text-decoration: line-through;') && (p1.includes('font-style: italic;') || p1.includes('font-weight: bold;') || p1.includes('font-size:') || p1.includes('color: #'));
      const spanStrikeThroughOnly = p1.includes('<span') && p1.includes('</span>') && p1.includes('text-decoration: line-through;') && !p1.includes('<b>') && !p1.includes('<i>') && !p1.includes('<s>') && !p1.includes('font-weight: bold;') && !p1.includes('font-style: italic;') && !p1.includes('text-decoration: underline') && !p1.includes('font-size:') && !p1.includes('color: #') ;
      const spanStrikeThroughAndOther = p1.includes('<span') && p1.includes('</span>') && p1.includes('text-decoration: line-through;') && (p1.includes('font-weight: bold;') || p1.includes('font-style: italic;') || p1.includes('text-decoration: underline') || p1.includes('font-size:') || p1.includes('color: #') );

      newStartIndex = offset; // Position de départ pour la sélection

      if (isStrikeThrough) {
        // Si le texte est déjà barré, retirer les balises
        newEndIndex = offset + p1.length - 4; // Position de fin pour la sélection (4 = longueur de <s></s>)
        return p1.replace(/<s>(.*?)<\/s>/, '$1');
      } else if (isH2H3P) {
        // Ajouter le style barré
        console.log(`Le texte contient déjà une balise de titre ou de paragraphe, ajouter le barré.`);
        const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
        newEndIndex = offset + p1.length + (`<${tagName} style="text-decoration: line-through;">`.length + `</${tagName}>`.length);
        return p1.replace(/(<\/?)(h[2-3]|p)([^>]*>)/, `$1$2 style="text-decoration: line-through;"$3`);
      } else if (isH2H3PStrikeThrough) {
        const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
        newEndIndex = offset + p1.length + (`<${tagName} `.length);
        return p1.replace(new RegExp(`\\s*style="[^"]*"`, 'i'), '');  
      } else if (otherStyleButStrikeThrough) {
        // Ajouter text-decoration: line-through 
        console.log("otherStyleButStrikeThrough ; Il y a d'autres styles, et on y ajoute le barré");
        newEndIndex = newStartIndex + p1.length + 30; // 30 = longueur de 'text-decoration: line-through;'
        return p1.replace(/style="/, 'style="text-decoration: line-through; ');
      } else if (strikeThroughAndOtherStyle) {
        // Retirer text-decoration: line-through
        console.log("strikeThroughAndOtherStyle ; Il y a déjà d'autres styles en plus du barré, retirer le barré");
        newEndIndex = newStartIndex + p1.length + 30; // 30 = longueur de 'text-decoration: line-through;'
        return p1.replace(/text-decoration: line-through;\s*/, '');
      } else if (spanStrikeThroughOnly) {
        newEndIndex = newStartIndex + p1.length + 30; 
        const content = p1.replace(/<span[^>]*style="[^"]*text-decoration:\s*line-through;\s*;?[^"]*"[^>]*>(.*?)<\/span>/, '$1');
        return content; 
      } else if (spanStrikeThroughAndOther) {
        newEndIndex = newStartIndex + p1.length + 30; 
        return p1.replace(/text-decoration: line-through;/, '');
      } else {
        // Barrer le texte
        newEndIndex = newStartIndex + `<s>${p1}</s>`.length;
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
  const otherStyle = (selectedText.includes('font-weight: bold;') || selectedText.includes('font-style: italic;') || selectedText.includes('text-decoration: underline;') || selectedText.includes('text-decoration: line-through;') || selectedText.includes('font-size:') || selectedText.includes('background-color: #'));
  const isColorAndStyle = (selectedText.includes('style="color:') || selectedText.includes('; color:')) && otherStyle;
  const isH2H3P = selectedText.includes('<h2 ') || selectedText.includes('<h3 ') ||  selectedText.includes('<p ') && !otherStyle;
    
  // Ajuster les indices de sélection
  let newStartIndex;
  let newEndIndex;

  if (newColorText === "") { // Pour réinitialiser
    newStartIndex = textarea.selectionStart; // Position de départ de la sélection

    let newText;
    if (isColorAndStyle) {
      // Si isColorAndStyle est vrai, retirer le style de couleur
      console.log("(isColorAndStyle - couleur de texte) ; Il y a Color + au moins un autre style. Réinitialisation de color : on retire color: #******");
      newEndIndex = newStartIndex + (selectedText, selectedText.replace(/color:\s*#[0-9A-Fa-f]{6};?\s*/, '')).length;
      newText = textarea.value.replace(selectedText, selectedText.replace(/color:\s*#[0-9A-Fa-f]{6};?\s*/, ''));
    } else if (isH2H3P){
      // Si le texte sélectionné est dans des balises h2, h3 ou p, on le garde tel quel
      console.log("(isH2H3P) Réinitialisation de la couleur de texte. La sélection est dans un h2, h3 ou <p>. Et elle ne contient pas d'autres styles que color.");
      newEndIndex = newStartIndex + (selectedText, selectedText.replace(/<span style="color: [^"]*">/, '').replace(/<\/span>/, '')).length;
      newText = textarea.value.replace(selectedText, selectedText
        .replace(/<h2 style="color: [^"]*">/, '<h2>')
        .replace(/<h3 style="color: [^"]*">/, '<h3>')
        .replace(/<p style="color: [^"]*">/, '<p>')
      );
    } else {
      // Sinon, juste retirer la balise <span>, </span> et style="color
      console.log("Réinitialisation de color. Suppression des balises <span> </span> et du style color");
      newEndIndex = newStartIndex + (selectedText, selectedText.replace(/<span style="color: [^"]*">/, '').replace(/<\/span>/, '')).length;
      newText = textarea.value.replace(selectedText, selectedText.replace(/<span style="color: [^"]*">/, '').replace(/<\/span>/, ''));
    }

    setText(newText);
    setRectangleUnderA('rgba(255, 255, 255, 0)');

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
      const isTextColorChanged = selectedText.includes('color:') && selectedText.includes('</span>') && !p1.includes('background-color: #');
      const isStyle = (p1.includes('font-weight: bold;')|| p1.includes('font-style: italic;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('background-color: #') )

     // Vérifier si le texte sélectionné contient déjà des balises <h2>, <h3> ou <p>

      const isHeadingOrParagraph = p1.includes('<h2>') || p1.includes('<h3>') || p1.includes('<p>'); // Sans couleur
      const isH2H3Pcolored = (p1.includes('<h2 ') || p1.includes('<h3 ') || p1.includes('<p ')) && selectedText.includes('color:') && !p1.includes('background-color: #'); // Avec couleur
        newStartIndex = offset;

      if (isHeadingOrParagraph) {
        // Si le texte contient déjà des balises <h2>, <h3> ou <p>, ajouter le style de couleur
        console.log(`Le texte contient déjà une balise de titre ou de paragraphe, ajouter le style de couleur.`);
        const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
        newEndIndex = offset + p1.length + (`<${tagName} style="color: ${newColorText};">`.length + `</${tagName}>`.length); // Ajuster la longueur pour la balise
        return p1.replace(/(<\/?)(h[2-3]|p)([^>]*>)/, `$1$2 style="color: ${newColorText};"$3`); // Ajouter le style à la balise existante
      } else if (isH2H3Pcolored) {
        // Si la sélection est dans un h2, un h3 ou un <p> et qu'une color est déjà présente, on change cette couleur
        console.log("Dans <h2>, <h3> ou <p> comportant déjà une couleur, on change la couleur.")
        newEndIndex = offset + p1.length; 
        return p1.replace(/(color:\s*#[0-9A-Fa-f]{6};?)/, `color: ${newColorText};`);
      } else if (isTextColorChanged) {
        // Si une balise <span> existe déjà, remplacez la couleur de fond
        console.log(`Si une balise <span> existe déjà, remplacez la couleur de fond`);
        newEndIndex = offset + p1.length; 
        return p1.replace(/(color:\s*#[0-9A-Fa-f]{6};?)/, `color: ${newColorText};`);
      } else if (isStyle) {
        // Si un (ou plusieurs) style est déjà présent, ajouter Color: #******
        console.log(`Si un style est déjà présent, ajouter Color: #******`);
        newEndIndex = offset + p1.length + 16;
        return p1.replace(/style="/, `style="color: ${newColorText}; `);
      } else {
        // Sinon, créez une nouvelle balise <span> avec la couleur de fond
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
    const styled = (selectedText.includes('font-style: italic;') || selectedText.includes('text-decoration: underline;') || selectedText.includes('text-decoration: line-through;') || selectedText.includes('font-size:') || selectedText.includes('style="color:')|| selectedText.includes('; color:'));
    const isColorAndStyle = selectedText.includes('background-color: #') && styled; // background-color + au moins un autre style
    const isH2H3P = (selectedText.includes('<h2 ') || selectedText.includes('<h3 ') || selectedText.includes('<p ')) && !selectedText.includes('<span ');
    const isBackColored = selectedText.includes('background-color: #') && !styled && isH2H3P; // Seulement background-color dans h2 ou h3 ou <p>

    if (newColorBackgroundText === "") { // Pour réinitialiser
      if (selectedText === '') { return; }

      // Retirer uniquement les balises <span> avec background-color autour du texte sélectionné  
      const startIndex = textarea.selectionStart;  
      const endIndex = textarea.selectionEnd;  
  
      let newText;  
      if (isColorAndStyle) {  
        // Si isColorAndStyle est vrai, retirer le style de background-color 
        console.log("isColorAndStyle Background - couleur de fond ; la sélection inclus background-color et au moins un autre style. On retire la couleur de fond.") 
        newText = textarea.value.replace(selectedText, selectedText.replace(/background-color:\s*#[0-9A-Fa-f]{6};?\s*/, ''));
      } else if (isBackColored) {  
        // Si seulement background-color existe. On le retire.
        console.log("(isBackColored) Dans un h2, h3 ou <p>, si seulement background-color existe et aucun autre style. On le retire");
        newText = textarea.value.replace(selectedText, selectedText
          .replace(/<h2 style="background-color: [^"]*">/, '<h2>')
          .replace(/<h3 style="background-color: [^"]*">/, '<h3>')
          .replace(/<p style="background-color: [^"]*">/, '<p>')
        );
      } else {  
        // Sinon, juste retirer la balise <span> (si elle existe) 
        console.log("on retire la balise span et background-color"); 
        newText = textarea.value.replace(/<span[^>]*style="[^"]*background-color[^"]*"[^>]*>(.*?)<\/span>/g, (match, p1, offset) => {  
          if (offset >= startIndex && offset + match.length <= endIndex) {  
            return p1; // Retirer la balise <span> si elle entoure le texte sélectionné  
          }  
          return match; // Retourner l'original pour les autres occurrences  
        });  
      }  
  
      setText(newText);  
      setBackgroundUnderPencil('rgba(255, 255, 255, 0)');

       // Ajuster les indices de sélection
    const newStartIndex = startIndex; // Position de départ pour la sélection
    const newEndIndex = newStartIndex + (newText.substring(startIndex, endIndex).length); // Position de fin pour la sélection

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
      const isStyle = !p1.includes('background-color: #') && (p1.includes('font-weight: bold;') || p1.includes('font-style: italic;') || p1.includes('text-decoration: underline;') || p1.includes('text-decoration: line-through;') || p1.includes('font-size:') || p1.includes('"color: #') || p1.includes(' color: #') )

      const isHeadingOrParagraph = (p1.includes('<h2>') || p1.includes('<h3>') || p1.includes('<p>')) && !p1.includes('background-color: #'); // Sans couleur
      const isH2H3Pspancolored = (p1.includes('<h2 ') || p1.includes('<h3 ') || !p1.includes('<p ') || !p1.includes('<span ')) && p1.includes('background-color: #'); // Avec couleur
        newStartIndex = offset;

      if (isBackgroundColorChanged) {
        // Si une balise <span> existe déjà, remplacez la couleur de fond
        console.log("Si span contenant background-color: existe, on change la couleur");
        const updatedText = p1.replace(/(<span[^>]*style="background-color:).*?;/, `$1 ${newColorBackgroundText};`);
        newEndIndex = offset + p1.length;
        return updatedText; // Retourner le texte mis à jour
      }else if (isHeadingOrParagraph) {
          // Si le texte contient déjà des balises <h2>, <h3> ou <p>, ajouter le style de couleur
          console.log(`Le texte contient déjà une balise de titre ou de paragraphe, ajouter le style de couleur.`);
          const tagName = p1.includes('<h2>') ? 'h2' : p1.includes('<h3>') ? 'h3' : 'p';
          newEndIndex = offset + p1.length + (`<${tagName} style="background-color: ${newColorBackgroundText};">`.length + `</${tagName}>`.length); // Ajuster la longueur pour la balise
          return p1.replace(/(<\/?)(h[2-3]|p)([^>]*>)/, `$1$2 style="background-color: ${newColorBackgroundText};"$3`); // Ajouter le style à la balise existante
      }else if (isStyle) {
        // Si un (ou plusieurs) style est déjà présent, ajouter background-color: #******
        console.log(`isStyle ; Si un style est déjà présent, ajouter background-color: #******`);
        newEndIndex = offset + p1.length + 27;
        return p1.replace(/style="/, `style="background-color: ${newColorBackgroundText}; `);
      } else if (isH2H3Pspancolored) {
        // Si la sélection est dans un h2, un h3 ou un <p> et qu'une background-color est déjà présente, on change cette couleur de fond
        console.log("Dans <h2>, <h3>, <p> ou <span> comportant déjà une couleur de fond, on change cette couleur.")
        newEndIndex = offset + p1.length; 
        return p1.replace(/(background-color:\s*#[0-9A-Fa-f]{6};?)/, `background-color: ${newColorBackgroundText};`);
      } else {
        // Sinon, créez une nouvelle balise <span> avec la couleur de fond
        console.log("Création de nouvelles balises");
        const newSpan = `<span style="background-color: ${newColorBackgroundText};">${p1}</span>`;
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
    <div className='mt-4 p-2'>
      <p className='text-white text-center font-bold mb-3' style={{textShadow: "2px 2px 7px rgba(0, 0, 0, 1)",}}>
        {language === "fr" ? "Dans cette présentation, vous choisissez la mise en forme du texte" : "In this presentation, you choose the text formatting."}  
      </p>

      <section className='py-2 '>
        <div className='boutonGris bouton' onClick={handleUndo}><img className='w-[80%]' src="/icons/undo-icon.png" alt="icon undo" /></div>
        <div className='boutonGris bouton' onClick={handleRedo}><img className='w-[80%]' src="/icons/redo-icon.png" alt="icon redo" /></div>
        <div className='longBoutonGris bouton' onClick={handleH2Click} title='<h2>'>{language === "fr" ? "Titre" : "Title"}</div>
        <div className='longBoutonGris bouton' onClick={handleH3Click} title='<h3>'>{language === "fr" ? "Sous-titre" : "Sub-title"}</div>
        <div className='longBoutonGris bouton' onClick={handleParagraphClick} title='<p>'>{language === "fr" ? "Paragraphe" : "Paragraph"}</div>
        <div className='longBoutonGris bouton' onClick={insertLineBreak} title='<br/>'>{language === "fr" ? "Retour ligne" : "Line break"}</div>
         {/* Choisir la taille du texte ------------------------------------------------------- */}
         <select value={fontSize} className='p-1 border border-solid rounded' onChange={handleFontSizeChange} style={{ marginLeft: '10px' }}>
          <option >{language === "fr" ? "Taille du texte" : "Font size"}</option>
          <option value="0.5rem">x 0.5</option>
          <option value="0.75rem">x 0.75</option>
          <option value="1rem">{language === "fr" ? "Par défaut" : "By default"}</option>
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
        className='text-black'
      />
      
    </div>    


  );
}

export default MyTextArea;