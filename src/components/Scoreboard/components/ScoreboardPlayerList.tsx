import clsx from 'clsx'
import { type Player } from '../../../types'
import { scoreboardStyles as styles } from '../styles'

interface ScoreboardPlayerListProps {
  players: Player[]
  onSelectPlayer: (playerId: number) => void
  onInputScore: (playerId: number) => void
}

// 玩家列表元件，展示所有玩家的名稱和分數，並提供查看詳情和輸入分數的按鈕
export function ScoreboardPlayerList({
  players,
  onSelectPlayer,
  onInputScore,
}: ScoreboardPlayerListProps) {
  return (
    <ul className={styles.playerList}>
      {players.map((player) => {
        const colorClass = `btn-${player.color}`
        return (
          <div key={player.id} className={styles.playerRow}>
            <button
              onClick={() => onSelectPlayer(player.id)}
              className={clsx(styles.playerButton, colorClass)}
              title="查看明細"
            >
              <div className={styles.playerScoreRow}>
                <span>{player.name}</span>
                <span className={styles.playerScoreValue}>{player.score}</span>
              </div>
            </button>
            <button
              onClick={() => onInputScore(player.id)}
              className={styles.addScoreButton}
              title="輸入分數"
            >
              ➕
            </button>
          </div>
        )
      })}
    </ul>
  )
}
