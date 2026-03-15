'use client'

import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { basePath } from '@/lib/config'

interface LearningPathHeaderProps {
  title: string
  description: string
}

export function LearningPathHeader({ title, description }: LearningPathHeaderProps) {
  return (
    <header className="site-header container" role="banner">
      <div className="site-header-bar">
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

      <section id="top" className="hero container">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-description">{description}</p>
      </section>
    </header>
  )
}
