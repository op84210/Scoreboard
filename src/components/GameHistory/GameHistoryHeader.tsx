import { gameHistoryStyles as styles } from './styles'

interface GameHistoryHeaderProps {
  title: string
  onBack: () => void
}

export function GameHistoryHeader({ title, onBack }: GameHistoryHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.actions}>
        <button onClick={onBack} className={styles.backButton} aria-label="返回">
          ×
        </button>
      </div>
    </div>
  )
}
