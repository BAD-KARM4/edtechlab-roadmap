'use client'

import { useState } from 'react'
import { Roadmap } from '@/components/Roadmap'
import { LearningPath } from '@/components/LearningPath'
import { LearningPathHeader } from '@/components/LearningPathHeader'
import { ViewSwitcher, type ViewType } from '@/components/ViewSwitcher'
import type { RoadmapData } from '@/lib/roadmap'
import type { LearningPathData } from '@/lib/i18n'

interface ContentViewProps {
  roadmapData: RoadmapData
  learningPathData: LearningPathData
  locale: string
}

export function ContentView({
  roadmapData,
  learningPathData,
  locale,
}: ContentViewProps) {
  const [currentView, setCurrentView] = useState<ViewType>('roadmap')

  return (
    <>
      {currentView === 'roadmap' ? (
        <Roadmap data={roadmapData} />
      ) : (
        <>
          <LearningPathHeader
            title={learningPathData.title}
            description={learningPathData.description}
          />
          <LearningPath data={learningPathData} locale={locale} />
        </>
      )}
      
      {/* Плавающий переключатель справа */}
      <div className="view-switcher-floating">
        <ViewSwitcher currentView={currentView} onSwitch={setCurrentView} />
      </div>
    </>
  )
}
