import { useState, useCallback } from 'react'
import { type Player, type ScoreType } from '../types'
import { PlayerHeader } from './PlayerDetail/PlayerHeader'
import { PlayerScore } from './PlayerDetail/PlayerScore'
import { ScoreBreakdown } from './PlayerDetail/ScoreBreakdown'
import { ScoreTypeSelector } from './PlayerDetail/ScoreTypeSelector'
import { ScoreInputPanel } from './PlayerDetail/ScoreInputPanel'
import { PLAYER_BG_COLORS } from '../constants/colors'

// 玩家細節元件屬性
interface PlayerDetailProps {
  player: Player
  onClose: () => void
  onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
  onUpdatePlayerName?: (playerId: number, newName: string) => void
}

export function PlayerDetail({ player, onClose, onAddScore, onUpdatePlayerName }: PlayerDetailProps) {
  // 選擇的得分類型狀態
  const [selectedScoreType, setSelectedScoreType] = useState<ScoreType | null>(null)
  // 控制是否顯示分數輸入面板
  const [showInput, setShowInput] = useState(false)
  // 控制關閉動畫
  const [isClosing, setIsClosing] = useState(false)

  // 處理確認分數輸入
  const handleConfirmScore = useCallback((points: number) => {
    if (selectedScoreType === null) {
      return
    }
    onAddScore(player.id, points, selectedScoreType)
    setShowInput(false) // 返回主畫面
    setSelectedScoreType(null) // 重置選擇
  }, [onAddScore, player.id, selectedScoreType])

  // 處理關閉細節視窗
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(onClose, 300) // 等待動畫結束（0.3s）後才關閉
  }, [onClose])

  // 根據玩家顏色設定背景色
  const bgColor = PLAYER_BG_COLORS[player.color] || 'rgb(23 23 23)'

  return (
    <div
      className="fixed inset-0 bg-opacity-75 flex items-end justify-center z-50"
      onClick={handleClose}
    >
      {/* 點擊背景關閉 */}
      <div
        className={`bg-gray-900 rounded-t-3xl p-4 w-full h-full max-w-md overflow-y-auto 
          ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
        style={{ backgroundColor: bgColor }}
        onClick={(e) => e.stopPropagation()}
      >
        {!showInput && (
          <div className="flex flex-col justify-evenly h-full animate-fade-in">
            <PlayerHeader
              playerName={player.name}
              onClose={handleClose}
              onNameChange={(newName) => onUpdatePlayerName?.(player.id, newName)}
            />
            <PlayerScore score={player.score} />
            <ScoreBreakdown breakdown={player.scoreBreakdown} totalScore={player.score} />
            <button
              onClick={() => setShowInput(true)}
              className="btn-confirm w-full"
            >
              輸入分數
            </button>
            <button
              onClick={handleClose}
              className="btn-gray w-full"
            >
              返回主畫面
            </button>
          </div>
        )}

        {showInput && (
          <div className="flex flex-col justify-evenly h-full animate-fade-in">
            <ScoreTypeSelector
              selectedScoreType={selectedScoreType}
              onSelectScoreType={(type) => setSelectedScoreType(type)}
            />
            <ScoreInputPanel
              onConfirmScore={handleConfirmScore}
              confirmDisabled={selectedScoreType === null}
            />
            <button
              onClick={() => {
                setShowInput(false)
                setSelectedScoreType(null) // 重置選擇
              }}
              className="btn-gray"
            >
              返回
            </button>
          </div>
        )}
      </div>
    </div>
  )
}