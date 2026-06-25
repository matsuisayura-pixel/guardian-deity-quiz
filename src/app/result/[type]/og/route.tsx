import { ImageResponse } from 'next/og'
import { DEITY_CONTENT } from '@/lib/deity-content'
import { isValidDeityType } from '@/lib/score-engine'

export const runtime = 'edge'

export async function GET(_: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  if (!isValidDeityType(type)) {
    return new Response('Not Found', { status: 404 })
  }

  const content = DEITY_CONTENT[type]

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #1e1b4b 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>{content.emoji}</div>
        <div style={{ color: '#c4b5fd', fontSize: '28px', marginBottom: '12px' }}>
          あなたの守護神様は
        </div>
        <div style={{ color: '#ffffff', fontSize: '56px', fontWeight: 'bold', marginBottom: '16px' }}>
          【{content.name}】
        </div>
        <div style={{ color: '#fde68a', fontSize: '28px', marginBottom: '24px' }}>
          {content.catchCopy}
        </div>
        <div style={{ color: '#a78bfa', fontSize: '22px' }}>
          守護神様タイプ診断
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
