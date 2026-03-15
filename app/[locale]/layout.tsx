import '../globals.css'
import type { Metadata } from 'next'
import { getTranslations, supportedLocales, type Locale } from '@/lib/i18n'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params
  const translations = await getTranslations(locale as Locale)

  return {
    title: translations.meta.tabTitle,
    description: translations.meta.description,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
