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
      pluginsOpts: {
    'gjs-plugin': {
      // Plugin specific configurations
    }
  },
  // Other configurations
  noticeOnUnload: 0, // Prevents auto-formatting on unload
  // height: '100%',
  // fromElement: true,
  storageManager: {
    autoload: 0, // Prevents auto-saving which may trigger unwanted replacements
  },
  container: '#gjs',
  
  
  plugins: ['gjs-blocks-basic'],
  pluginsOpts: {
    'gjs-blocks-basic': {}
  },
  canvas: {
    styles: [
      'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.5.2/css/bootstrap.min.css'
    ],
    scripts: [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.5.2/js/bootstrap.min.js'
    ],
  },
  
  // Other possible configurations

      container: editorRef.current,
      components: `<html>
    <head>
      <meta charset="UTF-8">
      <title>GrapesJS Project</title>
    </head>
    <body>
      <div class="container">
       ${page_html}
      </div>
    </body>
  </html>`,
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
