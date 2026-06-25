'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { AttributeScore } from '@/types'
import { QUIZ_QUESTIONS } from '@/lib/quiz-data'
import { determineType } from '@/lib/score-engine'
import { trackEvent } from './MetaPixel'

const ANALYSIS_STEPS = [
  'あなたの回答を分析しています…',
  '潜在的な才能を読み取り中…',
  '守護神様との縁を確認中…',
  'あなただけの結果を生成しています…',
]

export function QuizEngine() {
  const router = useRouter()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<AttributeScore[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzeStep, setAnalyzeStep] = useState(0)
  const [loadPct, setLoadPct] = useState(0)
  const resultTypeRef = useRef<string | null>(null)

  // ローディング演出のタイマー制御
  useEffect(() => {
    if (!isAnalyzing) return

    // ステップテキストを600ms間隔で更新
    const stepInterval = setInterval(() => {
      setAnalyzeStep(prev => {
        if (prev < ANALYSIS_STEPS.length - 1) return prev + 1
        return prev
      })
    }, 600)

    // プログレスバーを2400msで100%まで
    const loadInterval = setInterval(() => {
      setLoadPct(prev => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 48)

    // 2600ms後に結果ページへ
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

    if (currentQ === 0) {
      trackEvent('InitiateCheckout')
    }

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

  // 分析中画面
  if (isAnalyzing) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(160deg, #0D0D1A 0%, #1A0A2E 50%, #0D0D1A 100%)' }}
      >
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-8 animate-spin" style={{ animationDuration: '3s' }}>✦</div>

          <p className="font-serif text-lg font-bold mb-2" style={{ color: '#F5EAE1' }}>
            守護神様を鑑定中
          </p>
          <p
            className="text-sm mb-8 fade-in-up"
            style={{ color: '#C4B5C8' }}
            key={analyzeStep}
          >
            {ANALYSIS_STEPS[analyzeStep]}
          </p>

          {/* プログレスバー */}
          <div className="w-full rounded-full h-1.5 mb-4" style={{ background: '#2D1A4A' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-100"
              style={{
                width: `${loadPct}%`,
                background: 'linear-gradient(90deg, #C07A35, #E4AD75)',
              }}
            />
          </div>
          <p className="text-xs" style={{ color: '#592E6B' }}>しばらくお待ちください…</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: 'linear-gradient(160deg, #0D0D1A 0%, #1A0A2E 50%, #0D0D1A 100%)' }}
    >
      <div className="w-full max-w-md">

        {/* 進捗バー */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: '#E4AD75' }}>Q{currentQ + 1} / {QUIZ_QUESTIONS.length}問</span>
            <span style={{ color: '#8B7B8B' }}>{progress}% 完了</span>
          </div>
          <div className="w-full rounded-full h-1.5" style={{ background: '#2D1A4A' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #C07A35, #E4AD75)',
              }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div
          className="rounded-2xl p-6 mb-4 slide-in"
          key={currentQ}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(228,173,117,0.1)' }}
        >
          <p className="font-serif text-xl font-bold leading-relaxed mb-8 text-center" style={{ color: '#F5EAE1' }}>
            {question.text}
          </p>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => onSelect(option.scores)}
                className="w-full text-left px-5 py-4 rounded-xl transition-all duration-200 active:scale-98"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(228,173,117,0.2)',
                  color: '#D9D8DD',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(89,46,107,0.4)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#E4AD75'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(228,173,117,0.2)'
                }}
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
            className="text-sm underline mt-2 mx-auto block"
            style={{ color: '#592E6B' }}
          >
            ← 前の質問に戻る
          </button>
        )}

        <p className="text-xs text-center mt-6" style={{ color: '#3D2D4A' }}>
          ※本診断はエンターテインメント目的のコンテンツです
        </p>
      </div>
    </div>
  )
}
