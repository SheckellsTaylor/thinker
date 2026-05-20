// components/Workspace.tsx
'use client'

import { useState } from 'react'
import type { GeneratedProject } from '@/lib/types'
import { IdeaInput } from './IdeaInput'
import { FolderTree } from './FolderTree'
import { SlideCard } from './SlideCard'

interface WorkspaceProps {
  project: GeneratedProject | null
  isLoading: boolean
  onGenerate: (idea: string) => void
}

export function Workspace({ project, isLoading, onGenerate }: WorkspaceProps) {
  const [activeFolder, setActiveFolder] = useState<string | null>(null)

  if (!project && !isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center p-8 bg-neutral-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            What are you building?
          </h2>
          <p className="text-neutral-500 mb-8">
            Enter an idea and let AI structure your thinking
          </p>
          <IdeaInput onGenerate={onGenerate} isLoading={isLoading} />
        </div>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center p-8 bg-neutral-100">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900
                          rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500">Growing your idea...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-neutral-100">
      <div className="max-w-5xl mx-auto space-y-8">
        <header>
          <h2 className="text-2xl font-semibold text-neutral-900">{project!.title}</h2>
          <p className="text-neutral-600 mt-2 leading-relaxed">{project!.overview}</p>
        </header>

        <section>
          <h3 className="text-sm font-medium text-neutral-500 mb-4">Overview</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {project!.slides.map((slide, i) => (
              <SlideCard key={i} slide={slide} index={i} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-3 gap-6">
          <FolderTree
            folders={project!.folders}
            onSelectFolder={setActiveFolder}
            activeFolder={activeFolder}
          />

          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-neutral-500 mb-3">Opportunities</h3>
            <ul className="space-y-2">
              {project!.opportunities.map((opp, i) => (
                <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">→</span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-neutral-500 mb-3">Learning Resources</h3>
            <ul className="space-y-3">
              {project!.resources.map((resource, i) => (
                <li key={i} className="text-sm">
                  <p className="font-medium text-neutral-900">{resource.title}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-neutral-500 mb-4">Next Steps</h3>
          <ul className="grid grid-cols-3 gap-4">
            {project!.next_steps.map((step, i) => (
              <li
                key={i}
                className="p-4 bg-neutral-50 rounded-lg text-sm text-neutral-700
                           hover:bg-neutral-100 cursor-pointer transition-colors"
              >
                {step}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-neutral-200 pt-6">
          <h3 className="text-sm font-medium text-neutral-500 mb-4">Go Deeper</h3>
          <div className="flex flex-wrap gap-2">
            {['Explore competitors', 'Generate roadmap', 'Create business model',
              'Visualize user journey', 'Build MVP plan'].map((action) => (
              <button
                key={action}
                className="px-4 py-2 text-sm bg-white border border-neutral-200 rounded-lg
                           text-neutral-700 hover:border-neutral-400 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
