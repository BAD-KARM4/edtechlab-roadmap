'use client'

import { Suspense, useEffect, useState } from 'react'
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
  locale,
}: ContentViewProps) {
  const [isLearning, setIsLearning] = useState(false)

  useEffect(() => {
    const checkHash = () => {
      setIsLearning(window.location.hash === '#view=learning')
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

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
