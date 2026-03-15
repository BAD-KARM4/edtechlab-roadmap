'use client'

import { LocaleSwitcher } from '@/components/LocaleSwitcher'

interface LearningPathHeaderProps {
  title: string
  description: string
}

export function LearningPathHeader({ title, description }: LearningPathHeaderProps) {
  return (
    <header className="learning-path-header container" role="banner">
      <div className="learning-path-header-bar">
        <h1 className="learning-path-header-title">{title}</h1>
        <LocaleSwitcher />
      </div>

      <section id="top" className="learning-path-hero">
        <p className="hero-description">{description}</p>
      </section>
    </header>
  )
}
