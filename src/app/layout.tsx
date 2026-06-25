import type { Metadata } from 'next'
import { MetaPixel } from '@/components/MetaPixel'
import './globals.css'

export const metadata: Metadata = {
  title: '守護神様タイプ診断 | あなたを守る神様がわかる',
  description: '8問に答えるだけ！あなたを守る守護神様のタイプがわかる無料診断。天照大御神・龍神・弁財天など8タイプから判定します。',
  openGraph: {
    title: '守護神様タイプ診断',
    description: '8問に答えるだけ！あなたを守る守護神様のタイプがわかる無料診断。',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}
