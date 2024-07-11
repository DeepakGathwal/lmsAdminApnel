// GrapeJsEditor.js
import React, { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import "./grapes.css";
import customBlocks from './DraggableBlock';
// import prismjs from 'prismjs';

const GrapeJsEditor = ({editorRef, page_html, page_css}) => {
 
  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      components: page_html,
      style:page_css,
      storageManager: false // Disable the storage manager for simplicity
    });

    // Register custom blocks with the Block Manager
    customBlocks.forEach(block => {
      editor.BlockManager.add(block.id, {
        label: block.label,
        content: block.content,
        attributes: block.attributes || {}, // Ensure default empty object if attributes are not provided
        category: 'Structure', // Specify the category for the blocks
        // Optionally, you can define styles for the block
        styles: block.styles,
        tagName: block.tagName,
        type: block.type,
        components: block.components,
      });
    });
  
    return () => editor.destroy();
  }, [page_html, page_css]);
 

  return  <div ref={editorRef} />
 
 
};

export default GrapeJsEditor;
