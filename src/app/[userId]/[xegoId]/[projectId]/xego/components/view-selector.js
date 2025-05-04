export function ViewSelector({ currentView, onViewChange, className = "" }) {
    return (
      <div className={`flex gap-2 p-4 border-t-2 border-[#2051de] ${className}`}>
        <button
          onClick={() => onViewChange("website")}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 border-2 border-transparent hover:border-[#0e2b80] ${
            currentView === "website" ? "bg-[#0e2b80] text-white" : "bg-secondary"
          }`}
        >
          Website view
        </button>
        <button
          onClick={() => onViewChange("frontend")}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 border-2 border-transparent hover:border-[#2051de] ${
            currentView === "frontend" ? "bg-[#2051de] text-white" : "bg-secondary"
          }`}
        >
          Frontend view
        </button>
        <button
          onClick={() => onViewChange("backend")}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 border-2 border-transparent hover:border-[#3b72ff] ${
            currentView === "backend" ? "bg-[#3b72ff] text-white" : "bg-secondary"
          }`}
        >
          Backend view
        </button>
        <button
          onClick={() => onViewChange("database")}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 border-2 border-transparent hover:border-[#6595ff] ${
            currentView === "database" ? "bg-[#6595ff] text-white" : "bg-secondary"
          }`}
        >
          Database view
        </button>
      </div>
    )
  }