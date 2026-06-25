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
  { kanji: '天', name: '天照大御神', sub: '光・調和・導き' },
  { kanji: '月', name: '月読命',     sub: '静寂・洞察・癒し' },
  { kanji: '嵐', name: '素戔嗚尊',   sub: '意志・変革・勇気' },
  { kanji: '稲', name: '稲荷大神',   sub: '繁栄・縁・豊穣' },
  { kanji: '龍', name: '龍神',       sub: '流れ・上昇・守護' },
  { kanji: '弁', name: '弁財天',     sub: '創造・才能・美' },
  { kanji: '恵', name: '恵比寿様',   sub: '笑顔・縁起・福' },
  { kanji: '国', name: '大国主命',   sub: '大地・縁結・包容' },
]

export default function TopPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{ background: 'linear-gradient(170deg, #0D0B08 0%, #1A1208 60%, #0D0B08 100%)' }}
    >
      <div className="w-full max-w-sm">

        {/* 上部装飾 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #C4963C)' }} />
          <span className="text-xs tracking-[0.3em]" style={{ color: '#C4963C' }}>無料診断</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #C4963C)' }} />
        </div>

        {/* メインタイトル */}
        <div className="text-center mb-6">
          <h1 className="font-serif leading-loose" style={{ color: '#F0E6D2' }}>
            <span className="block text-sm tracking-[0.25em] mb-2" style={{ color: '#A89880' }}>
              あなたを守る神様がわかる
            </span>
            <span className="block text-3xl font-bold tracking-wider">
              守護神様タイプ診断
            </span>
          </h1>
        </div>

        {/* キャッチコピー */}
        <div
          className="text-center px-4 py-5 mb-8"
          style={{ borderTop: '1px solid rgba(196,150,60,0.2)', borderBottom: '1px solid rgba(196,150,60,0.2)' }}
        >
          <p className="text-sm leading-loose" style={{ color: '#A89880' }}>
            あなたには、気づいていないだけで、<br />
            確かに存在する守護神様がいるかもしれません。<br />
            <br />
            8問に答えるだけで、<br />
            あなたの守護神様のタイプがわかります。
          </p>
        </div>

        {/* 社会的証明 */}
        <p className="text-center text-xs mb-8 tracking-wider" style={{ color: '#C4963C' }}>
          ◆ 累計 18,394人が診断済み ◆
        </p>

        {/* CTAボタン */}
        <Link
          href="/quiz"
          className="block w-full text-center font-serif font-bold text-lg py-5 mb-2 tracking-wider transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #8B1A1A 0%, #C0392B 50%, #8B1A1A 100%)',
            color: '#F0E6D2',
            border: '1px solid rgba(196,150,60,0.4)',
          }}
        >
          ▼ 今すぐ無料で診断する ▼
        </Link>

        <p className="text-center text-xs mb-12" style={{ color: '#5A4A3A' }}>
          約1分 ・ 選ぶだけ ・ 個人情報不要
        </p>

        {/* 守護神タイプ一覧 */}
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.2)' }} />
            <span className="text-xs tracking-[0.2em]" style={{ color: '#A89880' }}>8つの守護神様</span>
            <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.2)' }} />
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {TYPES.map(t => (
              <div
                key={t.name}
                className="flex flex-col items-center py-3 px-1"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(196,150,60,0.2)',
                }}
              >
                {/* 漢字アイコン */}
                <div
                  className="font-serif text-xl font-bold mb-1.5 w-9 h-9 flex items-center justify-center"
                  style={{
                    color: '#C4963C',
                    border: '1px solid rgba(196,150,60,0.4)',
                    background: 'rgba(196,150,60,0.06)',
                  }}
                >
                  {t.kanji}
                </div>
                <div
                  className="text-xs leading-tight text-center"
                  style={{ color: '#F0E6D2', fontSize: '10px' }}
                >
                  {t.name.length > 4 ? t.name.slice(0, 4) : t.name}
                </div>
                <div
                  className="text-center mt-0.5 leading-tight"
                  style={{ color: '#5A4A3A', fontSize: '9px' }}
                >
                  {t.sub.split('・')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10">
          <div className="h-px" style={{ background: 'rgba(196,150,60,0.15)' }} />
        </div>

        {/* 診断の特徴 */}
        <div className="space-y-4 mb-10">
          {[
            ['◆', '何度も同じ悩みが繰り返されるのは、守護神様からのサインかもしれません'],
            ['◆', '仕事・人間関係・転機のヒントが、タイプ別に明らかになります'],
            ['◆', '診断後、LINEで守護神様からの詳しいメッセージをお受け取りいただけます'],
          ].map(([icon, text], i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: '#C4963C' }}>{icon}</span>
              <p className="text-sm leading-relaxed" style={{ color: '#A89880' }}>{text}</p>
            </div>
          ))}
        </div>

        {/* 再CTA */}
        <Link
          href="/quiz"
          className="block w-full text-center font-serif font-bold text-base py-4 mb-8 tracking-wider transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #8B1A1A 0%, #C0392B 50%, #8B1A1A 100%)',
            color: '#F0E6D2',
            border: '1px solid rgba(196,150,60,0.4)',
          }}
        >
          ▼ 無料で守護神様を調べる ▼
        </Link>

        {/* 下部装飾 */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.15)' }} />
          <span style={{ color: '#3A2A1A', fontSize: '10px' }}>◇</span>
          <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.15)' }} />
        </div>

        <p className="text-xs text-center" style={{ color: '#3A2A1A' }}>
          ※本診断はエンターテインメント目的のコンテンツです。<br />
          特定の宗教・神社との関係はありません。
        </p>
      </div>
    </main>
  )
}
