'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AttributeScore } from '@/types'
import { QUIZ_QUESTIONS } from '@/lib/quiz-data'
import { determineType } from '@/lib/score-engine'
import { trackEvent } from './MetaPixel'

export function QuizEngine() {
  const router = useRouter()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<AttributeScore[]>([])

  const question = QUIZ_QUESTIONS[currentQ]
  const progress = Math.round(((currentQ) / QUIZ_QUESTIONS.length) * 100)

  function onSelect(scores: AttributeScore) {
    const next = [...answers, scores]
    setAnswers(next)

    if (currentQ === 0) {
      trackEvent('InitiateCheckout')
    }

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      const type = determineType(next)
      trackEvent('CompleteRegistration', { content_name: type })
      router.push(`/result/${type}`)
    }
  }

  function onBack() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* 進捗バー */}
        <div className="mb-6">
          <div className="flex justify-between text-purple-300 text-sm mb-2">
            <span>Q{currentQ + 1} / {QUIZ_QUESTIONS.length}問</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-purple-900 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
          <p className="text-white text-xl font-bold leading-relaxed mb-8 text-center">
            {question.text}
          </p>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => onSelect(option.scores)}
                className="w-full text-left px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all duration-200 border border-white/20 hover:border-purple-400"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 戻るボタン */}
        {currentQ > 0 && (
          <button
            onClick={onBack}
            className="text-purple-300 text-sm underline mt-2 mx-auto block"
          >
            ← 前の質問に戻る
          </button>
        )}

        <p className="text-purple-400 text-xs text-center mt-4">
          ※本診断はエンターテインメント目的のコンテンツです
        </p>
      </div>
    </div>
  )
}
