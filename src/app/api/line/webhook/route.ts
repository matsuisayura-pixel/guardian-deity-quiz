import { validateSignature } from '@line/bot-sdk'
import {
  buildQuickReplyMessage,
  buildDeityMessage,
  buildDefaultMessage,
  resolveTypeFromText,
} from '@/lib/line-reply'

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET ?? ''
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? ''
const DRY_RUN = process.env.DRY_RUN === 'true'

type LineEvent = {
  type: string
  replyToken?: string
  source?: { userId?: string }
  message?: { type: string; text: string }
}

async function replyMessage(replyToken: string, messages: unknown[]) {
  if (DRY_RUN) {
    console.log('[DRY_RUN] Would reply:', JSON.stringify(messages))
    return
  }
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ replyToken, messages }),
  })
}

async function handleEvent(event: LineEvent): Promise<void> {
  if (event.type === 'follow') {
    if (!event.replyToken) return
    const msg = buildQuickReplyMessage()
    await replyMessage(event.replyToken, [msg])
    return
  }

  if (event.type === 'message' && event.message?.type === 'text') {
    if (!event.replyToken) return
    const text = event.message.text.trim()
    const deityType = resolveTypeFromText(text)
    const msg = deityType ? buildDeityMessage(deityType) : buildDefaultMessage()
    await replyMessage(event.replyToken, [msg])
    return
  }
}

export async function POST(req: Request) {
  // ADR-004: req.text() MUST be called before req.json() for signature verification
  const rawBody = await req.text()

  const signature = req.headers.get('x-line-signature') ?? ''
  if (!validateSignature(rawBody, CHANNEL_SECRET, signature)) {
    return new Response('Invalid signature', { status: 400 })
  }

  const body = JSON.parse(rawBody) as { events: LineEvent[] }

  // Promise.allSettled (not Promise.all) to prevent LINE retry loops on partial errors
  await Promise.allSettled(body.events.map(handleEvent))

  return new Response('OK', { status: 200 })
}
