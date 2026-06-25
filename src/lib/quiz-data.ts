import type { QuizQuestion } from '@/types'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: '大事な決断をするとき、あなたは？',
    options: [
      { label: '直感を信じてすぐ動く', scores: { amaterasu: 1, tsukuyomi: 2, susanoo: 1, inari: 1, ryujin: 2, benzaiten: 1, ebisu: 0, okuninushi: 0 } },
      { label: 'じっくり考えてから動く', scores: { amaterasu: 2, tsukuyomi: 1, susanoo: 0, inari: 1, ryujin: 0, benzaiten: 0, ebisu: 2, okuninushi: 1 } },
      { label: '誰かに相談してから決める', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 1, ebisu: 1, okuninushi: 2 } },
      { label: '流れに任せて決める', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 1, inari: 2, ryujin: 1, benzaiten: 2, ebisu: 1, okuninushi: 1 } },
    ],
  },
  {
    id: 2,
    text: '理想のエネルギー状態は？',
    options: [
      { label: '燃えるように行動している', scores: { amaterasu: 2, tsukuyomi: 0, susanoo: 2, inari: 1, ryujin: 2, benzaiten: 0, ebisu: 0, okuninushi: 0 } },
      { label: '静かに深く集中している', scores: { amaterasu: 0, tsukuyomi: 2, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 2, ebisu: 1, okuninushi: 1 } },
      { label: '誰かと笑って過ごしている', scores: { amaterasu: 1, tsukuyomi: 0, susanoo: 1, inari: 1, ryujin: 0, benzaiten: 1, ebisu: 2, okuninushi: 2 } },
      { label: 'ゆったりと満ちている', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 2, ryujin: 1, benzaiten: 1, ebisu: 2, okuninushi: 1 } },
    ],
  },
  {
    id: 3,
    text: '人間関係でのあなたの役割は？',
    options: [
      { label: 'みんなを引っ張るリーダー', scores: { amaterasu: 2, tsukuyomi: 0, susanoo: 2, inari: 1, ryujin: 1, benzaiten: 0, ebisu: 0, okuninushi: 0 } },
      { label: '影でそっとサポートする', scores: { amaterasu: 0, tsukuyomi: 2, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 1, ebisu: 2, okuninushi: 1 } },
      { label: '場を和ませるムードメーカー', scores: { amaterasu: 1, tsukuyomi: 0, susanoo: 1, inari: 2, ryujin: 0, benzaiten: 2, ebisu: 2, okuninushi: 1 } },
      { label: '人と人をつなぐ橋渡し役', scores: { amaterasu: 1, tsukuyomi: 1, susanoo: 0, inari: 1, ryujin: 0, benzaiten: 1, ebisu: 1, okuninushi: 2 } },
    ],
  },
  {
    id: 4,
    text: '豊かさへの意識として近いのは？',
    options: [
      { label: 'ビジネスで結果を出して稼ぐ', scores: { amaterasu: 2, tsukuyomi: 0, susanoo: 1, inari: 2, ryujin: 1, benzaiten: 0, ebisu: 1, okuninushi: 0 } },
      { label: '美しさや才能を磨いて豊かになる', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 2, ebisu: 0, okuninushi: 1 } },
      { label: '安定して着実に積み上げる', scores: { amaterasu: 1, tsukuyomi: 0, susanoo: 0, inari: 1, ryujin: 0, benzaiten: 0, ebisu: 2, okuninushi: 1 } },
      { label: 'ご縁や人脈から豊かさが広がる', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 1, ryujin: 1, benzaiten: 2, ebisu: 1, okuninushi: 2 } },
    ],
  },
  {
    id: 5,
    text: '変化への向き合い方は？',
    options: [
      { label: '変化を楽しむ、むしろ望む', scores: { amaterasu: 1, tsukuyomi: 0, susanoo: 2, inari: 2, ryujin: 2, benzaiten: 1, ebisu: 0, okuninushi: 0 } },
      { label: '変化は怖いが乗り越えていく', scores: { amaterasu: 2, tsukuyomi: 1, susanoo: 1, inari: 1, ryujin: 1, benzaiten: 0, ebisu: 1, okuninushi: 0 } },
      { label: '少しずつ慣れながら進む', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 1, ryujin: 0, benzaiten: 1, ebisu: 2, okuninushi: 2 } },
      { label: '変化より安定を好む', scores: { amaterasu: 0, tsukuyomi: 2, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 1, ebisu: 2, okuninushi: 1 } },
    ],
  },
  {
    id: 6,
    text: '休日に一人でいるとき、何をしている？',
    options: [
      { label: '外に出て行動・探索している', scores: { amaterasu: 1, tsukuyomi: 0, susanoo: 2, inari: 2, ryujin: 2, benzaiten: 0, ebisu: 0, okuninushi: 0 } },
      { label: '本を読んだり内省したりする', scores: { amaterasu: 1, tsukuyomi: 2, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 1, ebisu: 1, okuninushi: 1 } },
      { label: '好きな音楽や芸術を楽しむ', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 1, ryujin: 0, benzaiten: 2, ebisu: 1, okuninushi: 1 } },
      { label: 'のんびりゆったり過ごす', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 0, ebisu: 2, okuninushi: 2 } },
    ],
  },
  {
    id: 7,
    text: '今、一番欲しいものは？',
    options: [
      { label: '大きな成功と社会的な認められること', scores: { amaterasu: 2, tsukuyomi: 0, susanoo: 2, inari: 1, ryujin: 2, benzaiten: 0, ebisu: 0, okuninushi: 0 } },
      { label: '深い癒しと心の静けさ', scores: { amaterasu: 0, tsukuyomi: 2, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 1, ebisu: 1, okuninushi: 1 } },
      { label: '豊かさとお金の余裕', scores: { amaterasu: 1, tsukuyomi: 0, susanoo: 0, inari: 2, ryujin: 1, benzaiten: 2, ebisu: 2, okuninushi: 0 } },
      { label: '大切な人とのご縁と絆', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 1, ebisu: 1, okuninushi: 2 } },
    ],
  },
  {
    id: 8,
    text: 'あなたを一言で表すと？',
    options: [
      { label: '情熱的', scores: { amaterasu: 1, tsukuyomi: 0, susanoo: 2, inari: 1, ryujin: 2, benzaiten: 1, ebisu: 0, okuninushi: 0 } },
      { label: '繊細', scores: { amaterasu: 0, tsukuyomi: 2, susanoo: 0, inari: 0, ryujin: 0, benzaiten: 2, ebisu: 0, okuninushi: 1 } },
      { label: '誠実', scores: { amaterasu: 2, tsukuyomi: 1, susanoo: 0, inari: 1, ryujin: 0, benzaiten: 0, ebisu: 2, okuninushi: 1 } },
      { label: '穏やか', scores: { amaterasu: 0, tsukuyomi: 1, susanoo: 0, inari: 1, ryujin: 0, benzaiten: 1, ebisu: 2, okuninushi: 2 } },
    ],
  },
]
