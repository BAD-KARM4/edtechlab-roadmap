import { Roadmap } from '@/components/Roadmap'
import { getTranslations, type Locale } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const data = await getTranslations(locale as Locale)

  return <Roadmap data={data} />
}