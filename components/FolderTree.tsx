// components/FolderTree.tsx
interface FolderTreeProps {
  folders: string[]
  onSelectFolder: (folder: string) => void
  activeFolder: string | null
}

export function FolderTree({ folders, onSelectFolder, activeFolder }: FolderTreeProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-neutral-500 mb-3">Folders</h3>
      <ul className="space-y-1">
        {folders.map((folder) => (
          <li key={folder}>
            <button
              onClick={() => onSelectFolder(folder)}
              className={`w-full px-3 py-2 text-sm text-left rounded-md transition-colors
                flex items-center gap-2
                ${activeFolder === folder
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-600 hover:bg-neutral-50'
                }`}
            >
              <span className="text-neutral-400">📁</span>
              {folder}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
