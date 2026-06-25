import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '守護神様タイプ診断 | あなたを守る神様がわかる',
  description: '8問に答えるだけ！あなたを守る守護神様のタイプがわかる無料診断。天照大御神・龍神・弁財天など8タイプから判定します。',
  openGraph: {
    title: '守護神様タイプ診断',
    description: '8問に答えるだけ！あなたを守る守護神様のタイプがわかる無料診断。',
  },
}

const TYPES = [
  { emoji: '✨', name: '天照大御神' },
  { emoji: '🌙', name: '月読命' },
  { emoji: '⚡', name: '素戔嗚尊' },
  { emoji: '🦊', name: '稲荷大神' },
  { emoji: '🐉', name: '龍神' },
  { emoji: '🪷', name: '弁財天' },
  { emoji: '😊', name: '恵比寿様' },
  { emoji: '🍀', name: '大国主命' },
]

export default function TopPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-10">
        <p className="text-purple-300 text-sm tracking-widest mb-3">✦ 無料診断 ✦</p>
        <h1 className="text-white text-3xl font-bold leading-tight mb-4">
          あなたの<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
            守護神様タイプ
          </span>
          <br />診断
        </h1>
        <p className="text-purple-200 text-base leading-relaxed">
          8問に答えるだけで<br />
          あなたを守る神様のタイプがわかります
        </p>
      </div>

      <div className="w-full max-w-sm mb-8">
        <div className="grid grid-cols-4 gap-2 text-center">
          {TYPES.map(t => (
            <div key={t.name} className="bg-white/10 rounded-xl py-3 px-1">
              <div className="text-2xl mb-1">{t.emoji}</div>
              <div className="text-white text-xs leading-tight">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-sm mb-8 space-y-2">
        {['⏱ 約1〜2分で完了', '👆 タップするだけ・文字入力なし', '🆓 完全無料'].map(text => (
          <div key={text} className="text-purple-200 text-sm">{text}</div>
        ))}
      </div>

      <Link
        href="/quiz"
        className="w-full max-w-sm block text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold text-xl py-5 px-8 rounded-2xl shadow-xl transition-all duration-200 active:scale-95"
      >
        診断スタート →
      </Link>

      <p className="text-purple-500 text-xs mt-6 text-center">
        ※本診断はエンターテインメント目的のコンテンツです。<br />
        特定の宗教・神社との関係はありません。
      </p>
    </main>
  )
}
