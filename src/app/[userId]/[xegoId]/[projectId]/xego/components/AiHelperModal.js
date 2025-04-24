"use client"

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createAiMessage, fetchAiMessages, fetchFile } from '@/app/utils/api';
import { AiHelperConvoIcon, SendIcon, AddContextIcon } from '@/components/icons';

export function AiHelperModal({ isOpen, onClose, projectId, files }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);
  const contextMenuRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    try {
      const fetchedMessages = await fetchAiMessages(projectId);
      setMessages(fetchedMessages);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadMessages();
    }
  }, [isOpen, projectId]);

  const handleFileSelect = async (file) => {
    if (selectedFiles.some(f => f.path === file.path)) return;
    
    try {
      const fileContent = await fetchFile(projectId, file.name);
      setSelectedFiles(prev => [...prev, {
        path: file.path,
        content: fileContent.content
      }]);
      setIsContextMenuOpen(false);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  const removeFile = (path) => {
    setSelectedFiles(prev => prev.filter(f => f.path !== path));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const lastMessages = messages
      .filter(msg => msg.sender === 'user')
      .slice(-5)
      .map(msg => ({ content: msg.content }));

    setIsLoading(true);
    try {
      await createAiMessage(projectId, message, selectedFiles, lastMessages);
      setMessage('');
      setSelectedFiles([]);
      await loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setIsContextMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-[600px] max-w-[90%] h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-4">
          <AiHelperConvoIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">AI Helper</h2>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <ReactMarkdown
                    children={msg.content}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({ node, ...props }) => <p className="prose prose-sm dark:prose-invert" {...props} />,
                        pre: ({ node, ...props }) => {
                          const code = props.children?.props?.children || '';
                          return (
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  copyToClipboard(code);
                                }}
                                className="text-xs bg-white/10 hover:bg-white/20 absolute top-1 right-1 px-2 py-0.5 rounded"
                              >
                                {copied ? 'Copied' : 'Copy'}
                              </button>
                              <pre className="bg-gray-900 text-white p-2 rounded-md overflow-x-auto my-2" {...props} />
                            </div>
                          );
                        },
                        code: ({ inline, children, ...props }) => (
                          inline ? (
                            <code className="bg-gray-100 text-gray-600 px-1 rounded" {...props}>
                              {children}
                            </code>
                          ) : (
                            <code className="bg-gray-100 text-gray-600 px-1 rounded" {...props}>{children}</code>
                          )
                        )
                    }}
                />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedFiles.map((file) => (
              <div
                key={file.path}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2 group"
              >
                <span className="text-sm">{file.path}</span>
                <button
                  onClick={() => removeFile(file.path)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-2 items-end relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex-1 flex items-end gap-2">
            <button
              type="button"
              onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
              className="p-2 mb-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <AddContextIcon className="w-5 h-5" />
            </button>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className={`p-2 mb-2 flex items-center justify-center transition-colors ${
              isLoading || !message.trim()
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:text-blue-600'
            }`}
          >
            <SendIcon className={`w-5 h-5 ${isLoading ? 'opacity-50' : ''}`} />
          </button>
          {isContextMenuOpen && (
            <div
              ref={contextMenuRef}
              className="absolute bottom-full left-0 mb-2 w-64 max-h-48 overflow-y-auto bg-white border rounded-lg shadow-lg"
            >
              {files.filter(file => file.type === 'file').map((file) => (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => handleFileSelect(file)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {file.path}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}