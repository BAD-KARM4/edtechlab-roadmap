import { LearningPath } from '@/components/LearningPath'
import { getTranslations, supportedLocales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }))
}

interface LearningPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function LearningPage({ params }: LearningPageProps) {
  const { locale } = await params
  const localeData = await getTranslations(locale as Locale)
  const learningPathData = localeData.learningPath

  return <LearningPath data={learningPathData} locale={locale} />
}
