import { ContentView } from './ContentView'
import { getTranslations, type Locale } from '@/lib/i18n'
import type { RoadmapData } from '@/lib/roadmap'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const localeData = await getTranslations(locale as Locale)

  // Преобразуем LocaleData в RoadmapData
  const data: RoadmapData = {
    productName: localeData.common.productName,
    title: localeData.common.title,
    tabTitle: localeData.meta.tabTitle,
    metaDescription: localeData.meta.description,
    periods: localeData.periods,
  }

  return <ContentView roadmapData={data} />
}