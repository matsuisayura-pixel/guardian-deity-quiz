'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { AttributeScore } from '@/types'
import { QUIZ_QUESTIONS } from '@/lib/quiz-data'
import { determineType } from '@/lib/score-engine'
import { trackEvent } from './MetaPixel'

const ANALYSIS_STEPS = [
  'あなたの回答を読み解いています…',
  '守護神様との縁を確認しています…',
  '潜在的な才能を鑑定しています…',
  'あなたの守護神様が明らかになります…',
]

export function QuizEngine() {
  const router = useRouter()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<AttributeScore[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzeStep, setAnalyzeStep] = useState(0)
  const [loadPct, setLoadPct] = useState(0)
  const resultTypeRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isAnalyzing) return

    const stepInterval = setInterval(() => {
      setAnalyzeStep(prev => Math.min(prev + 1, ANALYSIS_STEPS.length - 1))
    }, 600)

    const loadInterval = setInterval(() => {
      setLoadPct(prev => Math.min(prev + 2, 100))
    }, 48)

    const redirect = setTimeout(() => {
      if (resultTypeRef.current) {
        router.push(`/result/${resultTypeRef.current}`)
      }
    }, 2600)

    return () => {
      clearInterval(stepInterval)
      clearInterval(loadInterval)
      clearTimeout(redirect)
    }
  }, [isAnalyzing, router])

  const question = QUIZ_QUESTIONS[currentQ]
  const progress = Math.round((currentQ / QUIZ_QUESTIONS.length) * 100)

  function onSelect(scores: AttributeScore) {
    const next = [...answers, scores]
    setAnswers(next)

    if (currentQ === 0) trackEvent('InitiateCheckout')

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      const type = determineType(next)
      resultTypeRef.current = type
      trackEvent('CompleteRegistration', { content_name: type })
      setIsAnalyzing(true)
    }
  }

  function onBack() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  // 鑑定中画面
  if (isAnalyzing) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(170deg, #0D0B08 0%, #1A1208 60%, #0D0B08 100%)' }}
      >
        <div className="w-full max-w-sm text-center">

          <div
            className="font-serif text-4xl font-bold w-16 h-16 flex items-center justify-center mx-auto mb-8"
            style={{
              color: '#C4963C',
              border: '1px solid rgba(196,150,60,0.5)',
              background: 'rgba(196,150,60,0.06)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            神
          </div>

          <p className="font-serif text-lg font-bold tracking-wider mb-2" style={{ color: '#F0E6D2' }}>
            守護神様を鑑定中
          </p>
          <p className="text-sm mb-8" style={{ color: '#A89880' }} key={analyzeStep}>
            {ANALYSIS_STEPS[analyzeStep]}
          </p>

          <div className="w-full rounded-none h-px mb-1" style={{ background: '#2A1F10' }}>
            <div
              className="h-px transition-all duration-100"
              style={{
                width: `${loadPct}%`,
                background: 'linear-gradient(90deg, #8B1A1A, #C4963C)',
              }}
            />
          </div>
          <p className="text-xs" style={{ color: '#3A2A1A' }}>しばらくお待ちください</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: 'linear-gradient(170deg, #0D0B08 0%, #1A1208 60%, #0D0B08 100%)' }}
    >
      <div className="w-full max-w-md">

        {/* 進捗 */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span style={{ color: '#C4963C' }}>第{currentQ + 1}問 / 全{QUIZ_QUESTIONS.length}問</span>
            <span style={{ color: '#5A4A3A' }}>{progress}%</span>
          </div>
          <div className="w-full h-px" style={{ background: '#2A1F10' }}>
            <div
              className="h-px transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #8B1A1A, #C4963C)',
              }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div
          className="p-6 mb-4 slide-in"
          key={currentQ}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(196,150,60,0.2)',
          }}
        >
          <p className="font-serif text-lg font-bold leading-relaxed mb-8 text-center" style={{ color: '#F0E6D2' }}>
            {question.text}
          </p>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => onSelect(option.scores)}
                className="w-full text-left px-5 py-4 text-sm leading-relaxed transition-all duration-150"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(196,150,60,0.15)',
                  color: '#A89880',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = 'rgba(196,150,60,0.08)'
                  el.style.borderColor = 'rgba(196,150,60,0.5)'
                  el.style.color = '#F0E6D2'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.background = 'rgba(255,255,255,0.03)'
                  el.style.borderColor = 'rgba(196,150,60,0.15)'
                  el.style.color = '#A89880'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {currentQ > 0 && (
          <button
            onClick={onBack}
            className="text-xs mx-auto block mt-2"
            style={{ color: '#3A2A1A' }}
          >
            ← 前の質問に戻る
          </button>
        )}

        <p className="text-xs text-center mt-8" style={{ color: '#3A2A1A' }}>
          ※本診断はエンターテインメント目的のコンテンツです
        </p>
      </div>
    </div>
  )
}
