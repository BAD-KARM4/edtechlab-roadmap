import { Roadmap } from '@/components/Roadmap'
import { getTranslations, type Locale } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const translations = await getTranslations(locale as Locale)
  
  // Импортируем buildRoadmapData здесь, чтобы избежать circular imports
  const { buildRoadmapData } = await import('@/lib/i18n')
  const data = buildRoadmapData(translations)

  return <Roadmap data={data} />
}