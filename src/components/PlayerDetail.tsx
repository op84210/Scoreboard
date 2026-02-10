import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { type Player } from '../types'
import { PlayerHeader } from './PlayerDetail/PlayerHeader'
import { PlayerScore } from './PlayerDetail/PlayerScore'
import { ScoreBreakdown } from './PlayerDetail/ScoreBreakdown'
import { BonusBreakdown } from './PlayerDetail/BonusBreakdown'
import { PLAYER_BG_COLORS } from '../constants/colors'
import { sheetStyles } from './styles'

const styles = {
  content: 'flex flex-col justify-evenly h-full animate-fade-in',
  returnButton: 'btn-gray w-full',
}

// 玩家細節元件屬性
interface PlayerDetailProps {
  player: Player
  onClose: () => void
  onUpdatePlayerName?: (playerId: number, newName: string) => void
}

// 玩家細節元件
export function PlayerDetail({ player, onClose, onUpdatePlayerName }: PlayerDetailProps) {

  // 控制關閉動畫
  const [isClosing, setIsClosing] = useState(false)

  // 處理關閉細節視窗
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(onClose, 300) // 等待動畫結束（0.3s）後才關閉
  }, [onClose])

  // 根據玩家顏色設定背景色
  const bgColor = PLAYER_BG_COLORS[player.color] || 'rgb(23 23 23)'
  const breakdownTotal = Object.values(player.scoreBreakdown).reduce((sum, value) => sum + value, 0)

  return (
    <div
      className={sheetStyles.overlay}
      onClick={handleClose}
    >
      {/* 點擊背景關閉 */}
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