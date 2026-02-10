import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { type Player } from '../../types'
import { PlayerHeader } from './components/PlayerHeader.tsx'
import { PlayerScore } from './components/PlayerScore.tsx'
import { ScoreBreakdown } from './components/ScoreBreakdown.tsx'
import { BonusBreakdown } from './components/BonusBreakdown.tsx'
import { PLAYER_BG_COLORS } from '../../constants/colors'
import { sheetStyles } from '../styles'

const styles = {
  content: 'flex flex-col justify-evenly h-full animate-fade-in',
  returnButton: 'btn-gray w-full',
}

interface PlayerDetailProps {
  player: Player
  onClose: () => void
  onUpdatePlayerName?: (playerId: number, newName: string) => void
}

// 玩家詳情頁元件，展示玩家的得分、得分明細和獎勵明細，並提供修改名稱和返回主畫面的功能
export function PlayerDetail({ player, onClose, onUpdatePlayerName }: PlayerDetailProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(onClose, 300)
  }, [onClose])

  const bgColor = PLAYER_BG_COLORS[player.color] || 'rgb(23 23 23)'
  const breakdownTotal = Object.values(player.scoreBreakdown).reduce((sum, value) => sum + value, 0)

  return (
    <div
      className={sheetStyles.overlay}
      onClick={handleClose}
    >
      <div
        className={clsx(
          sheetStyles.panel,
          isClosing ? sheetStyles.panelClose : sheetStyles.panelOpen,
        )}
        style={{ backgroundColor: bgColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.content}>
          <PlayerHeader
            playerName={player.name}
            onClose={handleClose}
            onNameChange={(newName) => onUpdatePlayerName?.(player.id, newName)}
          />
          <PlayerScore score={player.score} />
          <ScoreBreakdown breakdown={player.scoreBreakdown} totalScore={breakdownTotal} />
          <BonusBreakdown breakdown={player.bonusBreakdown} />
          <button
            onClick={handleClose}
            className={styles.returnButton}
          >
            返回主畫面
          </button>
        </div>
      </div>
    </div>
  )
}
