'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Roadmap', active: !pathname.includes('?view=') },
    { href: '/?view=learning', label: 'Learning', active: pathname.includes('?view=learning') },
  ]

  return (
    <header className="site-top-header" role="banner">
      {/* Верхняя панель */}
      <div className="site-top-bar container">
        <Link href="/" className="brand-link" aria-label="PT EdTechLab">
          <img
            src="/pt-edtechlab-logo.png"
            alt="PT EdTechLab"
            className="brand-logo"
          />
          <span className="brand-name">PT EdTechLab</span>
          <span className="brand-company">Positive Technologies</span>
        </Link>
        <LocaleSwitcher />
      </div>

      {/* Основная навигация */}
      <nav className="site-main-nav container" aria-label="Main navigation">
        <ul className="site-nav-list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`site-nav-link ${item.active ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
