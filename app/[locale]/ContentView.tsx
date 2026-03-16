'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Roadmap } from '@/components/Roadmap'
import { LearningPath } from '@/components/LearningPath'
import type { RoadmapData } from '@/lib/roadmap'
import type { LearningPathData } from '@/lib/i18n'

interface ContentViewProps {
  roadmapData: RoadmapData
  learningPathData: LearningPathData
  locale: string
}

function ContentViewInner({
  roadmapData,
  learningPathData,
}: ContentViewProps) {
  const searchParams = useSearchParams()
  const view = searchParams.get('view')
  const isLearning = view === 'learning'

  return (
    <>
      <div className="page-noise" aria-hidden="true" />
      <div className="bg-red-glow bg-red-glow-a" aria-hidden="true" />
      <div className="bg-red-glow bg-red-glow-b" aria-hidden="true" />

      {isLearning ? (
        <LearningPath data={learningPathData} locale="ru" />
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
}: ContentViewProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentViewInner
        roadmapData={roadmapData}
        learningPathData={learningPathData}
        locale={locale}
      />
    </Suspense>
  )
}
