import './globals.css'
import type { Metadata } from 'next'
import { getRoadmapData } from '@/lib/roadmap'

const roadmapData = getRoadmapData()
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: roadmapData.tabTitle,
  description: roadmapData.metaDescription,
  icons: {
    icon: `${basePath}/favicon.png`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  )
}