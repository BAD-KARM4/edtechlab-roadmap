import type { RoadmapData, RoadmapPeriod, RoadmapItem } from './roadmap'

export type Locale = 'ru' | 'en'

export const defaultLocale: Locale = 'ru'

export const supportedLocales: Locale[] = ['ru', 'en']

export interface LocaleData {
  meta: {
    tabTitle: string
    description: string
  }
  common: {
    productName: string
    companyName: string
    title: string
  }
  periods: RoadmapPeriod[]
}

export async function getTranslations(locale: Locale): Promise<LocaleData> {
  try {
    const module = await import(`@/locales/${locale}.json`)
    return module.default as LocaleData
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error)
    // Fallback to default locale
    const module = await import(`@/locales/${defaultLocale}.json`)
    return module.default as LocaleData
  }
}

export function isValidLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale)
}

export function getLocaleFromPath(pathname: string): Locale {
  const parts = pathname.split('/').filter(Boolean)
  const potentialLocale = parts[0] as Locale

  if (isValidLocale(potentialLocale)) {
    return potentialLocale
  }

  return defaultLocale
}

export function getPathnameWithLocale(pathname: string, locale: Locale): string {
  const basePath = '/edtechlab-roadmap'
  const currentLocale = getLocaleFromPath(pathname.replace(basePath, ''))

  // Remove leading slash and basePath for processing
  let pathWithoutLocale = pathname.replace(basePath, '')
  if (pathWithoutLocale.startsWith(`/${currentLocale}`)) {
    pathWithoutLocale = pathWithoutLocale.replace(`/${currentLocale}`, '')
  }

  // Ensure path starts with /
  if (!pathWithoutLocale.startsWith('/')) {
    pathWithoutLocale = `/${pathWithoutLocale}`
  }

  // Handle root path
  if (pathWithoutLocale === '/') {
    return `${basePath}/${locale}`
  }

  return `${basePath}/${locale}${pathWithoutLocale}`
}
