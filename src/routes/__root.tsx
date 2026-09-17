import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { guild } from '@/data/guild'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: `${guild.name} — a ${guild.game} guild`,
      },
      {
        name: 'description',
        content: guild.tagline,
      },
      {
        name: 'theme-color',
        content: '#14100c',
      },
      {
        property: 'og:title',
        content: `${guild.name} — a ${guild.game} guild`,
      },
      {
        property: 'og:description',
        content: guild.tagline,
      },
      {
        property: 'og:image',
        content: '/.netlify/images?url=/img/keep-at-dusk.png&w=1200&h=630&fit=cover&fm=jpg&q=80',
      },
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@400;600;700&family=Spectral:ital,wght@0,300;0,400;0,600;1,400&display=swap',
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
