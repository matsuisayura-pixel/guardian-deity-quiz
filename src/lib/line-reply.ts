import type { DeityType } from '@/types'
import { DEITY_CONTENT, DEITY_TYPES } from './deity-content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export function buildQuickReplyMessage() {
  return {
    type: 'text' as const,
    text: '友だち追加ありがとうございます🙏\nあなたの守護神様タイプを診断結果から教えてください👇',
    quickReply: {
      items: DEITY_TYPES.map(d => ({
        type: 'action' as const,
        action: {
          type: 'message' as const,
          label: d.name,
          text: d.name,
        },
      })),
    },
  }
}

export function buildDeityMessage(type: DeityType) {
  const content = DEITY_CONTENT[type]
  return {
    type: 'text' as const,
    text: content.lineMessage,
  }
}

export function buildDefaultMessage() {
  return {
    type: 'text' as const,
    text: `上のボタンから、あなたの守護神様タイプを選んでください🙏\n診断がまだの方はこちら → ${SITE_URL}`,
  }
}

export function resolveTypeFromText(text: string): DeityType | null {
  const trimmed = text.trim()
  const found = DEITY_TYPES.find(d => d.name === trimmed)
  return found?.slug ?? null
}
