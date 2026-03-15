'use client'

import { usePathname } from 'next/navigation'
import { supportedLocales, type Locale } from '@/lib/i18n'
import { basePath } from '@/lib/config'

const localeNames: Record<Locale, string> = {
  ru: 'RU',
  en: 'EN',
}

export function LocaleSwitcher() {
  const pathname = usePathname()

  // Извлекаем текущий locale из pathname
  const pathnameWithoutBase = pathname.replace(basePath, '')
  const parts = pathnameWithoutBase.split('/').filter(Boolean)
  const currentLocale = (parts[0] as Locale) || 'ru'

  function getHref(locale: Locale): string {
    // Удаляем текущий locale из пути
    let pathWithoutLocale = pathnameWithoutBase
    if (parts[0] && supportedLocales.includes(parts[0] as Locale)) {
      pathWithoutLocale = pathnameWithoutBase.replace(`/${parts[0]}`, '')
    }

    // Обеспечиваем, что путь начинается и заканчивается правильно
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = `/${pathWithoutLocale}`
    }

    // Удаляем trailing slash для консистентности
    pathWithoutLocale = pathWithoutLocale.replace(/\/$/, '')

    // Обрабатываем корневой путь
    if (pathWithoutLocale === '') {
      return `${basePath}/${locale}/`
    }

    return `${basePath}/${locale}${pathWithoutLocale}/`
  }

  return (
    <nav className="locale-switcher" aria-label="Language switcher">
      {supportedLocales.map((locale) => {
        const isActive = locale === currentLocale

        return (
          <a
            key={locale}
            href={getHref(locale)}
            className={`locale-switcher-link ${isActive ? 'locale-switcher-link-active' : ''}`}
            lang={locale}
            aria-current={isActive ? 'true' : undefined}
          >
            {localeNames[locale]}
          </a>
        )
      })}
    </nav>
  )
}
