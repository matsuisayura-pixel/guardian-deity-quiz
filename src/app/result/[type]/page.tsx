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
    title: `${content.name}タイプ | 守護神様タイプ診断`,
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
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-sm">

        {/* ヘッダー */}
        <p className="text-purple-300 text-sm tracking-widest text-center mb-4">✦ 診断結果 ✦</p>

        {/* タイプカード */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 text-center">
          <div className="text-6xl mb-3">{content.emoji}</div>
          <p className="text-purple-300 text-sm mb-1">あなたの守護神様は</p>
          <h1 className="text-white text-2xl font-bold mb-2">【{content.name}】</h1>
          <p className="text-yellow-300 text-sm mb-4">{content.catchCopy}</p>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {content.attributes.map(attr => (
              <span key={attr} className="bg-purple-800/60 text-purple-200 text-xs px-3 py-1 rounded-full">
                {attr}
              </span>
            ))}
          </div>

          <p className="text-purple-100 text-sm leading-relaxed whitespace-pre-line text-left">
            {content.shortMessage}
          </p>
        </div>

        {/* LINE CTA（ファーストビュー内） */}
        <div className="mb-6">
          <p className="text-purple-200 text-sm text-center mb-3">
            🎁 守護神様からの<strong>詳しいメッセージ</strong>を<br />LINEで受け取る
          </p>
          <LineCtaButton />
        </div>

        {/* シェアボタン */}
        <div className="mb-6">
          <p className="text-purple-300 text-xs text-center mb-2">友達にシェアする</p>
          <ShareButtons
            typeName={content.name}
            typeSlug={content.slug}
            siteUrl={SITE_URL}
          />
        </div>

        {/* もう一度診断 */}
        <a
          href="/"
          className="block text-center text-purple-400 text-sm underline mb-6"
        >
          ← もう一度診断する
        </a>

        <p className="text-purple-600 text-xs text-center">
          ※本診断はエンターテインメント目的のコンテンツです。<br />
          特定の宗教・神社との関係はありません。
        </p>
      </div>
    </main>
  )
}
