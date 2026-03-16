import { ContentView } from './ContentView'
import { getTranslations, type Locale } from '@/lib/i18n'
import type { RoadmapData } from '@/lib/roadmap'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params
  const searchParamsData = await searchParams
  const view = searchParamsData.view as string | undefined
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