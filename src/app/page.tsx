import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '守護神様タイプ診断 | あなたを守る神様がわかる',
  description: 'あなたには、気づいていないだけで、確かに存在する守護神様がいるかもしれません。8問に答えるだけで守護神様のタイプがわかる無料診断。',
  openGraph: {
    title: '守護神様タイプ診断',
    description: 'あなたを守る神様のタイプが、8問でわかります。',
  },
}

const TYPES = [
  { kanji: '天', name: '天照大御神' },
  { kanji: '月', name: '月読命' },
  { kanji: '嵐', name: '素戔嗚尊' },
  { kanji: '稲', name: '稲荷大神' },
  { kanji: '龍', name: '龍神' },
  { kanji: '弁', name: '弁財天' },
  { kanji: '恵', name: '恵比寿様' },
  { kanji: '国', name: '大国主命' },
]

export default function TopPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-5 py-12"
      style={{ background: 'linear-gradient(170deg, #0D0B08 0%, #1A1208 60%, #0D0B08 100%)' }}
    >
      <div className="w-full max-w-sm">

        {/* 上部装飾ライン */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #C4963C)' }} />
          <span className="text-sm tracking-widest" style={{ color: '#C4963C' }}>無料診断</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #C4963C)' }} />
        </div>

        {/* メインタイトル */}
        <div className="text-center mb-6">
          <p className="text-base mb-3" style={{ color: '#A89880' }}>
            あなたを守る神様がわかる
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-wider leading-tight" style={{ color: '#F0E6D2' }}>
            守護神様<br />タイプ診断
          </h1>
        </div>

        {/* キャッチコピー */}
        <div
          className="text-center px-4 py-6 mb-8"
          style={{
            borderTop: '1px solid rgba(196,150,60,0.25)',
            borderBottom: '1px solid rgba(196,150,60,0.25)',
          }}
        >
          <p className="text-base leading-loose" style={{ color: '#A89880' }}>
            あなたには、気づいていないだけで、<br />
            確かに存在する守護神様がいる<br />
            かもしれません。<br />
            <br />
            8問に答えるだけで、<br />
            あなたの守護神様のタイプがわかります。
          </p>
        </div>

        {/* 社会的証明 */}
        <p className="text-center text-base mb-8 tracking-wider" style={{ color: '#C4963C' }}>
          ◆ 累計 18,394人が診断済み ◆
        </p>

        {/* メインCTA */}
        <Link
          href="/quiz"
          className="block w-full text-center font-serif font-bold text-xl py-6 mb-3 tracking-wider transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #8B1A1A 0%, #C0392B 50%, #8B1A1A 100%)',
            color: '#F0E6D2',
            border: '1px solid rgba(196,150,60,0.4)',
          }}
        >
          ▼ 今すぐ無料で診断する ▼
        </Link>

        <p className="text-center text-sm mb-12" style={{ color: '#5A4A3A' }}>
          約1分 ・ 選ぶだけ ・ 個人情報不要
        </p>

        {/* 8タイプ一覧 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.2)' }} />
          <span className="text-sm tracking-widest" style={{ color: '#A89880' }}>8つの守護神様</span>
          <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.2)' }} />
        </div>

        <div className="grid grid-cols-4 gap-2 mb-10">
          {TYPES.map(t => (
            <div
              key={t.name}
              className="flex flex-col items-center py-4 px-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(196,150,60,0.2)',
              }}
            >
              {/* 漢字 */}
              <div
                className="font-serif text-2xl font-bold w-10 h-10 flex items-center justify-center mb-2"
                style={{
                  color: '#C4963C',
                  border: '1px solid rgba(196,150,60,0.4)',
                  background: 'rgba(196,150,60,0.06)',
                }}
              >
                {t.kanji}
              </div>
              {/* 神様名：2行で表示 */}
              <div className="text-center" style={{ color: '#A89880', fontSize: '11px', lineHeight: '1.4' }}>
                {t.name.length <= 4
                  ? t.name
                  : <>{t.name.slice(0, 3)}<br />{t.name.slice(3)}</>
                }
              </div>
            </div>
          ))}
        </div>

        {/* 特徴リスト */}
        <div
          className="p-5 mb-10 space-y-5"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(196,150,60,0.15)',
          }}
        >
          {[
            '何度も同じ悩みが繰り返されるのは、守護神様からのサインかもしれません',
            '仕事・人間関係・転機のヒントが、あなたのタイプ別に明らかになります',
            '診断後、LINEで守護神様からの詳しいメッセージをお受け取りいただけます',
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-base flex-shrink-0 mt-0.5" style={{ color: '#C4963C' }}>◆</span>
              <p className="text-base leading-relaxed" style={{ color: '#A89880' }}>{text}</p>
            </div>
          ))}
        </div>

        {/* 再CTA */}
        <Link
          href="/quiz"
          className="block w-full text-center font-serif font-bold text-lg py-5 mb-10 tracking-wider transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #8B1A1A 0%, #C0392B 50%, #8B1A1A 100%)',
            color: '#F0E6D2',
            border: '1px solid rgba(196,150,60,0.4)',
          }}
        >
          ▼ 無料で守護神様を調べる ▼
        </Link>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.1)' }} />
          <span style={{ color: '#3A2A1A', fontSize: '12px' }}>◇</span>
          <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.1)' }} />
        </div>

        <p className="text-sm text-center" style={{ color: '#3A2A1A' }}>
          ※本診断はエンターテインメント目的のコンテンツです。<br />
          特定の宗教・神社との関係はありません。
        </p>
      </div>
    </main>
  )
}
