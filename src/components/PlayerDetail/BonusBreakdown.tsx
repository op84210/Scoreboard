import { type BonusBreakdown as BonusBreakdownType, type BonusType, BONUS_TYPE_ICONS, BONUS_TYPE_LABELS } from '../../types'
import { cardStyles, layoutStyles, textStyles } from '../styles'

const styles = {
  card: cardStyles.sectionSm,
  title: textStyles.titleSm,
  grid: layoutStyles.gridCols3,
  item: cardStyles.item,
  icon: 'text-2xl',
  label: textStyles.labelXs,
  value: textStyles.valueLg,
}

interface BonusBreakdownProps {
  breakdown: BonusBreakdownType
}

export function BonusBreakdown({ breakdown }: BonusBreakdownProps) {
  const bonusTypes = Object.keys(breakdown) as BonusType[]

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>獎勵點數</h3>
      <div className={styles.grid}>
        {bonusTypes.map((type) => (
          <div key={type} className={styles.item}>
            <div className={styles.icon}>{BONUS_TYPE_ICONS[type]}</div>
            <div className={styles.label}>{BONUS_TYPE_LABELS[type]}</div>
            <div className={styles.value}>{breakdown[type]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
