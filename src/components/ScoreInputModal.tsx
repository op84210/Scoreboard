import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { type BonusType, type Player, type ScoreType } from '../types'
import { ScoreTypeSelector } from './PlayerDetail/components/ScoreTypeSelector'
import { BonusTypeSelector } from './PlayerDetail/components/BonusTypeSelector'
import { ScoreInputPanel } from './PlayerDetail/components/ScoreInputPanel'
import { PLAYER_BG_COLORS } from '../constants/colors'
import { buttonStyles, sheetStyles, textStyles } from './styles'

const styles = {
  header: 'flex justify-between items-center',
  title: textStyles.titleLg,
  closeButton: buttonStyles.closeIcon,
  returnButton: 'btn-gray w-full',
}

// 分數輸入彈窗元件屬性
interface ScoreInputModalProps {
  player: Player
  onClose: () => void
  onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
  onAddBonus: (playerId: number, points: number, bonusType: BonusType) => void
}

// 分數輸入彈窗元件
export function ScoreInputModal({ player, onClose, onAddScore, onAddBonus }: ScoreInputModalProps) {
  
  // 選擇的得分類型狀態
  const [selectedScoreType, setSelectedScoreType] = useState<ScoreType | null>(null)
  // 選擇的獎勵類型狀態
  const [selectedBonusType, setSelectedBonusType] = useState<BonusType | null>(null)
  // 控制關閉動畫
  const [isClosing, setIsClosing] = useState(false)

  // 處理確認分數輸入
  const handleConfirmScore = useCallback((points: number) => {
    if (selectedScoreType === null && selectedBonusType === null) {
      return
    }
    if (selectedScoreType !== null) {
      onAddScore(player.id, points, selectedScoreType)
    }
    if (selectedBonusType !== null) {
      onAddBonus(player.id, points, selectedBonusType)
    }
    handleClose() // 直接關閉彈窗返回主畫面
  }, [onAddBonus, onAddScore, player.id, selectedBonusType, selectedScoreType])

  // 處理關閉彈窗
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(onClose, 300) // 等待動畫結束（0.3s）後才關閉
  }, [onClose])

  // 根據玩家顏色設定背景色
  const bgColor = PLAYER_BG_COLORS[player.color] || 'rgb(23 23 23)'

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
        <div className={sheetStyles.content}>
          {/* 玩家名稱標題 */}
          <div className={styles.header}>
            <h2 className={styles.title}>輸入分數</h2>
            <button
              onClick={handleClose}
              className={styles.closeButton}
            >
              ×
            </button>
          </div>

          <ScoreTypeSelector
            selectedScoreType={selectedScoreType}
            onSelectScoreType={(type) => {
              setSelectedScoreType(type)
              setSelectedBonusType(null)
            }}
          />
          <BonusTypeSelector
            selectedBonusType={selectedBonusType}
            onSelectBonusType={(type) => {
              setSelectedBonusType(type)
              setSelectedScoreType(null)
            }}
          />
          <ScoreInputPanel
            onConfirmScore={handleConfirmScore}
            confirmDisabled={selectedScoreType === null && selectedBonusType === null}
          />
          <button
            onClick={handleClose}
            className={styles.returnButton}
          >
            返回
          </button>
        </div>
      </div>
    </div>
  )
}
