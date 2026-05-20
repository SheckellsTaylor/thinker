export interface GeneratedProject {
  title: string
  overview: string
  folders: string[]
  opportunities: string[]
  resources: {
    title: string
    type: 'article' | 'video' | 'tool'
    description: string
  }[]
  next_steps: string[]
  slides: {
    title: string
    content: string
  }[]
}

export interface Project {
  id: string
  title: string
  initial_input: string
  created_at: string
}
