import clsx from 'clsx'
import { type Player } from '../../../types'
import { scoreboardStyles as styles } from '../styles'

interface ScoreboardPlayerListProps {
  players: Player[]
  selectedPlayerId: number | null
  onSelectPlayer: (playerId: number) => void
  onOpenPlayerDetail: (playerId: number) => void
}

// 玩家列表元件，展示所有玩家的名稱和分數，並提供查看詳情和輸入分數的按鈕
export function ScoreboardPlayerList({
  players,
  selectedPlayerId,
  onSelectPlayer,
  onOpenPlayerDetail,
}: ScoreboardPlayerListProps) {
  return (
    <ul className={styles.playerList}>
      {players.map((player) => {
        const isSelected = selectedPlayerId === player.id
        const colorClass = `btn-${player.color}`
        return (
          <div key={player.id} className={styles.playerRow}>
            <button
              type="button"
              onClick={() => onSelectPlayer(player.id)}
              className={clsx(
                styles.playerButton,
                colorClass,
                isSelected ? styles.playerButtonSelected : styles.playerButtonIdle,
              )}
              title="選取玩家"
            >
              <div className={styles.playerScoreRow}>
                <span>{player.name}</span>
                <span className={styles.playerScoreValue}>{player.score}</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => onOpenPlayerDetail(player.id)}
              className={styles.playerDetailButton}
              title="查看明細"
            >
              i
            </button>
          </div>
        )
      })}
    </ul>
  )
}
