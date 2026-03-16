'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import logo from '@/public/pt-edtechlab-logo.png'

interface HeaderProps {
  locale: string
  navLabels: {
    roadmap: string
    learning: string
  }
}

export function Header({ locale, navLabels }: HeaderProps) {
  const pathname = usePathname()

  const navItems = [
    { href: `/${locale}`, label: navLabels.roadmap, active: !pathname.includes('/learning') },
    { href: `/${locale}/learning`, label: navLabels.learning, active: pathname.includes('/learning') },
  ]

  return (
    <header className="site-top-header" role="banner">
      <div className="site-top-bar container">
        {/* Левая часть: логотип и навигация */}
        <div className="site-top-bar-left">
          <Link href={`/${locale}`} className="brand-link" aria-label="PT EdTechLab">
            <img
              src={logo.src}
              alt="PT EdTechLab"
              className="brand-logo"
            />
            <span className="brand-name">PT EdTechLab</span>
          </Link>

          <nav className="site-main-nav" aria-label="Main navigation">
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
        </div>

        {/* Правая часть: переключатель языка */}
        <div className="site-top-bar-right">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  )
}
