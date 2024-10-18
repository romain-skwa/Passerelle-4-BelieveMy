import React, { useState } from 'react';
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

  /*********** TITRE H3 ******************************************************************************** */
  const handleH3Click = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') { return; }
  
    const isH3 = selectedText.includes('<h3>') && selectedText.includes('</h3>');
    const isH4 = selectedText.includes('<h4>') && selectedText.includes('</h4>');
    
    let newText;
    if (isH4) {
      newText = textarea.value.replace(selectedText, selectedText.replace(/<h4>(.*?)<\/h4>/, '<h3>$1</h3>'));
    } else if (isH3) {
      newText = textarea.value.replace(selectedText, selectedText.replace(/<h3>(.*?)<\/h3>/, '$1'));
    } else {
      newText = textarea.value.replace(selectedText, `<h3>${selectedText}</h3>`);
    }
    
    setText(newText);
  };

/*********** TITRE H4 ******************************************************************************** */
  const handleH4Click = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') {
      return;  
    }
  
    const isH3 = selectedText.includes('<h3>') && selectedText.includes('</h3>');
    const isH4 = selectedText.includes('<h4>') && selectedText.includes('</h4>');
    
    let newText;
    if (isH3) {
      newText = textarea.value.replace(selectedText, selectedText.replace(/<h3>(.*?)<\/h3>/, '<h4>$1</h4>'));
    } else if (isH4) {
      newText = textarea.value.replace(selectedText, selectedText.replace(/<h4>(.*?)<\/h4>/, '$1'));
    } else {
      newText = textarea.value.replace(selectedText, `<h4>${selectedText}</h4>`);
    }
    
    setText(newText);
  };
  
/*********** Taille du texte ******************************************************************************** */
  const handleFontSizeChange = (e) => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    const newSize = e.target.value;

    if (selectedText === '') { return; }

    // Effacer les balises déjà existantes
    const cleanText = selectedText.replace(/<span style="font-size: [^"]*">([^<]+)<\/span>/g, '$1');
    
    const newText = textarea.value.replace(selectedText, `<span style="font-size: ${newSize}">${cleanText}</span>`);
    setText(newText);
    setFontSize(newSize); // mettre à jour la variable fontSize
  };

/*********** Inclure dans Paragraphe ******************************************************************************** */
  const handleParagraphClick = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') {
        return;  
    }

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
    
    if (selectedText === '') {
      // Aucun texte sélectionné, ne faites rien  
      return;  
    }
  
    // Vérifier si le texte sélectionné est déjà en gras
    const isBold = selectedText.includes('<b>') && selectedText.includes('</b>');
    
    // Si le texte est déjà en gras, on le remplace par le texte sans balises <b>
    let newText;
    if (isBold) {
      newText = textarea.value.replace(selectedText, selectedText.replace(/<b>(.*?)<\/b>/, '$1'));
    } else {
      // Si le texte n'est pas en gras, on l'encadre avec les balises <b>
      newText = textarea.value.replace(selectedText, `<b>${selectedText}</b>`);
    }
    
    setText(newText);
  };

/*********** Italique ******************************************************************************** */
  const handleItalicClick = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') {
      return;  
    }
  
    const isItalic = selectedText.includes('<i>') && selectedText.includes('</i>');
    
    let newText;
    if (isItalic) {
      newText = textarea.value.replace(selectedText, selectedText.replace(/<i>(.*?)<\/i>/, '$1'));
    } else {
      newText = textarea.value.replace(selectedText, `<i>${selectedText}</i>`);
    }
    
    setText(newText);
  };

/*********** Souligner ******************************************************************************** */
  const handleUnderlineClick = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') {
      return;  
    }
  
    const isUnderline = selectedText.includes('<u>') && selectedText.includes('</u>');
    
    let newText;
    if (isUnderline) {
      newText = textarea.value.replace(selectedText, selectedText.replace(/<u>(.*?)<\/u>/, '$1'));
    } else {
      newText = textarea.value.replace(selectedText, `<u>${selectedText}</u>`);
    }
    
    setText(newText);
  };

/*********** Barrer le texte ******************************************************************************** */
  const handleStrikeThroughClick = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');  
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);  
  
    if (selectedText === '') {
      return;  
    }

    const isStrikeThrough = selectedText.includes('<s>') && selectedText.includes('</s>');
    
    let newText;
    if (isStrikeThrough) {
      newText = textarea.value.replace(selectedText, selectedText.replace(/<s>(.*?)<\/s>/, '$1'));
    } else {
      newText = textarea.value.replace(selectedText, `<s>${selectedText}</s>`);
    }
    
    setText(newText);
  };


/*********** Changer Couleur Texte ******************************************************************************** */

