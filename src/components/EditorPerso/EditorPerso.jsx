import React, { useState, useRef } from 'react';
import "../../app/styles/components.css";
import { useClickOutside } from '@mantine/hooks';

function MyTextArea() {
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
  const handleChange = (e) => { setText(e.target.value); };

  // Couleur 
  const colors = [
    "#FFFFFF", "#000000", "#FF0000", "#008000", "#00FF00", "#4CAF50", "#8BC34A", 
    "#FFFF00", "#FFA500", "#800080", "#C0C0C0", "#808080", "#FFC0CB", "#FF69B4",
    "#66CCCC", "#33CCCC", "#0099CC", "#0066CC", "#0033CC", "#0000FF",
    "#663300", "#996600", "#CC6600", "#FF9900"
  ];

  const toggleColorPicker = () => {
    setIsColorPickerVisible(prev => !prev); // Inverser la visibilité
  };

  const toggleBackgroundColorPicker = () => {
    setIsBackgroundColorPicker(prev => !prev); // Inverser la visibilité
  };

  // Ajouter la balise automatiquement quand j'appuie sur "entrée"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setText('<br />'); // Ajoute un <br /> au texte
    }
  };

  // Les boutons "Annuler" et "Rétablir"

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setUndoStack([...undoStack, text]);  
    setText(newText);  
    setRedoStack([]); // Réinitialise le stack de rétablissement  
  };
  
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
    let count = 0;
    const newText = textarea.value.replace(regex, (match, p1, offset) => {
      count++;
      // Vérifier si c'est l'occurrence que nous voulons formater
      if (offset === startIndex) {
        const isH3 = p1.includes('<h3>') && p1.includes('</h3>');
        const isH2 = p1.includes('<h2>') && p1.includes('</h2>');
  
        if (isH3) {
          // Si c'est déjà un <h3>, le changer en <h2>
          return p1.replace(/<h3>(.*?)<\/h3>/, '<h2>$1</h2>');
        } else if (isH2) {
          // Si c'est un <h2>, retirer les balises
          return p1.replace(/<h2>(.*?)<\/h2>/, '$1');
        } else {
          // Sinon, l'encadrer avec les balises <h3>
          return `<h2>${p1}</h2>`;
        }
      }
      return p1; // Retourner le texte original pour les autres occurrences
    });
  
    setText(newText);
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
  let count = 0;
  const newText = textarea.value.replace(regex, (match, p1, offset) => {
    count++;
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isH3 = p1.includes('<h3>') && p1.includes('</h3>');
      const isH2 = p1.includes('<h2>') && p1.includes('</h2>');

      if (isH2) {
        // Si c'est déjà un <h2>, le changer en <h2>
        return p1.replace(/<h2>(.*?)<\/h2>/, '<h3>$1</h3>');
      } else if (isH3) {
        // Si c'est un <h3>, retirer les balises
        return p1.replace(/<h3>(.*?)<\/h3>/, '$1');
      } else {
        // Sinon, l'encadrer avec les balises <h3>
        return `<h3>${p1}</h3>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);
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
  let count = 0;
  const newText = textarea.value.replace(regex, (match, p1, offset) => {
    count++;
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      // Si la nouvelle taille est "1rem", retirer la balise de taille de police
      if (newSize === "1rem") {
        return p1.replace(/<span style="font-size: [^"]*">([^<]+)<\/span>/g, '$1');
      } else {
        // Sinon, remplacer la taille de police existante ou ajouter une nouvelle balise
        const cleanText = p1.replace(/<span style="font-size: [^"]*">([^<]+)<\/span>/g, '$1');
        return `<span style="font-size: ${newSize}">${cleanText}</span>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);
  setFontSize(newSize); // Mettre à jour l'état de la taille de police
};

/*********** Inclure dans Paragraphe ******************************************************************************** */
  const handleParagraphClick = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') { return; }

    const isParagraph = selectedText.includes('<p>') && selectedText.includes('</p>');
    
    let newText;
    if (isParagraph) {
        newText = textarea.value.replace(selectedText, selectedText.replace(/<p>(.*?)<\/p>/, '$1'));
    } else {
        newText = textarea.value.replace(selectedText, `<p>${selectedText}</p>`);
    }
    
    setText(newText);
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
  let count = 0;
  const newText = textarea.value.replace(regex, (match, p1, offset) => {
    count++;
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isBold = selectedText.includes('<b>') && selectedText.includes('</b>');
      if (isBold) {
        return p1.replace(/<b>(.*?)<\/b>/, '$1');
      } else {
        // Si le texte n'est pas en gras, on l'encadre avec les balises <b>
        return `<b>${p1}</b>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);
};
/*********** Italique ******************************************************************************** */
const handleItalicClick = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') {
    return;  
  }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  let newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isItalic = selectedText.includes('<i>') && selectedText.includes('</i>');
      if (isItalic) {
        // Si le texte est déjà en italique, retirer les balises <i>
        return p1.replace(/<i>(.*?)<\/i>/, '$1');
      } else {
        // Sinon, ajouter les balises <i>
        return `<i>${p1}</i>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);
};

/*********** Souligner ******************************************************************************** */
const handleUnderlineClick = () => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') {
    return;  
  }

  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  const newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isUnderline = selectedText.includes('<u>') && selectedText.includes('</u>');
      if (isUnderline) {
        // Si le texte est déjà souligné, retirer les balises <u>
        return p1.replace(/<u>(.*?)<\/u>/, '$1');
      } else {
        // Sinon, ajouter les balises <u>
        return `<u>${p1}</u>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);
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
  let newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      const isStrikeThrough = selectedText.includes('<s>') && selectedText.includes('</s>');
      if (isStrikeThrough) {
        // Si le texte est déjà barré, retirer les balises <s>
        return p1.replace(/<s>(.*?)<\/s>/, '$1');
      } else {
        // Sinon, ajouter les balises <s>
        return `<s>${p1}</s>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);
};


