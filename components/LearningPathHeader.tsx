'use client'

import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { basePath } from '@/lib/config'

interface LearningPathHeaderProps {
  title: string
  description: string
}

export function LearningPathHeader({ title, description }: LearningPathHeaderProps) {
  return (
    <header className="learning-path-header container" role="banner">
      <div className="learning-path-header-bar">
        <a href="#main-content" className="brand-block" aria-label="PT EdTechLab">
          <img
            src={`${basePath}/pt-edtechlab-logo.png`}
            alt="PT EdTechLab"
            className="brand-logo-image"
          />
          <div className="brand-copy">
            <div className="brand-name">PT EdTechLab</div>
            <div className="brand-subtitle">Positive Technologies</div>
          </div>
        </a>
        <LocaleSwitcher />
      </div>

      <section className="learning-path-hero">
        <h1 className="learning-path-hero-title">{title}</h1>
        <p className="learning-path-hero-description">{description}</p>
      </section>
    </header>
  )
}
