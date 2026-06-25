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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export default async function ResultPage({ params }: Props) {
  const { type } = await params
  if (!isValidDeityType(type)) notFound()

  const content = DEITY_CONTENT[type]

  return (
    <main
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{ background: 'linear-gradient(160deg, #0D0D1A 0%, #1A0A2E 50%, #0D0D1A 100%)' }}
    >
      <div className="w-full max-w-sm">

        {/* ヘッダーラベル */}
        <p className="text-center text-xs tracking-widest mb-5" style={{ color: '#E4AD75' }}>
          ✦ 守護神様タイプ診断 結果 ✦
        </p>

        {/* タイプカード */}
        <div
          className="rounded-2xl p-6 mb-5 text-center"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(228,173,117,0.25)',
          }}
        >
          <div className="text-6xl mb-3">{content.emoji}</div>

          <p className="text-sm mb-1" style={{ color: '#C4B5C8' }}>あなたの守護神様は</p>

          <h1
            className="font-serif text-2xl font-bold mb-2"
            style={{ color: '#F5EAE1' }}
          >
            【{content.name}】
          </h1>

          <p className="text-base font-bold mb-4" style={{ color: '#E4AD75' }}>
            {content.catchCopy}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {content.attributes.map(attr => (
              <span
                key={attr}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(89,46,107,0.5)',
                  color: '#D9D8DD',
                  border: '1px solid rgba(228,173,117,0.2)',
                }}
              >
                {attr}
              </span>
            ))}
          </div>

          <p
            className="text-sm leading-relaxed whitespace-pre-line text-left"
            style={{ color: '#C4B5C8' }}
          >
            {content.shortMessage}
          </p>
        </div>

        {/* LINE CTA（ファーストビュー内・最重要） */}
        <div
          className="rounded-2xl p-5 mb-5"
          style={{
            background: 'rgba(228,173,117,0.06)',
            border: '1px solid rgba(228,173,117,0.2)',
          }}
        >
          <p className="font-serif text-base font-bold text-center mb-1" style={{ color: '#F5EAE1' }}>
            🎁 守護神様からの詳細メッセージを
          </p>
          <p className="text-sm text-center mb-1" style={{ color: '#C4B5C8' }}>
            LINEで受け取ってみませんか
          </p>
          <p className="text-xs text-center mb-4" style={{ color: '#8B7B8B' }}>
            ・登録後すぐにお届けします<br />
            ・迷惑メッセージは一切送りません
          </p>
          <LineCtaButton />
        </div>

        {/* 社会的証明 */}
        <p className="text-xs text-center mb-6" style={{ color: '#592E6B' }}>
          ⭐ 累計18,394人が診断し、LINEでメッセージを受け取っています
        </p>

        {/* シェアボタン */}
        <div className="mb-5">
          <p className="text-xs text-center mb-3" style={{ color: '#8B7B8B' }}>
            友達にシェアして、守護神様を比べてみませんか
          </p>
          <ShareButtons
            typeName={content.name}
            typeSlug={content.slug}
            siteUrl={SITE_URL}
          />
        </div>

        {/* もう一度 */}
        <a
          href="/"
          className="block text-center text-sm underline mb-8"
          style={{ color: '#592E6B' }}
        >
          ← もう一度診断する
        </a>

        <p className="text-xs text-center" style={{ color: '#3D2D4A' }}>
          ※本診断はエンターテインメント目的のコンテンツです。<br />
          特定の宗教・神社との関係はありません。
        </p>
      </div>
    </main>
  )
}
