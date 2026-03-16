'use client'

import { usePathname } from 'next/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { basePath } from '@/lib/config'

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: `${basePath}/`, label: 'Roadmap', active: !pathname.includes('?view=') },
    { href: `${basePath}/?view=learning`, label: 'Learning', active: pathname.includes('?view=learning') },
  ]

  return (
    <header className="site-top-header" role="banner">
      {/* Верхняя панель */}
      <div className="site-top-bar container">
        <a href={`${basePath}/`} className="brand-link" aria-label="PT EdTechLab">
          <img
            src={`${basePath}/pt-edtechlab-logo.png`}
            alt="PT EdTechLab"
            className="brand-logo"
          />
          <span className="brand-name">PT EdTechLab</span>
          <span className="brand-company">Positive Technologies</span>
        </a>
        <LocaleSwitcher />
      </div>

      {/* Основная навигация */}
      <nav className="site-main-nav container" aria-label="Main navigation">
        <ul className="site-nav-list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`site-nav-link ${item.active ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
