'use client'

import { useState, useEffect } from 'react' import { Sidebar } from '@/components/Sidebar' import { Workspace } from '@/components/Workspace' import { supabase } from '@/lib/supabase' import type { GeneratedProject, Project } from '@/lib/types'

export default function Home() { const [projects, setProjects] = useState<Project[]>([]) const [activeProjectId, setActiveProjectId] = useState<string | null>(null) const [currentProject, setCurrentProject] = useState<GeneratedProject | null>(null) const [isLoading, setIsLoading] = useState(false)

useEffect(() => { loadProjects() }, [])

async function loadProjects() { const { data, error } = await supabase .from('projects') .select('*') .order('created_at', { ascending: false }) if (!error && data) setProjects(data) }

async function handleGenerate(idea: string) { setIsLoading(true) setCurrentProject(null) try { const res = await fetch('/api/grow-idea', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idea }) }) if (!res.ok) throw new Error('Generation failed') const project: GeneratedProject = await res.json() setCurrentProject(project)



  const { data: saved } = await supabase
    .from('projects')
    .insert({ title: project.title, initial_input: idea })
    .select()
    .single()
  if (saved) {
    await supabase.from('ai_outputs').insert({
      project_id: saved.id,
      type: 'initial_generation',
      content: project
    })
    setActiveProjectId(saved.id)
    loadProjects()
  }
} finally {
  setIsLoading(false)
}
}

async function handleSelectProject(id: string) { setActiveProjectId(id) const { data } = await supabase .from('ai_outputs') .select('content') .eq('project_id', id) .eq('type', 'initial_generation') .single() if (data?.content) setCurrentProject(data.content as GeneratedProject) }

function handleNewProject() { setActiveProjectId(null) setCurrentProject(null) }

return (

) }
