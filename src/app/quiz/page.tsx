import type { Metadata } from 'next'
import { QuizEngine } from '@/components/QuizEngine'

export const metadata: Metadata = {
  title: '診断中 | 守護神様タイプ診断',
}

export default function QuizPage() {
  return <QuizEngine />
}
