import { type ScoreType, SCORE_TYPE_LABELS, SCORE_TYPE_ICONS } from '../../types'

interface ScoreTypeSelectorProps {
  selectedScoreType: ScoreType
  onSelectScoreType: (type: ScoreType) => void
}

export function ScoreTypeSelector({ selectedScoreType, onSelectScoreType }: ScoreTypeSelectorProps) {
  return (
    <div className="mb-4">
      <h3 className="text-white font-bold mb-2 text-sm">選擇得分類型</h3>
      <div className="grid grid-cols-5 gap-2">
        {(Object.keys(SCORE_TYPE_LABELS) as ScoreType[]).map((type) => (
          <button
            key={type}
            onClick={() => onSelectScoreType(type)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition ${
              selectedScoreType === type
                ? 'bg-blue-600 ring-2 ring-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <span className="text-2xl mb-1">{SCORE_TYPE_ICONS[type]}</span>
            <span className="text-white text-xs">{SCORE_TYPE_LABELS[type]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}