import { useState, useCallback } from 'react'

interface ScoreInputPanelProps {
  onConfirmScore: (points: number) => void
  confirmDisabled?: boolean
}

export function ScoreInputPanel({ onConfirmScore, confirmDisabled = false }: ScoreInputPanelProps) {
  // 自定義分數輸入狀態
  const [customScore, setCustomScore] = useState('')

  // 快速按鈕：僅累加到輸入框，不立即提交
  const handleAdjustScore = useCallback((delta: number) => {
    const base = parseInt(customScore)
    const current = isNaN(base) ? 0 : base
    const next = current + delta
    if (next < 0) {
      setCustomScore('0')
      return
    }
    setCustomScore(String(next))
  }, [customScore])

  // 確定：提交輸入框的值
  const handleConfirm = useCallback(() => {
    const points = parseInt(customScore)
    if (!isNaN(points) && points !== 0) {
      onConfirmScore(points)
      setCustomScore('')
    }
  }, [customScore, onConfirmScore])

  return (
    <>
      {/* 快速加分按鈕 */}
      <div className="grid grid-cols-4 gap-2">
        {[1, 3, 5, 10, -1, -3, -5, -10].map((points) => (
          <button
            key={points}
            onClick={() => handleAdjustScore(points)}
            className={points > 0 ? 'btn-score-positive' : 'btn-score-negative'}
          >
            {points > 0 ? '+' + points : points}
          </button>
        ))}
      </div>

      {/* 自定義得分輸入 */}
      <div className="flex gap-2 flex-col sm:flex-row">
        <input
          type="number"
          value={customScore}
          onChange={(e) => setCustomScore(e.target.value)}
          placeholder="輸入分數"
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleConfirm()
            }
          }}
        />
        <button
          onClick={handleConfirm}
          disabled={confirmDisabled}
          className="btn-confirm"
        >
          確定
        </button>
      </div>
    </>
  )
}