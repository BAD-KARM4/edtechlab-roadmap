import { ContentView } from './ContentView'
import { getTranslations, type Locale } from '@/lib/i18n'
import type { RoadmapData } from '@/lib/roadmap'

export const dynamic = 'force-static'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ view?: string }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params
  const { view } = await searchParams
  const localeData = await getTranslations(locale as Locale)

  // Преобразуем LocaleData в RoadmapData
  const data: RoadmapData = {
    productName: localeData.common.productName,
    companyName: localeData.common.companyName,
    title: localeData.common.title,
    tabTitle: localeData.meta.tabTitle,
    metaDescription: localeData.meta.description,
    periods: localeData.periods,
  }

  // Данные для Learning Path
  const learningPathData = localeData.learningPath

  return (
    <ContentView
      roadmapData={data}
      learningPathData={learningPathData}
      locale={locale}
      view={view || null}
    />
  )
}