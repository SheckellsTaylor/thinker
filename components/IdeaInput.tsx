// components/IdeaInput.tsx
'use client'

import { useState } from 'react'

interface IdeaInputProps {
  onGenerate: (idea: string) => void
  isLoading: boolean
}

export function IdeaInput({ onGenerate, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (idea.trim()) onGenerate(idea.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col gap-4">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your idea..."
          className="w-full h-32 p-4 bg-neutral-50 border border-neutral-200 rounded-lg
                     text-neutral-900 placeholder:text-neutral-400 resize-none
                     focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!idea.trim() || isLoading}
          className="self-end px-6 py-2.5 bg-neutral-900 text-white rounded-lg font-medium
                     hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        >
          {isLoading ? 'Generating...' : 'Grow This Idea'}
        </button>
      </div>
    </form>
  )
}
