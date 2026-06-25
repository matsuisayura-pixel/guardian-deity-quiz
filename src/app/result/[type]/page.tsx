import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DEITY_CONTENT, DEITY_TYPES } from '@/lib/deity-content'
import { isValidDeityType } from '@/lib/score-engine'
import { LineCtaButton, ShareButtons } from '@/components/ShareButtons'

type Props = { params: Promise<{ type: string }> }

export async function generateStaticParams() {
  return DEITY_TYPES.map(d => ({ type: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params
  if (!isValidDeityType(type)) return {}
  const content = DEITY_CONTENT[type]
  return {
    title: `あなたの守護神様は【${content.name}】| 守護神様タイプ診断`,
    description: content.ogDescription,
    openGraph: {
      title: `あなたの守護神様は【${content.name}】`,
      description: content.ogDescription,
      images: [`/result/${type}/og`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `あなたの守護神様は【${content.name}】`,
      description: content.ogDescription,
      images: [`/result/${type}/og`],
    },
  }
}

const KANJI_MAP: Record<string, string> = {
  amaterasu: '天', tsukuyomi: '月', susanoo: '嵐',
  inari: '稲', ryujin: '龍', benzaiten: '弁',
  ebisu: '恵', okuninushi: '国',
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export default async function ResultPage({ params }: Props) {
  const { type } = await params
  if (!isValidDeityType(type)) notFound()

  const content = DEITY_CONTENT[type]
  const kanji = KANJI_MAP[type] ?? '神'

  return (
    <main
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{ background: 'linear-gradient(170deg, #0D0B08 0%, #1A1208 60%, #0D0B08 100%)' }}
    >
      <div className="w-full max-w-sm">

        {/* 上部装飾 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #C4963C)' }} />
          <span className="text-xs tracking-[0.3em]" style={{ color: '#C4963C' }}>診断結果</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #C4963C)' }} />
        </div>

        {/* タイプカード */}
        <div
          className="mb-6 p-6 text-center"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(196,150,60,0.3)',
          }}
        >
          {/* 漢字アイコン */}
          <div className="flex justify-center mb-4">
            <div
              className="font-serif text-4xl font-bold w-16 h-16 flex items-center justify-center"
              style={{
                color: '#C4963C',
                border: '1px solid rgba(196,150,60,0.5)',
                background: 'rgba(196,150,60,0.06)',
              }}
            >
              {kanji}
            </div>
          </div>

          <p className="text-xs tracking-wider mb-1" style={{ color: '#A89880' }}>あなたの守護神様は</p>

          <h1 className="font-serif text-2xl font-bold tracking-wider mb-2" style={{ color: '#F0E6D2' }}>
            【{content.name}】
          </h1>

          <p className="text-sm font-bold mb-5 tracking-wide" style={{ color: '#C4963C' }}>
            ─ {content.catchCopy} ─
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {content.attributes.map(attr => (
              <span
                key={attr}
                className="text-xs px-3 py-1"
                style={{
                  color: '#A89880',
                  border: '1px solid rgba(196,150,60,0.25)',
                  background: 'rgba(196,150,60,0.05)',
                }}
              >
                {attr}
              </span>
            ))}
          </div>

          <p className="text-sm leading-loose text-left whitespace-pre-line" style={{ color: '#A89880' }}>
            {content.shortMessage}
          </p>
        </div>

        {/* LINE CTA */}
        <div
          className="p-5 mb-5"
          style={{
            border: '1px solid rgba(196,150,60,0.3)',
            background: 'rgba(196,150,60,0.04)',
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.2)' }} />
            <span className="font-serif text-xs tracking-widest" style={{ color: '#C4963C' }}>御神託</span>
            <div className="h-px flex-1" style={{ background: 'rgba(196,150,60,0.2)' }} />
          </div>

          <p className="font-serif text-sm text-center mt-3 mb-1 leading-relaxed" style={{ color: '#F0E6D2' }}>
            守護神様からの詳しいメッセージを
          </p>
          <p className="text-xs text-center mb-4" style={{ color: '#A89880' }}>
            LINEでお受け取りいただけます
          </p>

          <LineCtaButton />

          <p className="text-xs text-center mt-3" style={{ color: '#5A4A3A' }}>
            登録後すぐにお届けします ・ 迷惑メッセージは送りません
          </p>
        </div>

        {/* 社会的証明 */}
        <p className="text-xs text-center mb-6 tracking-wider" style={{ color: '#5A4A3A' }}>
          ◆ 累計18,394人がLINEで詳細メッセージを受け取っています ◆
        </p>

        {/* シェア */}
        <div className="mb-6">
          <p className="text-xs text-center mb-3" style={{ color: '#5A4A3A' }}>
            ─ 結果をシェアする ─
          </p>
          <ShareButtons
            typeName={content.name}
            typeSlug={content.slug}
            siteUrl={SITE_URL}
          />
        </div>

        <a
          href="/"
          className="block text-center text-xs mb-8"
          style={{ color: '#5A4A3A' }}
        >
          ← もう一度診断する
        </a>

        <p className="text-xs text-center" style={{ color: '#3A2A1A' }}>
          ※本診断はエンターテインメント目的のコンテンツです。<br />
          特定の宗教・神社との関係はありません。
        </p>
      </div>
    </main>
  )
}
