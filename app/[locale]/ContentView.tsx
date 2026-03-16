'use client'

import { Suspense } from 'react'
import { Roadmap } from '@/components/Roadmap'
import { LearningPath } from '@/components/LearningPath'
import type { RoadmapData } from '@/lib/roadmap'
import type { LearningPathData } from '@/lib/i18n'

interface ContentViewProps {
  roadmapData: RoadmapData
  learningPathData: LearningPathData
  locale: string
  view: string | null
}

function ContentViewInner({
  roadmapData,
  learningPathData,
  locale,
  view,
}: ContentViewProps) {
  const isLearning = view === 'learning'

  return (
    <>
      <div className="page-noise" aria-hidden="true" />
      <div className="bg-red-glow bg-red-glow-a" aria-hidden="true" />
      <div className="bg-red-glow bg-red-glow-b" aria-hidden="true" />

      {isLearning ? (
        <LearningPath data={learningPathData} locale={locale} />
      ) : (
        <Roadmap data={roadmapData} />
      )}
    </>
  )
}

export function ContentView({
  roadmapData,
  learningPathData,
  locale,
  view,
}: ContentViewProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentViewInner
        roadmapData={roadmapData}
        learningPathData={learningPathData}
        locale={locale}
        view={view}
      />
    </Suspense>
  )
}
