'use client'

import { Roadmap } from '@/components/Roadmap'
import type { RoadmapData } from '@/lib/roadmap'

interface ContentViewProps {
  roadmapData: RoadmapData
}

export function ContentView({ roadmapData }: ContentViewProps) {
  return (
    <>
      <div className="page-noise" aria-hidden="true" />
      <div className="bg-red-glow bg-red-glow-a" aria-hidden="true" />
      <div className="bg-red-glow bg-red-glow-b" aria-hidden="true" />

      <Roadmap data={roadmapData} />
    </>
  )
}
