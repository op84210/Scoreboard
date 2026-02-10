import clsx from 'clsx'
import { type ScoreType, SCORE_TYPE_LABELS, SCORE_TYPE_ICONS } from '../../types'
import { layoutStyles, textStyles } from '../styles'

const styles = {
  title: textStyles.titleSm,
  grid: layoutStyles.grid2,
  column: 'grid grid-rows-3 gap-2',
  button: 'w-full flex items-center justify-start rounded-lg transition',
  icon: 'text-3xl m-1',
  label: 'text-white text-xs font-medium',
}

interface ScoreTypeSelectorProps {
  selectedScoreType: ScoreType | null
  onSelectScoreType: (type: ScoreType) => void
}

// 得分類型選擇器
export function ScoreTypeSelector({ selectedScoreType, onSelectScoreType }: ScoreTypeSelectorProps) {
  return (
    <>
      <h3 className={styles.title}>選擇得分類型</h3>
      <div className={styles.grid}>
        <div className={styles.column}>
          {(Object.keys(SCORE_TYPE_LABELS) as ScoreType[]).map((type, i) =>
            i % 2 === 0 ? (
              CreateScoreTypeButton({ scoreType: type, selectedScoreType, onSelectScoreType })
            ) : null
          )}
        </div>
        <div className={styles.column}>
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
      className={clsx(
        styles.button,
        isSelected ? 'score-type-selected' : 'score-type-unselected',
      )}
    >
      <span className={styles.icon}>{SCORE_TYPE_ICONS[scoreType]}</span>
      <span className={styles.label}>{SCORE_TYPE_LABELS[scoreType]}</span>
    </button>
  )
}