const handleColorChange = (newColorText) => {
  if (newColorText === "") { // Pour réinitialiser
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    console.log(`selectedText quand je tente une réinitialisation : `, selectedText);
    
    // Remplacer la balise <span style="color: ..."> et une balise de fermeture </span>
    const newText = textarea.value.replace(selectedText, selectedText.replace(/<span style="color: [^"]*">/, '').replace(/<\/span>/, ''));
    
    console.log(`newText : ce qu'il reste après avoir supprimé les balises : `, newText);
    setText(newText);
    setRectangleUnderA('#FFFFFF');
  } else {
    handleColorClick(newColorText);
  }
};

const handleColorClick = (newColorText) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  console.log(`selectedText au changement de couleur : `, selectedText);

  if (selectedText === '') { return; }
  
  // Recherche des balises <span style="color: ..."> existantes
  const regex = new RegExp(`(<span style=" [^"]*">)?(${selectedText})(<\/span>)?`, 'g');
  const matches = textarea.value.match(regex);

  let newText = textarea.value;
  if (matches && matches.length > 0) {
    // Remplace "color: ..." à l'intérieur de la balise <span> existante
    matches.forEach((match) => {
      if (match.includes(` color:`) || match.includes(`,color:`) || match.includes(`"color:`)) {
        // Si une balise <span style="color: ..."> existe déjà,
        newText = newText.replace(match, match.replace(/(?<!-)(color:\s*[^;"]*)/, `color: ${newColorText}`));
      } else {
        // Sinon, ajoute une nouvelle balise <span style="color: ...">
        newText = newText.replace(match, `<span style="color: ${newColorText}">${selectedText}</span>`);
      }
      setRectangleUnderA(newColorText);
    });
  } else { return }

  setText(newText);
};

/*********** Changer Background Texte ************************************************************* */
const handleBackgroundColorClick = (newColorBackgroundText) => {
  if (newColorBackgroundText === "") {/* Pour réinitialiser */
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    const newText = textarea.value.replace(selectedText, selectedText.replace(/<span style="background-color: [^"]*">/, '').replace(/<\/span>/, ''));
    setText(newText);
    setBackgroundUnderPencil('#ffff')
    console.log('on est censé réinitialiser la couleur de fond');
  } else {
    addBackgroundTag(newColorBackgroundText);
    setBackgroundUnderPencil(newColorBackgroundText)
  }
};

const addBackgroundTag = (newColorBackgroundText) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
  if (selectedText === '') { return; }

  // Recherche des balises <span style="background-color: ..."> existantes
  const regex = new RegExp(`(<span style=" [^"]*">)?(${selectedText})(<\/span>)?`, 'g');
  const matches = textarea.value.match(regex);

  let newText = textarea.value;
    // Remplace "background-color: ..." à l'intérieur de la balise <span> existante
    if (matches && matches.length > 0) {
      // Remplace "background-color: ..." à l'intérieur de la balise <span> existante    
      matches.forEach((match) => {    
        if (match.includes(` background-color:`) || match.includes(`,background-color:`) || match.includes(`"background-color:`)) {
              // Si une balise <span style="background-color: ..."> existe déjà,
              newText = newText.replace(match, match.replace(/(background-color:\s*[^;"]*)/, `background-color: ${newColorBackgroundText}`));    
        } else {    
          // Sinon, ajoute une nouvelle balise <span style="background-color: ...">    
          newText = newText.replace(match, `<span style="background-color: ${newColorBackgroundText}">${selectedText}</span>`);    
        }    
      });    
    } else {     
      return;    
    }

  setText(newText);
};

  /********* Alignement de la sélection ************************************************************************/
  const handleAlignLeft = () => {
    applyTextAlignment('left');
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
  
    if (selectedText === '') {
      return;  
    }
  
    // Expression régulière pour trouver la balise de positionnement existante
    const alignmentRegex = /<div style="text-align: (left|center|right);">(.*?)<\/div>/;
  
    // Remplacer la balise existante si elle existe
    let newText = textarea.value;
    if (alignmentRegex.test(selectedText)) {
      newText = newText.replace(alignmentRegex, `<div style="text-align: ${align};">$2</div>`);
    } else {
      // Si aucune balise n'existe, ajouter la nouvelle balise
      newText = newText.replace(selectedText, `<div style="text-align: ${align};">${selectedText}</div>`);
    }
  
    setText(newText);
  };

  return (
    <div className='entirety'>
      
      <section>
        <div className='boutonGris bouton' onClick={handleUndo}><img className='w-[80%]' src="/icons/undo-icon.png" alt="icon undo" /></div>
        <div className='boutonGris bouton' onClick={handleRedo}><img className='w-[80%]' src="/icons/redo-icon.png" alt="icon redo" /></div>
        <div className='longBoutonGris bouton' onClick={handleH3Click}>Titre</div>
        <div className='longBoutonGris bouton' onClick={handleH4Click}>Sous-titre</div>
        <div className='longBoutonGris bouton' onClick={handleParagraphClick}>Paragraphe</div>

         {/* Choisir la taille du texte ------------------------------------------------------- */}
         <select value={fontSize} onChange={handleFontSizeChange} style={{ marginRight: '10px' }}>
          <option value=" 8px">8px</option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="24px">24px</option>
          <option value="36px">36px</option>
          <option value="48px">48px</option>
        </select>        

        <div className='boutonGris bouton' onClick={handleBoldClick}><img className='w-[60%]' src="/icons/format-bold.png" alt="icon bold" /></div>
        <div className='boutonGris bouton' onClick={handleItalicClick}><img className='w-[60%]' src="/icons/italic-icon.png" alt="icon italic" /></div>
        <div className='boutonGris bouton' onClick={handleUnderlineClick}><img className='w-[60%]' src="/icons/underline-icon.png" alt="underline italic" /></div>
        <div className='boutonGris bouton' onClick={handleStrikeThroughClick}><img className='w-[60%]' src="/icons/strikethrough.png" alt="strikethrough italic" /></div>
        
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
        value={text}
        onChange={handleTextChange}
        placeholder="Entrez votre texte ici..."
      />
    </div>
  );
}

export default MyTextArea;