import React, { useEffect, useState } from "react";

export function WebsiteView({ projectId, currentScreen }) {
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const loadBundle = async () => {
      try {
        const response = await fetch(`/api/bundle?projectID=${projectId}&screen=${currentScreen}`, { method: "POST" });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const code = await response.text();

        const blob = new Blob([code], { type: "text/javascript" });
        const scriptURL = URL.createObjectURL(blob);

        const htmlContent = `
          <html>
            <head>
              <title>React App</title>
            </head>
            <body>
              <div id="root"></div>
              <script type="module" src="${scriptURL}"></script>
            </body>
          </html>
        `;

        const htmlBlob = new Blob([htmlContent], { type: "text/html" });
        const htmlURL = URL.createObjectURL(htmlBlob);
        setIframeSrc(htmlURL);
      } catch (error) {
        console.error("Error loading bundle:", error);
      }
    };

    loadBundle();
  }, [projectId, currentScreen]);

  return (
    <div className="website-view" style={{ width: "100%" }}>
      <iframe src={iframeSrc || "about:blank"} style={{ width: "100%", height: "100vh", border: "none" }} />
    </div>
  );
}