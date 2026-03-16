import { LearningPath } from '@/components/LearningPath'
import { getTranslations, type Locale } from '@/lib/i18n'

interface LearningPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function LearningPage({ params }: LearningPageProps) {
  const { locale } = await params
  const localeData = await getTranslations(locale as Locale)
  const learningPathData = localeData.learningPath

  return <LearningPath data={learningPathData} locale={locale} />
}
