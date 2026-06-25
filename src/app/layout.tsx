import type { Metadata } from 'next'
import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'
import { MetaPixel } from '@/components/MetaPixel'
import './globals.css'

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-serif',
})

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: '守護神様タイプ診断 | あなたを守る神様がわかる',
  description: '40代から守護神様との縁が動き始めるといわれています。8問に答えるだけ、あなたを守る神様のタイプが分かる無料診断。',
  openGraph: {
    title: '守護神様タイプ診断',
    description: '40代から守護神様との縁が動き始めるといわれています。無料診断で、あなたの守護神様を知りましょう。',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`h-full antialiased ${notoSerifJP.variable} ${notoSansJP.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}
