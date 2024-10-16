import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { marked } from 'marked';
import { demoText } from '../../data/demoText.js'
import './LiveMarkdownEditor.scss'

const MarkdownEditor = () => {
  const [viewMode, setViewMode] = useState('Formatted Preview'); // "Formatted Preview", "Raw HTML", "Raw Markdown"
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

  function getPreviewElement() {
    if (viewMode === 'Formatted Preview') {
      return <div className="live-preview-content" dangerouslySetInnerHTML={{ __html: marked(textContent) }} ></div>
    }
    else if (viewMode === 'Raw HTML') {
      console.log(markdownToHTML(textContent))
      return <pre className="live-preview-content">{markdownToHTML(textContent)}</pre>
    }
    else {
      return <pre className="live-preview-content">{textContent}</pre>
    }
  }

  return (
    <div className="text-editor">

      <textarea className="markdown-input"
        onChange={handleInputChange}
        value={textContent}
        placeholder="Type your content here..."
      />

      <div className="view-buttons">
        <button onClick={() => setViewMode('Formatted Preview')}>Formatted</button>
        <button onClick={() => setViewMode('Raw HTML')}>HTML</button>
        <button onClick={() => setViewMode('Raw Markdown')}>Markdown</button>
      </div>

      <div className="live-preview-container">
        <h3 id="live-preview-header-text">
          {viewMode}
        </h3>
        {getPreviewElement()}
      </div>
    </div>
  );
};

export default MarkdownEditor;
