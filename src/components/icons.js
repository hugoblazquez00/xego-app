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

export const HomeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    {...props}
  >
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
  </svg>
);


export function BoldComputer(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><defs><mask id="IconifyId19518abcaf1c7caf50"><g fill="none" strokeWidth="4"><path stroke="#fff" strokeLinecap="round" strokeLinecap="round" d="M19 32h10v9H19z"/><rect width="38" height="24" x="5" y="8" fill="#fff" stroke="#fff" rx="2"/><path stroke="#000" strokeLinecap="round" strokeLinecap="round" d="M22 27h4"/><path stroke="#fff" strokeLinecap="round" strokeLinecap="round" d="M14 41h20"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19518abcaf1c7caf50)"/></svg>
  )
}
export function OnComputer(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><defs><mask id="IconifyId19518abcaf1c7caf52"><g fill="none" stroke="#fff" strokeWidth="4"><path strokeLinecap="round" strokeLinecap="round" d="M19 32h10v9H19z"/><rect width="38" height="24" x="5" y="8" fill="#555" rx="2"/><path strokeLinecap="round" strokeLinecap="round" d="M22 27h4M14 41h20"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId19518abcaf1c7caf52)"/></svg>
  )
}
export function EmptyComputer(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><g fill="none" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinecap="round" d="M19 32h10v9H19z"/><rect width="38" height="24" x="5" y="8" rx="2"/><path strokeLinecap="round" strokeLinecap="round" d="M22 27h4M14 41h20"/></g></svg>
  )
}

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

export function ProiconsDelete(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.687 6.213L6.8 18.976a2.5 2.5 0 0 0 2.466 2.092h3.348m6.698-14.855L17.2 18.976a2.5 2.5 0 0 1-2.466 2.092h-3.348m-1.364-9.952v5.049m3.956-5.049v5.049M2.75 6.213h18.5m-6.473 0v-1.78a1.5 1.5 0 0 0-1.5-1.5h-2.554a1.5 1.5 0 0 0-1.5 1.5v1.78z"/>
    </svg>
  );
} 

export function AiHelperIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
        <path d="M14.17 20.89c4.184-.277 7.516-3.657 7.79-7.9c.053-.83.053-1.69 0-2.52c-.274-4.242-3.606-7.62-7.79-7.899a33 33 0 0 0-4.34 0c-4.184.278-7.516 3.657-7.79 7.9a20 20 0 0 0 0 2.52c.1 1.545.783 2.976 1.588 4.184c.467.845.159 1.9-.328 2.823c-.35.665-.526.997-.385 1.237c.14.24.455.248 1.084.263c1.245.03 2.084-.322 2.75-.813c.377-.279.566-.418.696-.434s.387.09.899.3c.46.19.995.307 1.485.34c1.425.094 2.914.094 4.342 0"/>
        <path d="m7.5 15l1.842-5.526a.694.694 0 0 1 1.316 0L12.5 15m3-6v6m-7-2h3"/></g></svg>
  )
}