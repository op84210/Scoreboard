import { useState } from 'react'

interface ScoreInputPanelProps {
  onQuickScore: (points: number) => void
  onCustomScore: (points: number) => void
}

export function ScoreInputPanel({ onQuickScore, onCustomScore }: ScoreInputPanelProps) {
  const [customScore, setCustomScore] = useState('')

  const handleCustomScore = () => {
    const points = parseInt(customScore)
    if (!isNaN(points) && points !== 0) {
      onCustomScore(points)
      setCustomScore('')
    }
  }

  return (
    <>
      {/* 快速加分按鈕 */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[1, 2, 3, 5, 10, -1, -2, -5].map((points) => (
          <button
            key={points}
            onClick={() => onQuickScore(points)}
            className={`${
              points > 0
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            } text-white font-bold py-3 rounded-lg transition`}
          >
            {points > 0 ? '+' : ''}
            {points}
          </button>
        ))}
      </div>

      {/* 自定義得分輸入 */}
      <div className="flex gap-2">
        <input
          type="number"
          value={customScore}
          onChange={(e) => setCustomScore(e.target.value)}
          placeholder="輸入分數"
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCustomScore()
            }
          }}
        />
        <button
          onClick={handleCustomScore}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
        >
          確定
        </button>
      </div>
    </>
  )
}