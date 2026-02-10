import clsx from 'clsx'
import { type BonusType, BONUS_TYPE_LABELS, BONUS_TYPE_ICONS } from '../../types'
import { layoutStyles, textStyles } from '../styles'

const styles = {
  title: textStyles.titleSm,
  grid: layoutStyles.grid2,
  column: 'grid grid-rows-2 gap-2',
  button: 'w-full flex items-center justify-start rounded-lg transition',
  icon: 'text-3xl m-1',
  label: 'text-white text-xs font-medium',
}

interface BonusTypeSelectorProps {
  selectedBonusType: BonusType | null
  onSelectBonusType: (type: BonusType) => void
}

export function BonusTypeSelector({ selectedBonusType, onSelectBonusType }: BonusTypeSelectorProps) {
  return (
    <>
      <h3 className={styles.title}>選擇獎勵類型</h3>
      <div className={styles.grid}>
        <div className={styles.column}>
          {(Object.keys(BONUS_TYPE_LABELS) as BonusType[]).map((type, i) =>
            i % 2 === 0 ? (
              CreateBonusTypeButton({ bonusType: type, selectedBonusType, onSelectBonusType })
            ) : null
          )}
        </div>
        <div className={styles.column}>
          {(Object.keys(BONUS_TYPE_LABELS) as BonusType[]).map((type, i) =>
            i % 2 !== 0 ? (
              CreateBonusTypeButton({ bonusType: type, selectedBonusType, onSelectBonusType })
            ) : null
          )}
        </div>
      </div>
    </>
  )
}

interface CreateBonusTypeButtonProps {
  bonusType: BonusType
  selectedBonusType: BonusType | null
  onSelectBonusType: (type: BonusType) => void
}

function CreateBonusTypeButton({ bonusType, selectedBonusType, onSelectBonusType }: CreateBonusTypeButtonProps) {
  const isSelected = selectedBonusType === bonusType

  return (
    <button
      key={bonusType}
      onClick={() => onSelectBonusType(bonusType)}
      className={clsx(
        styles.button,
        isSelected ? 'score-type-selected' : 'score-type-unselected',
      )}
    >
      <span className={styles.icon}>{BONUS_TYPE_ICONS[bonusType]}</span>
      <span className={styles.label}>{BONUS_TYPE_LABELS[bonusType]}</span>
    </button>
  )
}