/*********** Changer Couleur Texte *********************************************************************** */
  /* -------- Réinitialisation ------------------*/
const handleColorChange = (newColorText) => {
  if (newColorText === "") { // Pour réinitialiser
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    console.log(`selectedText quand je tente une réinitialisation : `, selectedText);
    
    // Trouver l'index de début de l'occurrence du texte sélectionné
    const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
    
    if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

    // Utiliser une regex pour trouver l'occurrence spécifique
    const regex = new RegExp(`(${selectedText})`, 'g');
    let newText = textarea.value.replace(regex, (match, p1, offset) => {
      // Vérifier si c'est l'occurrence que nous voulons formater
      if (offset === startIndex) {
        // Remplacer la balise <span style="color: ..."> et une balise de fermeture </span>
        return p1.replace(/<span style="color: [^"]*">/, '').replace(/<\/span>/, '');
      }
      return p1; // Retourner le texte original pour les autres occurrences
    });

    console.log(`newText : ce qu'il reste après avoir supprimé les balises : `, newText);
    setText(newText);
    setRectangleUnderA('rgba(255, 255, 255, 0)');
  } else {
    handleColorClick(newColorText);
  }
};

  /* -------- On change la couleur du texte ------------------*/
const handleColorClick = (newColorText) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  console.log(`selectedText au changement de couleur : `, selectedText);

  if (selectedText === '') { return; }
  
  // Trouver l'index de début de l'occurrence du texte sélectionné
  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  let newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      // Recherche des balises <span style="color: ..."> existantes
      const existingSpan = p1.match(/<span style="[^"]*">/);
      
      if (existingSpan) {
        // Remplace "color: ..." à l'intérieur de la balise <span> existante
        return p1.replace(/(?<!-)(color:\s*[^;"]*)/, `color: ${newColorText}`);
      } else {
        // Sinon, ajoute une nouvelle balise <span style="color: ...">
        return `<span style="color: ${newColorText}">${p1}</span>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  console.log(`newText : le texte après avoir ajouté la couleur : `, newText);
  setText(newText);
  setRectangleUnderA(newColorText);
};

/*********** Changer Background Texte ******************************************************************* */
  /* -------- Réinitialisation ------------------*/
const handleBackgroundColorClick = (newColorBackgroundText) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

  if (newColorBackgroundText === "") { // Pour réinitialiser
    console.log('on est censé réinitialiser la couleur de fond');
    
    if (selectedText === '') return; // Si aucun texte n'est sélectionné

    // Trouver l'index de début de l'occurrence du texte sélectionné
    const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
    
    if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

    // Utiliser une regex pour trouver l'occurrence spécifique
    const regex = new RegExp(`(${selectedText})`, 'g');
    const newText = textarea.value.replace(regex, (match, p1, offset) => {
      // Vérifier si c'est l'occurrence que nous voulons réinitialiser
      if (offset === startIndex) {
        return p1.replace(/<span style="background-color: [^"]*">/, '').replace(/<\/span>/, '');
      }
      return p1; // Retourner le texte original pour les autres occurrences
    });

    setText(newText);
    setBackgroundUnderPencil('rgba(255, 255, 255, 0)');
  } else {
    addBackgroundTag(newColorBackgroundText);
    setBackgroundUnderPencil(newColorBackgroundText);
  }
};

  /* -------- On change la couleur de FOND du texte ------------------*/
const addBackgroundTag = (newColorBackgroundText) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

  if (selectedText === '') return; // Si aucun texte n'est sélectionné

  // Trouver l'index de début de l'occurrence du texte sélectionné
  const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
  
  if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

  // Utiliser une regex pour trouver l'occurrence spécifique
  const regex = new RegExp(`(${selectedText})`, 'g');
  let newText = textarea.value.replace(regex, (match, p1, offset) => {
    // Vérifier si c'est l'occurrence que nous voulons formater
    if (offset === startIndex) {
      // Recherche des balises <span style="background-color: ..."> existantes
      const existingSpan = p1.match(/<span style="[^"]*">/);

      if (existingSpan) {
        // Remplace "background-color: ..." à l'intérieur de la balise <span> existante
        return p1.replace(/(background-color:\s*[^;"]*)/, `background-color: ${newColorBackgroundText}`);
      } else {
        // Sinon, ajoute une nouvelle balise <span style="background-color: ...">
        return `<span style="background-color: ${newColorBackgroundText}">${p1}</span>`;
      }
    }
    return p1; // Retourner le texte original pour les autres occurrences
  });

  setText(newText);
};

  /********* Alignement de la sélection ************************************************************************/
  const handleAlignLeft = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') { return; }
    
    const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
    
    if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

    // Expression régulière pour trouver la balise de positionnement existante
    const alignmentRegex = /<div style="text-align: (left|center|right);">(.*?)<\/div>/;
  
    let newText = textarea.value;

    // Utiliser une regex pour trouver l'occurrence spécifique
    const regex = new RegExp(`(${selectedText})`, 'g');

    newText = newText.replace(regex, (match, p1, offset) => {
        // Vérifier si c'est l'occurrence que nous voulons formater
        if (offset === startIndex) {
            // Si le texte sélectionné contient déjà une balise d'alignement, on la retire
            if (alignmentRegex.test(p1)) {
                return p1.replace(alignmentRegex, '$2'); // Remplace par le texte sans la balise
            } else {
                // Sinon, ajoute la nouvelle balise d'alignement à gauche
                return `<div style="text-align: left;">${p1}</div>`;
            }
        }
        return p1; // Retourner le texte original pour les autres occurrences
    });

    setText(newText);
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
  
    const startIndex = textarea.value.indexOf(selectedText, textarea.selectionStart);
    
    if (startIndex === -1) return; // Si le texte sélectionné n'est pas trouvé

    // Expression régulière pour trouver la balise de positionnement existante
    const alignmentRegex = /<div style="text-align: (left|center|right);">(.*?)<\/div>/;

    let newText = textarea.value;

    // Utiliser une regex pour trouver l'occurrence spécifique
    const regex = new RegExp(`(${selectedText})`, 'g');
    newText = newText.replace(regex, (match, p1, offset) => {
        // Vérifier si c'est l'occurrence que nous voulons formater
        if (offset === startIndex) {
            // Si le texte sélectionné contient déjà une balise d'alignement, on remplace la balise existante
            if (alignmentRegex.test(p1)) {
                return p1.replace(alignmentRegex, `<div style="text-align: ${align};">$2</div>`);
            } else {
                // Sinon, ajoute la nouvelle balise d'alignement
                return `<div style="text-align: ${align};">${p1}</div>`;
            }
        }
        return p1; // Retourner le texte original pour les autres occurrences
    });

    setText(newText);
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

  return (
    <div className='entirety'>
      
      <section>
        <div className='boutonGris bouton' onClick={handleUndo}><img className='w-[80%]' src="/icons/undo-icon.png" alt="icon undo" /></div>
        <div className='boutonGris bouton' onClick={handleRedo}><img className='w-[80%]' src="/icons/redo-icon.png" alt="icon redo" /></div>
        <div className='longBoutonGris bouton' onClick={handleH2Click} title='<h2>'>Titre</div>
        <div className='longBoutonGris bouton' onClick={handleH3Click} title='<h3>'>Sous-titre</div>
        <div className='longBoutonGris bouton' onClick={handleParagraphClick} title='<p>'>Paragraphe</div>
        <div className='longBoutonGris bouton' onClick={insertLineBreak} title='<br/>'>Retour ligne</div>
         {/* Choisir la taille du texte ------------------------------------------------------- */}
         <select value={fontSize} onChange={handleFontSizeChange} style={{ marginRight: '10px' }}>
          <option >Taille du texte</option>
          <option value="0.5rem">0.5rem</option>
          <option value="0.75rem">0.75rem</option>
          <option value="1rem">1rem</option>
          <option value="1.5rem">1.5rem</option>
          <option value="1.75rem">1.75rem</option>
          <option value="2rem">2rem</option>
          <option value="2.5rem">2.5rem</option>
          <option value="3rem">3rem</option>
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
        placeholder="Entrez votre texte ici..."
      />

      <div>
        <h3>Aperçu :</h3>
        <div 
          style={{ border: '1px solid #ccc', padding: '10px', minHeight: '50px', backgroundColor: 'white' }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>

    
  );
}

export default MyTextArea;