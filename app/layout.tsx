import './globals.css'
import type { Metadata } from 'next'
import { getRoadmapData } from '@/lib/roadmap'

const roadmapData = getRoadmapData()

export const metadata: Metadata = {
  title: roadmapData.tabTitle,
  description: roadmapData.metaDescription,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
