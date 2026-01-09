import { type ScoreType, SCORE_TYPE_LABELS, SCORE_TYPE_ICONS } from '../../types'

interface ScoreTypeSelectorProps {
  selectedScoreType: ScoreType | null
  onSelectScoreType: (type: ScoreType) => void
}

export function ScoreTypeSelector({ selectedScoreType, onSelectScoreType }: ScoreTypeSelectorProps) {
  return (
    <>
      <h3 className="text-white font-bold text-sm mb-2">選擇得分類型</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-rows-3 gap-2">
          {(Object.keys(SCORE_TYPE_LABELS) as ScoreType[]).map((type, i) =>
            i % 2 === 0 ? (
              CreateScoreTypeButton({ scoreType: type, selectedScoreType, onSelectScoreType })
            ) : null
          )}
        </div>
        <div className="grid grid-rows-3 gap-2">
          {(Object.keys(SCORE_TYPE_LABELS) as ScoreType[]).map((type, i) =>
            i % 2 !== 0 ? (
              CreateScoreTypeButton({ scoreType: type, selectedScoreType, onSelectScoreType })
            ) : null
          )}
        </div>
      </div>
    </>
  )
}

interface CreateScoreTypeButtonProps {
  scoreType: ScoreType
  selectedScoreType: ScoreType | null
  onSelectScoreType: (type: ScoreType) => void
}

function CreateScoreTypeButton({ scoreType, selectedScoreType, onSelectScoreType }: CreateScoreTypeButtonProps) {
  const isSelected = selectedScoreType === scoreType

  return (
    <button
      key={scoreType}
      onClick={() => onSelectScoreType(scoreType)}
      className={`w-full flex items-center justify-start rounded-lg transition ${
          isSelected ? 'score-type-selected' : 'score-type-unselected'
        }`}
    >
      <span className="text-3xl m-1">{SCORE_TYPE_ICONS[scoreType]}</span>
      <span className="text-white text-xs font-medium">{SCORE_TYPE_LABELS[scoreType]}</span>
    </button>
  )
}