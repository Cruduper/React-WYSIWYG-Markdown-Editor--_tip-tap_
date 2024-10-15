import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { marked } from 'marked';
import { demoText } from '../../data/demoText.js'
import './MarkdownEditor.scss'

const MarkdownEditor = () => {
  const [viewMode, setViewMode] = useState('formatted');
  const [textContent, setTextContent] = useState(demoText);
  const editor = useEditor({
    extensions: [
      StarterKit, 
      Highlight, 
      Typography
    ],
    content: textContent,
  });

  const handleInputChange = (event) => {
    const content = event.target.value;

    setTextContent(content);
    editor.commands.setContent(content);
  };

  function markdownToHTML(markdownInput) {
    console.log("markdown input: " + markdownInput)
    return marked(markdownInput);
  }

  return (
    <div className="text-editor">

      <textarea className="markdown-input"
        onChange={handleInputChange}
        value={textContent}
        placeholder="Type your content here..."
      />

      <div className="view-buttons">
        <button onClick={() => setViewMode('formatted')}>Formatted</button>
        <button onClick={() => setViewMode('html')}>HTML</button>
        <button onClick={() => setViewMode('markdown')}>Markdown</button>
      </div>

      <div className="live-preview-container">
        <h3 id="live-preview-header-text">
          {viewMode === 'formatted' && 'Formatted Preview'}
          {viewMode === 'html' && 'Raw HTML'}
          {viewMode === 'markdown' && 'Raw Markdown'}
        </h3>
        { viewMode === 'formatted' && 
          <div className="live-preview-content" dangerouslySetInnerHTML={{ __html:marked(textContent) }} ></div>
        } 
        { viewMode === 'html' && 
          <>
            <pre className="live-preview-content">{markdownToHTML(textContent)}</pre>
          </>
        } 
        { viewMode === 'markdown' && 
          <pre className="live-preview-content">{textContent}</pre>
        } 
      </div>
    </div>
  );
};

export default MarkdownEditor;
