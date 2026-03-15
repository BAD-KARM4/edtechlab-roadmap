import type { RoadmapData, RoadmapPeriod, RoadmapItem } from './roadmap'
import roadmapStructure from '@/data/roadmap-structure.json'

export type Locale = 'ru' | 'en'

export const defaultLocale: Locale = 'ru'

export const supportedLocales: Locale[] = ['ru', 'en']

export interface Translations {
  meta: {
    tabTitle: string
    description: string
  }
  common: {
    productName: string
    companyName: string
    title: string
  }
  periods: Record<
    string,
    {
      label: string
      timeframe: string
      summary: string
    }
  >
  items: Record<
    string,
    {
      name: string
      description: string
    }
  >
}

function getTranslationByKey(translations: Translations, key: string): string {
  const parts = key.split('.')

  let current: unknown = translations
  for (const part of parts) {
    if (typeof current === 'object' && current !== null && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return key
    }
  }

  return typeof current === 'string' ? current : key
}

export async function getTranslations(locale: Locale): Promise<Translations> {
  try {
    const module = await import(`@/locales/${locale}.json`)
    return module.default as Translations
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error)
    // Fallback to default locale
    const module = await import(`@/locales/${defaultLocale}.json`)
    return module.default as Translations
  }
}

export function buildRoadmapData(
  translations: Translations
): RoadmapData {
  const structure = roadmapStructure as unknown as {
    productName: string
    companyName: string
    title: string
    tabTitle: string
    metaDescription: string
    periods: Array<{
      id: string
      label: string
      timeframe: string
      summary: string
      items: Array<{
        id: string
        name: string
        description: string
      }>
    }>
  }

  return {
    productName: getTranslationByKey(translations, structure.productName),
    companyName: getTranslationByKey(translations, structure.companyName),
    title: getTranslationByKey(translations, structure.title),
    tabTitle: getTranslationByKey(translations, structure.tabTitle),
    metaDescription: getTranslationByKey(translations, structure.metaDescription),
    periods: structure.periods.map((period) => ({
      id: period.id,
      label: getTranslationByKey(translations, period.label),
      timeframe: getTranslationByKey(translations, period.timeframe),
      summary: getTranslationByKey(translations, period.summary),
      items: period.items.map((item) => ({
        id: item.id,
        name: getTranslationByKey(translations, item.name),
        description: getTranslationByKey(translations, item.description),
      })),
    })),
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
