'use client'

const LINE_ADD_FRIEND_URL = process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL ?? '#'

type Props = {
  typeName: string
  typeSlug: string
  siteUrl: string
}

export function LineCtaButton() {
  return (
    <a
      href={LINE_ADD_FRIEND_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (typeof window !== 'undefined' && (window as unknown as { fbq?: Function }).fbq) {
          ;(window as unknown as { fbq: Function }).fbq('track', 'AddToWishlist')
        }
      }}
      className="flex items-center justify-center gap-3 w-full bg-[#06C755] hover:bg-[#05a847] text-white font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg"
    >
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.02 2 11c0 3.37 1.88 6.33 4.74 8.12L6 22l3.26-1.77C10.36 20.72 11.17 21 12 21c5.52 0 10-4.02 10-9S17.52 2 12 2z"/>
      </svg>
      守護神様の詳細メッセージをLINEで受け取る
    </a>
  )
}

export function ShareButtons({ typeName, siteUrl }: Props) {
  const shareText = `私の守護神様は【${typeName}】でした✨ あなたの守護神様タイプは？`
  const hashtags = '守護神様診断,スピリチュアル'
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}&hashtags=${encodeURIComponent(hashtags)}`
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`

  return (
    <div className="flex gap-3 w-full">
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X でシェア
      </a>
      <a
        href={lineShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05a847] text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.02 2 11c0 3.37 1.88 6.33 4.74 8.12L6 22l3.26-1.77C10.36 20.72 11.17 21 12 21c5.52 0 10-4.02 10-9S17.52 2 12 2z"/>
        </svg>
        LINE でシェア
      </a>
    </div>
  )
}
