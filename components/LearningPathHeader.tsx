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
        <LocaleSwitcher />
      </div>

      <section id="top" className="learning-path-hero">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-description">{description}</p>
      </section>
    </header>
  )
}
