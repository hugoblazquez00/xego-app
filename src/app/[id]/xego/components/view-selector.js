export function ViewSelector({ currentView, onViewChange, className = "" }) {
    return (
      <div className={`flex gap-2 p-4 border-t ${className}`}>
        <button
          onClick={() => onViewChange("website")}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
            currentView === "website" ? "bg-emerald-100 text-emerald-700" : "bg-secondary"
          }`}
        >
          Website view
        </button>
        <button
          onClick={() => onViewChange("frontend")}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
            currentView === "frontend" ? "bg-orange-100 text-orange-700" : "bg-secondary"
          }`}
        >
          Frontend view
        </button>
        <button
          onClick={() => onViewChange("backend")}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
            currentView === "backend" ? "bg-red-100 text-red-700" : "bg-secondary"
          }`}
        >
          Backend view
        </button>
        <button
          onClick={() => onViewChange("database")}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
            currentView === "database" ? "bg-blue-100 text-blue-700" : "bg-secondary"
          }`}
        >
          Database view
        </button>
      </div>
    )
  }