import React from 'react';

export const FileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
  </svg>
);

export const FolderIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M10 4H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V10l-8-6z" />
  </svg>
);

export const CollapseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 3l-9 9h6v9h6v-9h6l-9-9z" />
  </svg>
); 