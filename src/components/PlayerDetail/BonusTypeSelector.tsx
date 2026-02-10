import { type BonusType, BONUS_TYPE_LABELS, BONUS_TYPE_ICONS } from '../../types'

interface BonusTypeSelectorProps {
  selectedBonusType: BonusType | null
  onSelectBonusType: (type: BonusType) => void
}

export function BonusTypeSelector({ selectedBonusType, onSelectBonusType }: BonusTypeSelectorProps) {
  return (
    <>
      <h3 className="text-white font-bold text-sm mb-2">選擇獎勵類型</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-rows-2 gap-2">
          {(Object.keys(BONUS_TYPE_LABELS) as BonusType[]).map((type, i) =>
            i % 2 === 0 ? (
              CreateBonusTypeButton({ bonusType: type, selectedBonusType, onSelectBonusType })
            ) : null
          )}
        </div>
        <div className="grid grid-rows-2 gap-2">
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
      className={`w-full flex items-center justify-start rounded-lg transition ${
          isSelected ? 'score-type-selected' : 'score-type-unselected'
        }`}
    >
      <span className="text-3xl m-1">{BONUS_TYPE_ICONS[bonusType]}</span>
      <span className="text-white text-xs font-medium">{BONUS_TYPE_LABELS[bonusType]}</span>
    </button>
  )
}
