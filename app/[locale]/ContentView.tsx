'use client'

import { useState } from 'react'
import { Roadmap } from '@/components/Roadmap'
import { LearningPath } from '@/components/LearningPath'
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
        <LearningPath data={learningPathData} locale={locale} />
      )}
      
      {/* Переключатель между секциями */}
      <div className="view-switcher-section">
        <div className="container">
          <ViewSwitcher currentView={currentView} onSwitch={setCurrentView} />
        </div>
      </div>
    </>
  )
}
