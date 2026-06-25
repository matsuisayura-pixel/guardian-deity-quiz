import type { AttributeScore, DeityType } from '@/types'

const DEITY_TYPES: DeityType[] = [
  'amaterasu', 'tsukuyomi', 'susanoo', 'inari',
  'ryujin', 'benzaiten', 'ebisu', 'okuninushi',
]

export function determineType(answers: AttributeScore[]): DeityType {
  const total = answers.reduce<Record<string, number>>((acc, cur) => {
    DEITY_TYPES.forEach(key => {
      acc[key] = (acc[key] ?? 0) + (cur[key] ?? 0)
    })
    return acc
  }, {})

  const sorted = DEITY_TYPES.sort((a, b) => (total[b] ?? 0) - (total[a] ?? 0))
  return sorted[0]
}

export function isValidDeityType(value: string): value is DeityType {
  return DEITY_TYPES.includes(value as DeityType)
}
