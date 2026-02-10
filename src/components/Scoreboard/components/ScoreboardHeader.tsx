import clsx from 'clsx'
import { scoreboardStyles as styles } from '../styles'

interface ScoreboardHeaderProps {
  endgameApplied: boolean
  onReset: () => void
  onEndgame: () => void
  onShowHistory: () => void
}

// 計分板頭部元件，包含重設、終局結算和查看紀錄的按鈕
export function ScoreboardHeader({
  endgameApplied,
  onReset,
  onEndgame,
  onShowHistory,
}: ScoreboardHeaderProps) {
  return (
    <div className={styles.topBar}>
      <button
        onClick={onReset}
        className={clsx(styles.iconButton, styles.iconButtonGray)}
        title="重設一局"
      >
        ↻
      </button>
      <button
        onClick={onEndgame}
        className={clsx(
          styles.iconButton,
          endgameApplied ? styles.iconButtonDisabled : styles.iconButtonAmber,
        )}
        title={endgameApplied ? '已結算終局' : '終局結算'}
        disabled={endgameApplied}
      >
        🏁
      </button>
      <button
        onClick={onShowHistory}
        className={clsx(styles.iconButton, styles.iconButtonGray)}
        title="紀錄"
      >
        📜
      </button>
    </div>
  )
}
