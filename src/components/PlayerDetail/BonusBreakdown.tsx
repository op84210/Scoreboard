import { type BonusBreakdown as BonusBreakdownType, type BonusType, BONUS_TYPE_ICONS, BONUS_TYPE_LABELS } from '../../types'

interface BonusBreakdownProps {
  breakdown: BonusBreakdownType
}

export function BonusBreakdown({ breakdown }: BonusBreakdownProps) {
  const bonusTypes = Object.keys(breakdown) as BonusType[]

  return (
    <div className="bg-gray-800 rounded-lg p-2 my-2">
      <h3 className="text-white font-bold text-sm mb-2">獎勵點數</h3>
      <div className="grid grid-cols-3 gap-2">
        {bonusTypes.map((type) => (
          <div key={type} className="bg-gray-900 rounded-lg p-2 text-center">
            <div className="text-2xl">{BONUS_TYPE_ICONS[type]}</div>
            <div className="text-gray-200 text-xs">{BONUS_TYPE_LABELS[type]}</div>
            <div className="text-white font-bold text-lg">{breakdown[type]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
