import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { layoutStyles } from '../../styles'

const styles = {
  quickGrid: 'grid grid-cols-4 gap-2',
  positiveButton: 'btn-score-positive',
  negativeButton: 'btn-score-negative',
  inputRow: layoutStyles.inputRow,
  input: 'flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
  confirmButton: 'btn-confirm',
}

interface ScoreInputPanelProps {
  onConfirmScore: (points: number) => void
  confirmDisabled?: boolean
}

// 得分輸入面板，提供快速調整分數的按鈕和自定義分數輸入框
export function ScoreInputPanel({ onConfirmScore, confirmDisabled = false }: ScoreInputPanelProps) {
  const [customScore, setCustomScore] = useState('')

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

  const handleConfirm = useCallback(() => {
    const points = parseInt(customScore)
    if (!isNaN(points) && points !== 0) {
      onConfirmScore(points)
      setCustomScore('')
    }
  }, [customScore, onConfirmScore])

  return (
    <>
      <div className={styles.quickGrid}>
        {[1, 3, 5, 10, -1, -3, -5, -10].map((points) => (
          <button
            key={points}
            onClick={() => handleAdjustScore(points)}
            className={clsx(points > 0 ? styles.positiveButton : styles.negativeButton)}
          >
            {points > 0 ? '+' + points : points}
          </button>
        ))}
      </div>

      <div className={styles.inputRow}>
        <input
          type="number"
          value={customScore}
          onChange={(e) => setCustomScore(e.target.value)}
          placeholder="輸入分數"
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleConfirm()
            }
          }}
        />
        <button
          onClick={handleConfirm}
          disabled={confirmDisabled}
          className={styles.confirmButton}
        >
          確定
        </button>
      </div>
    </>
  )
}
