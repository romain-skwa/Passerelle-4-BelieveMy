import React, { useState } from 'react';
import "../../app/styles/components.css";

function MyTextArea() {
  const [text, setText] = useState('');
  const [color, setColor] = useState(''); // default color
  const [fontSize, setFontSize] = useState('12px'); // default font size

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  
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


  const handleColorChange = (e) => {
    const newColor = e.target.value;
    if (newColor === '') { // Si l'option "Réinitialiser" est sélectionnée
      const textarea = document.getElementById('textareaDescriptionJeu');
      const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
      const newText = textarea.value.replace(selectedText, selectedText.replace(/<span style="color: [^"]*">([^<]+)<\/span>/g, '$1'));
      setText(newText);
    } else {
      handleColorClick(newColor);
    }
  };

  const handleColorClick = (newColor) => {
  const textarea = document.getElementById('textareaDescriptionJeu');
  const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

  // Recherche des balises <span style="color: ..."> existantes
  const regex = /<span style="color: [^"]*">([^<]+)<\/span>/g;
  const matches = textarea.value.match(regex);

  let newText = textarea.value;
  if (matches && matches.length > 0) {
    // Remplace les balises <span style="color: ..."> existantes
    matches.forEach((match) => {
      const innerText = match.replace(/<span style="color: [^"]*">|<\/span>/g, '');
      newText = newText.replace(match, `<span style="color: ${newColor}">${innerText}</span>`);
    });
  } else {
    // Ajoute une nouvelle balise <span style="color: ..."> si aucune n'existe
    newText = textarea.value.replace(selectedText, `<span style="color: ${newColor}">${selectedText}</span>`);
  }

  setText(newText);
};


  const handleH3Click = () => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') {
      return;  
    }
  
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
  
  // Taille du texte
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


  // Couleur background du texte
  const colors = [
    "#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FFA500", "#008000", "#800080", "#808000",
    "#C0C0C0", "#808080", "#FFC0CB", "#FF69B4", "#FF99CC",
    "#66CCCC", "#33CCCC", "#0099CC", "#0066CC", "#0033CC"
  ];

  const addBackgroundTag = (color) => {
    const textarea = document.getElementById('textareaDescriptionJeu');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    if (selectedText === '') {
      return;  
    }
    
    const newText = textarea.value.replace(selectedText, `<span style="background-color: ${color}">${selectedText}</span>`);
    setText(newText);
  };

  const handleBackgroundColorClick = (color) => {
    if (color === "") {
      const textarea = document.getElementById('textareaDescriptionJeu');
      const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
      const newText = textarea.value.replace(selectedText, selectedText.replace(/<span style="background-color: [^"]*">([^<]+)<\/span>/g, '$1'));
      setText(newText);
    } else {
      addBackgroundTag(color);
    }
  };

  return (
    <div>
      <textarea
        id="textareaDescriptionJeu"
        value={text}
        onChange={handleTextChange}
        placeholder="Entrez votre texte ici..."
      />
      <section>
        <div className='boutonGris' onClick={handleBoldClick}>Gras</div>
        <div className='boutonGris' onClick={handleItalicClick}>Italique</div>
        <div className='boutonGris' onClick={handleUnderlineClick}>Souligner</div>
        <div className='boutonGris' onClick={handleStrikeThroughClick}>Barrer</div>
        <div className='boutonGris' onClick={handleH3Click}>Titre H3</div>
        <div className='boutonGris' onClick={handleH4Click}>Titre H4</div>
        <div className='listeCouleurTexte'>
          <select value={color} onChange={handleColorChange}>
            <option value="">Sélectionnez une couleur</option>
            <option value="#FF0000">Rouge</option>
            <option value="#00FF00">Vert</option>
            <option value="#0000FF">Bleu</option>
            <option value="#FFFF00">Jaune</option>
            <option value="#008000">Vert foncé</option>
            <option value="#800080">Violet</option>
            <option value="#FFA500">Orange</option>
            <option value="#808000">Brun</option>
            <option value="">Réinitialiser</option>
          </select>
        </div>
             
        <select value={fontSize} onChange={handleFontSizeChange}>
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

        <div className="color-palette">
          {colors.map((color, index) => (
            <div
              key={index}
              style={{ backgroundColor: color, width: '30px', height: '30px', cursor: 'pointer', display: 'inline-block', margin: '2px' }}
              onClick={() => handleBackgroundColorClick(color)}
            />
          ))}
          <div
            style={{ backgroundColor: "#FFFFFF", width: '100px', height: '30px', cursor: 'pointer', display: 'inline-block', margin: '2px', padding: '4px 8px ', }}
            onClick={() => handleBackgroundColorClick("")}
          >
            Réinitialiser
          </div>
        </div>

      </section>
    </div>
  );
}

export default MyTextArea;