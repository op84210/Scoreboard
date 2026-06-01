import { useCallback, useState } from 'react'
import { type BonusType, type Player, type ScoreType } from '../../types'
import { scoreboardStyles as styles } from './styles'
import { ScoreboardHeader } from './components/ScoreboardHeader'
import { ScoreboardBonusLeaders } from './components/ScoreboardBonusLeaders'
import { ScoreboardChart } from './components/ScoreboardChart'
import { ScoreboardQuickTypeSelector } from './components/ScoreboardQuickTypeSelector'
import { ScoreboardPlayerList } from './components/ScoreboardPlayerList'
import { ScoreboardModals } from './components/ScoreboardModals'

interface ScoreboardBottomDockProps {
  selectedType: ScoreType
  onSelectType: (type: ScoreType) => void
  onAddThree: () => void
  onAddOne: () => void
  onMinusOne: () => void
  onUndo: () => void
  actionsDisabled: boolean
  canUndo: boolean
}

function ScoreboardBottomDock({
  selectedType,
  onSelectType,
  onAddThree,
  onAddOne,
  onMinusOne,
  onUndo,
  actionsDisabled,
  canUndo,
}: ScoreboardBottomDockProps) {
  const actionDisabledClass = actionsDisabled ? styles.dockActionDisabled : ''
  const undoDisabledClass = !canUndo ? styles.dockActionDisabled : ''

  return (
    <div className={styles.bottomDock}>
      <div className={styles.dockPanel}>
        <ScoreboardQuickTypeSelector
          selectedType={selectedType}
          onSelectType={onSelectType}
        />

        <div className={styles.dockActions}>
          <button
            type="button"
            onClick={onMinusOne}
            disabled={actionsDisabled}
            className={`${styles.dockActionButton} ${styles.dockActionNegative} ${actionDisabledClass}`}
            title="扣 1 分"
          >
            -1
          </button>
          <button
            type="button"
            onClick={onAddOne}
            disabled={actionsDisabled}
            className={`${styles.dockActionButton} ${styles.dockActionPositive} ${actionDisabledClass}`}
            title="加 1 分"
          >
            +1
          </button>
          <button
            type="button"
            onClick={onAddThree}
            disabled={actionsDisabled}
            className={`${styles.dockActionButton} ${styles.dockActionPositive} ${actionDisabledClass}`}
            title="加 3 分"
          >
            +3
          </button>
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className={`${styles.dockActionButton} ${styles.dockActionUndo} ${undoDisabledClass}`}
            title="復原最近一筆"
            aria-label="復原最近一筆"
          >
            ↶
          </button>
        </div>
      </div>
    </div>
  )
}

interface ScoreboardProps {
  players: Player[]
  onReset: () => void
  onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
  onAddBonus: (playerId: number, points: number, bonusType: BonusType) => void
  onUndoLatest: () => void
  canUndo: boolean
  onUpdatePlayerName: (playerId: number, newName: string) => void
  onShowHistory: () => void
  onApplyEndgameBonus: () => void
  endgameApplied: boolean
}

// 主計分板元件，負責整合頭部、圖表、玩家列表和各種彈窗，並處理相關的狀態和事件
export function Scoreboard({
  players,
  onReset,
  onAddScore,
  onAddBonus,
  onUndoLatest,
  canUndo,
  onUpdatePlayerName,
  onShowHistory,
  onApplyEndgameBonus,
  endgameApplied,
}: ScoreboardProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
  const [detailPlayerId, setDetailPlayerId] = useState<number | null>(null)
  const [quickScoreType, setQuickScoreType] = useState<ScoreType>('castle')
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showEndgameConfirm, setShowEndgameConfirm] = useState(false)

  const detailPlayer = detailPlayerId
    ? players.find((player) => player.id === detailPlayerId) ?? null
    : null

  const selectedPlayer = selectedPlayerId
    ? players.find((player) => player.id === selectedPlayerId) ?? null
    : null

  const quickActionDisabled = selectedPlayerId === null
  const selectedTypePoints = selectedPlayer?.scoreBreakdown[quickScoreType] ?? 0

  const handleResetClick = useCallback(() => {
    setShowResetConfirm(true)
  }, [])

  const handleConfirmReset = useCallback(() => {
    setShowResetConfirm(false)
    onReset()
  }, [onReset])

  const handleEndgameClick = useCallback(() => {
    if (endgameApplied) return
    setShowEndgameConfirm(true)
  }, [endgameApplied])

  const handleConfirmEndgame = useCallback(() => {
    setShowEndgameConfirm(false)
    onApplyEndgameBonus()
  }, [onApplyEndgameBonus])

  const handleQuickScore = useCallback((points: number) => {
    if (selectedPlayerId === null) return
    if (points < 0 && selectedTypePoints <= 0) return
    onAddScore(selectedPlayerId, points, quickScoreType)
  }, [onAddScore, quickScoreType, selectedPlayerId, selectedTypePoints])

  return (
    <div className={styles.container}>
      <ScoreboardHeader
        endgameApplied={endgameApplied}
        onReset={handleResetClick}
        onEndgame={handleEndgameClick}
        onShowHistory={onShowHistory}
      />

      <ScoreboardBonusLeaders players={players} />

      <ScoreboardChart players={players} />

      <ScoreboardPlayerList
        players={players}
        selectedPlayerId={selectedPlayerId}
        onSelectPlayer={setSelectedPlayerId}
        onOpenPlayerDetail={setDetailPlayerId}
      />

      <ScoreboardBottomDock
        selectedType={quickScoreType}
        onSelectType={setQuickScoreType}
        onAddThree={() => handleQuickScore(3)}
        onAddOne={() => handleQuickScore(1)}
        onMinusOne={() => handleQuickScore(-1)}
        onUndo={onUndoLatest}
        actionsDisabled={quickActionDisabled}
        canUndo={canUndo}
      />

      <ScoreboardModals
        selectedPlayer={detailPlayer}
        inputPlayer={null}
        showResetConfirm={showResetConfirm}
        showEndgameConfirm={showEndgameConfirm}
        onClosePlayerDetail={() => setDetailPlayerId(null)}
        onCloseScoreInput={() => undefined}
        onUpdatePlayerName={onUpdatePlayerName}
        onAddScore={onAddScore}
        onAddBonus={onAddBonus}
        onConfirmReset={handleConfirmReset}
        onCancelReset={() => setShowResetConfirm(false)}
        onConfirmEndgame={handleConfirmEndgame}
        onCancelEndgame={() => setShowEndgameConfirm(false)}
      />
    </div>
  )
}
