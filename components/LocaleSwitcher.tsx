'use client'

import { usePathname } from 'next/navigation'
import { supportedLocales, type Locale } from '@/lib/i18n'

const localeNames: Record<Locale, string> = {
  ru: 'RU',
  en: 'EN',
}

export function LocaleSwitcher() {
  const pathname = usePathname()

  // Извлекаем текущий locale из pathname
  const parts = pathname.split('/').filter(Boolean)
  const currentLocale = (parts[0] as Locale) || 'ru'

  function getHref(locale: Locale): string {
    // Определяем базовый путь без текущего locale
    let pathWithoutLocale = pathname
    if (parts[0] && supportedLocales.includes(parts[0] as Locale)) {
      pathWithoutLocale = pathname.replace(`/${parts[0]}`, '')
    }

    // Обеспечиваем, что путь начинается с /
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = `/${pathWithoutLocale}`
    }

    // Возвращаем путь с новым locale
    return `/${locale}${pathWithoutLocale}`
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
