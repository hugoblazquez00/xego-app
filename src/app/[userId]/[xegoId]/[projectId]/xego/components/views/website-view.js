import React, { useEffect, useState } from "react";

export function WebsiteView({ projectId }) {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const loadBundle = async () => {
      try {
        const response = await fetch(`/api/bundle?projectID=${projectId}`, {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const code = await response.text();
        const blob = new Blob([code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        setIframeSrc(url);
      } catch (error) {
        console.error("Error loading bundle:", error);
      }
    };

    loadBundle();
  }, [projectId]);

  return (
    <div className="website-view">
      <iframe src={iframeSrc} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
} 