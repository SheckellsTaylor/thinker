// app/api/grow-idea/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import type { GeneratedProject } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json()
    if (!idea || typeof idea !== 'string') {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are a project strategist. Given a user's idea, generate a structured project workspace.

Return valid JSON with this exact structure:
{
  "title": "Clear project title",
  "overview": "2-3 sentence summary of the concept and its potential",
  "folders": ["Research", "Features", "Competitors", "Audience", "Monetization"],
  "opportunities": ["Opportunity 1", "Opportunity 2", "Opportunity 3"],
  "resources": [
    {"title": "Resource name", "type": "article|video|tool", "description": "Why it's relevant"}
  ],
  "next_steps": ["Immediate action 1", "Immediate action 2", "Immediate action 3"],
  "slides": [
    {"title": "Problem", "content": "What problem does this solve?"},
    {"title": "Audience", "content": "Who is this for?"},
    {"title": "Opportunity", "content": "Why now? What's the market?"},
    {"title": "Risks", "content": "Key challenges to consider"},
    {"title": "First Move", "content": "The very next step to take"}
  ]
}

Be specific to the actual idea. Avoid generic advice.`
        },
        { role: 'user', content: idea }
      ],
    })

    const raw = completion.choices[0].message.content ?? '{}'
    const start = raw.indexOf('{')
    const end = raw.lastIndexOf('}')
    const safe = start !== -1 && end !== -1 ? raw.slice(start, end + 1) : '{}'

    const project: GeneratedProject = JSON.parse(safe)
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error generating project:', error)
    return NextResponse.json({ error: 'Failed to generate project' }, { status: 500 })
  }
}
