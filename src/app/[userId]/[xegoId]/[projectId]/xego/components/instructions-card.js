export function InstructionsCard({ className = "" }) {
    return (
      <div className={`bg-white rounded-lg ${className}`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">2.1 - Login users</h2>
          <ul className="space-y-3">
            <li className="line-through text-gray-400">Create table on database</li>
            <li className="line-through text-gray-400">Create entity on backend</li>
            <li>Create API operations</li>
            <li className="text-gray-400">Connect frontend with endpoints</li>
          </ul>
        </div>
      </div>
    )
  }
  
  