import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '守護神様タイプ診断 | 40代からの守護神様との縁を知る',
  description: '40代から守護神様との縁が動き始めるといわれています。8問に答えるだけ、あなたを守る神様のタイプが分かる無料診断。天照大御神・龍神・弁財天など8タイプ。',
  openGraph: {
    title: '守護神様タイプ診断',
    description: '40代から守護神様との縁が動き始めるといわれています。無料診断で、あなたの守護神様を知りましょう。',
  },
}

const TYPES = [
  { emoji: '✨', name: '天照大御神', sub: '光と調和' },
  { emoji: '🌙', name: '月読命', sub: '静寂と洞察' },
  { emoji: '⚡', name: '素戔嗚尊', sub: '意志と変革' },
  { emoji: '🦊', name: '稲荷大神', sub: '繁栄と縁結' },
  { emoji: '🐉', name: '龍神', sub: '流れと上昇' },
  { emoji: '🪷', name: '弁財天', sub: '創造と豊穣' },
  { emoji: '😊', name: '恵比寿様', sub: '笑顔と福縁' },
  { emoji: '🍀', name: '大国主命', sub: '大地と導き' },
]

const STARS = [
  { top: '8%', left: '12%', size: 'text-xs' },
  { top: '15%', left: '78%', size: 'text-sm' },
  { top: '28%', left: '5%', size: 'text-xs' },
  { top: '35%', left: '90%', size: 'text-xs' },
  { top: '55%', left: '18%', size: 'text-sm' },
]

export default function TopPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-4 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0D0D1A 0%, #1A0A2E 50%, #0D0D1A 100%)' }}
    >
      {/* 星パーティクル */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className={`absolute ${s.size} star star-${i + 1} pointer-events-none select-none`}
          style={{ top: s.top, left: s.left, color: '#E4AD75' }}
        >
          ✦
        </span>
      ))}

      <div className="w-full max-w-sm relative z-10">

        {/* ラベル */}
        <p className="text-center text-xs tracking-widest mb-6" style={{ color: '#E4AD75' }}>
          ✦ 完全無料 守護神様タイプ診断 ✦
        </p>

        {/* メインコピー */}
        <h1 className="font-serif text-center leading-relaxed mb-4" style={{ color: '#F5EAE1' }}>
          <span className="block text-base mb-2" style={{ color: '#D9D8DD' }}>
            40代から、守護神様との縁が
          </span>
          <span className="block text-3xl font-bold" style={{ color: '#F5EAE1' }}>
            動き始める
          </span>
          <span className="block text-base mt-2" style={{ color: '#D9D8DD' }}>
            といわれています。
          </span>
        </h1>

        <p className="text-center text-sm leading-relaxed mb-8" style={{ color: '#C4B5C8' }}>
          あなたには、まだ気づいていない<br />
          守護神様の存在があるかもしれません。<br />
          8問に答えるだけで、あなたのタイプがわかります。
        </p>

        {/* 社会的証明 */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span style={{ color: '#E4AD75' }}>⭐</span>
          <span className="text-sm font-bold" style={{ color: '#E4AD75' }}>
            累計 18,394人
          </span>
          <span className="text-sm" style={{ color: '#C4B5C8' }}>が診断済み</span>
        </div>

        {/* CTAボタン */}
        <Link
          href="/quiz"
          className="block w-full text-center font-bold text-lg py-5 rounded-2xl shadow-2xl transition-all duration-200 active:scale-95 mb-3"
          style={{
            background: 'linear-gradient(135deg, #C07A35 0%, #E4AD75 50%, #C07A35 100%)',
            color: '#0D0D1A',
          }}
        >
          ▼ 今すぐ無料で守護神様を診断する ▼
        </Link>

        <p className="text-center text-xs mb-10" style={{ color: '#8B7B8B' }}>
          ⏱ 約1分 ・ 👆 タップするだけ ・ 🔒 個人情報不要
        </p>

        {/* 区切り */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: '#2D1A4A' }} />
          <span className="text-xs" style={{ color: '#592E6B' }}>8つの守護神様タイプ</span>
          <div className="flex-1 h-px" style={{ background: '#2D1A4A' }} />
        </div>

        {/* タイプグリッド */}
        <div className="grid grid-cols-4 gap-2 mb-10">
          {TYPES.map(t => (
            <div
              key={t.name}
              className="rounded-xl py-3 px-1 text-center"
              style={{ background: 'rgba(89,46,107,0.25)', border: '1px solid rgba(228,173,117,0.15)' }}
            >
              <div className="text-2xl mb-1">{t.emoji}</div>
              <div className="text-xs font-bold leading-tight mb-0.5" style={{ color: '#F5EAE1' }}>
                {t.name.length > 4 ? t.name.slice(0, 4) : t.name}
              </div>
              <div className="text-xs" style={{ color: '#8B7B8B' }}>{t.sub}</div>
            </div>
          ))}
        </div>

        {/* 特徴リスト */}
        <div
          className="rounded-2xl p-5 mb-8 space-y-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(228,173,117,0.1)' }}
        >
          {[
            ['✦', 'なぜ同じ悩みが繰り返されるのか、守護神様の視点から読み解きます'],
            ['✦', '仕事・人間関係・転機のサインが、タイプ別に明らかになります'],
            ['✦', '診断後、LINEで守護神様からの詳細メッセージをお届けします'],
          ].map(([icon, text], i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: '#E4AD75' }}>{icon}</span>
              <p className="text-sm leading-relaxed" style={{ color: '#C4B5C8' }}>{text}</p>
            </div>
          ))}
        </div>

        {/* 再度CTA */}
        <Link
          href="/quiz"
          className="block w-full text-center font-bold text-base py-4 rounded-2xl transition-all duration-200 active:scale-95 mb-6"
          style={{
            background: 'linear-gradient(135deg, #C07A35 0%, #E4AD75 50%, #C07A35 100%)',
            color: '#0D0D1A',
          }}
        >
          ▼ 無料診断スタート ▼
        </Link>

        <p className="text-xs text-center" style={{ color: '#3D2D4A' }}>
          ※本診断はエンターテインメント目的のコンテンツです。<br />
          特定の宗教・神社との関係はありません。
        </p>
      </div>
    </main>
  )
}
