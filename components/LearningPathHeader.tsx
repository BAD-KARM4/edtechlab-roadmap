'use client'

import { LocaleSwitcher } from '@/components/LocaleSwitcher'

interface LearningPathHeaderProps {
  title: string
}

export function LearningPathHeader({ title }: LearningPathHeaderProps) {
  return (
    <header className="learning-path-header container" role="banner">
      <div className="learning-path-header-bar">
        <h1 className="learning-path-header-title">{title}</h1>
        <LocaleSwitcher />
      </div>
    </header>
  )
}
