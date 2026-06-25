export type DeityType =
  | 'amaterasu'
  | 'tsukuyomi'
  | 'susanoo'
  | 'inari'
  | 'ryujin'
  | 'benzaiten'
  | 'ebisu'
  | 'okuninushi'

export type AttributeScore = Record<DeityType, number>

export type QuizOption = {
  label: string
  scores: AttributeScore
}

export type QuizQuestion = {
  id: number
  text: string
  options: QuizOption[]
}

export type DeityContent = {
  slug: DeityType
  name: string
  emoji: string
  attributes: string[]
  catchCopy: string
  shortMessage: string
  lineMessage: string
  ogDescription: string
}
