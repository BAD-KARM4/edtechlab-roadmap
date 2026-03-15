import { defaultLocale } from '@/lib/i18n'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Для статического экспорта создаём HTML с meta refresh
// Middleware не работает с output: 'export'
export default function RootPage() {
  const redirectUrl = `${basePath}/${defaultLocale}/`
  
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="refresh" content={`0; url=${redirectUrl}`} />
        <title>Redirecting...</title>
      </head>
      <body>
        <p>Redirecting to <a href={redirectUrl}>{redirectUrl}</a>...</p>
      </body>
    </html>
  )
}
