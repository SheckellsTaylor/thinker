'use client'

import { Project } from '@/lib/types'

interface SidebarProps {
  projects: Project[]
  activeProjectId: string | null
  onSelectProject: (id: string) => void
  onNewProject: () => void
}

export function Sidebar({ projects, activeProjectId, onSelectProject, onNewProject }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-neutral-50 border-r border-neutral-200 flex flex-col">
      <div className="p-4 border-b border-neutral-200">
        <h1 className="text-lg font-semibold text-neutral-900">Idea OS</h1>
      </div>

      <div className="p-3">
        <button
          onClick={onNewProject}
          className="w-full px-3 py-2 text-sm text-left text-neutral-600 hover:bg-neutral-100
                     rounded-md transition-colors flex items-center gap-2"
        >
          <span className="text-lg">+</span> New Project
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <p className="px-3 py-1 text-xs font-medium text-neutral-400 uppercase tracking-wider">
          Projects
        </p>
        <ul className="mt-2 space-y-1">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={`w-full px-3 py-2 text-sm text-left rounded-md transition-colors
                  ${activeProjectId === project.id
                    ? 'bg-neutral-200 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
              >
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
