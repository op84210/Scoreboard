import clsx from 'clsx'
import { SCORE_TYPE_ICONS, SCORE_TYPE_LABELS, type ScoreType } from '../../../types'
import { scoreboardStyles as styles } from '../styles'

interface ScoreboardQuickTypeSelectorProps {
  selectedType: ScoreType
  onSelectType: (type: ScoreType) => void
}

const QUICK_SCORE_TYPES: ScoreType[] = ['castle', 'road', 'monastery', 'garden', 'field']

export function ScoreboardQuickTypeSelector({
  selectedType,
  onSelectType,
}: ScoreboardQuickTypeSelectorProps) {
  return (
    <section className={styles.quickTypeSection}>
      <div className={styles.quickTypeHeader}>
        <h2 className={styles.quickTypeTitle}>快速得分類型</h2>
      </div>
      <div className={styles.quickTypeList}>
        {QUICK_SCORE_TYPES.map((type) => {
          const isSelected = selectedType === type
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelectType(type)}
              className={clsx(
                styles.quickTypeButton,
                isSelected ? styles.quickTypeButtonActive : styles.quickTypeButtonIdle,
              )}
              title={`快速加分套用 ${SCORE_TYPE_LABELS[type]}`}
              aria-label={`得分類型：${SCORE_TYPE_LABELS[type]}`}
              aria-pressed={isSelected}
            >
              <span className={styles.quickTypeIcon}>{SCORE_TYPE_ICONS[type]}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}