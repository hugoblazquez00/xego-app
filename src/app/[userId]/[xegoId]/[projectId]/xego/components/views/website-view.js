import React, { useEffect, useState } from "react";
import { fetchBundle } from '@/app/utils/api';

export function WebsiteView({ projectId, currentScreen, currentStep }) {
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const loadBundle = async () => {
      try {
        const code = await fetchBundle(projectId, currentScreen, currentStep);

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
  }, [projectId, currentScreen, currentStep]);

  return (
    <div className="website-view" style={{ width: "100%" }}>
      <iframe src={iframeSrc || "about:blank"} style={{ width: "100%", height: "100vh", border: "none" }} />
    </div>
  );
}