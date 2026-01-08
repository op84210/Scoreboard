import { type ScoreBreakdown as ScoreBreakdownType, type ScoreType, SCORE_TYPE_ICONS, SCORE_TYPE_LABELS } from '../../types'

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType
  totalScore: number
}

export function ScoreBreakdown({ breakdown, totalScore }: ScoreBreakdownProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <h3 className="text-white font-bold mb-3 text-sm">得分明細</h3>
      <div className="space-y-2">
        {(Object.keys(breakdown) as ScoreType[]).map((type) => {
          const score = breakdown[type]
          const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0

          return (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{SCORE_TYPE_ICONS[type]}</span>
                <span className="text-white text-sm">{SCORE_TYPE_LABELS[type]}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-white font-bold text-sm w-12 text-right">
                  {score}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}