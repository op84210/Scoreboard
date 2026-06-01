import { useCallback, useEffect, useState } from 'react'
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
  onSubmitPending: (points: number) => void
  onUndo: () => void
  actionsDisabled: boolean
  maxDecrement: number
  contextKey: string
  canUndo: boolean
}

function ScoreboardBottomDock({
  selectedType,
  onSelectType,
  onSubmitPending,
  onUndo,
  actionsDisabled,
  maxDecrement,
  contextKey,
  canUndo,
}: ScoreboardBottomDockProps) {
  const [pendingPoints, setPendingPoints] = useState(0)

  const undoDisabledClass = !canUndo ? styles.dockActionDisabled : ''
  const pendingDisabled = actionsDisabled || pendingPoints === 0

  useEffect(() => {
    setPendingPoints(0)
  }, [contextKey])

  const handleAdjustPending = useCallback((delta: number) => {
    if (actionsDisabled) return
    setPendingPoints((prev) => Math.max(-maxDecrement, prev + delta))
  }, [actionsDisabled, maxDecrement])

  const handleSubmitPending = useCallback(() => {
    if (pendingDisabled) return
    onSubmitPending(pendingPoints)
    setPendingPoints(0)
  }, [onSubmitPending, pendingDisabled, pendingPoints])

  const pendingLabel = pendingPoints > 0 ? `+${pendingPoints}` : `${pendingPoints}`

  return (
    <div className={styles.bottomDock}>
      <div className={styles.dockPanel}>
        <div className={styles.dockTopRow}>
          <ScoreboardQuickTypeSelector
            selectedType={selectedType}
            onSelectType={onSelectType}
          />

          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className={`${styles.dockUndoButton} ${styles.dockActionUndo} ${undoDisabledClass}`}
            title="復原最近一筆"
            aria-label="復原最近一筆"
          >
            ↶
          </button>
        </div>

        <div className={styles.dockScoreRow}>
          <button
            type="button"
            onClick={() => handleAdjustPending(-5)}
            disabled={actionsDisabled}
            className={`${styles.dockActionButton} ${styles.dockActionNegative} ${actionsDisabled ? styles.dockActionDisabled : ''}`}
            title="扣 5 分"
          >
            -5
          </button>
          <button
            type="button"
            onClick={() => handleAdjustPending(-1)}
            disabled={actionsDisabled}
            className={`${styles.dockActionButton} ${styles.dockActionNegative} ${actionsDisabled ? styles.dockActionDisabled : ''}`}
            title="扣 1 分"
          >
            -1
          </button>

          <button
            type="button"
            onClick={handleSubmitPending}
            disabled={pendingDisabled}
            className={`${styles.dockActionButton} ${styles.dockActionPending} ${pendingDisabled ? styles.dockActionDisabled : ''}`}
            title="送出累積分數"
            aria-label={`送出累積分數 ${pendingLabel}`}
          >
            {pendingLabel}
          </button>

          <button
            type="button"
            onClick={() => handleAdjustPending(1)}
            disabled={actionsDisabled}
            className={`${styles.dockActionButton} ${styles.dockActionPositive} ${actionsDisabled ? styles.dockActionDisabled : ''}`}
            title="加 1 分"
          >
            +1
          </button>
          <button
            type="button"
            onClick={() => handleAdjustPending(5)}
            disabled={actionsDisabled}
            className={`${styles.dockActionButton} ${styles.dockActionPositive} ${actionsDisabled ? styles.dockActionDisabled : ''}`}
            title="加 5 分"
          >
            +5
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
    if (points < 0 && selectedTypePoints < Math.abs(points)) return
    onAddScore(selectedPlayerId, points, quickScoreType)
  }, [onAddScore, quickScoreType, selectedPlayerId, selectedTypePoints])

  const handleSubmitPending = useCallback((points: number) => {
    handleQuickScore(points)
  }, [handleQuickScore])

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
        onSubmitPending={handleSubmitPending}
        onUndo={onUndoLatest}
        actionsDisabled={quickActionDisabled}
        maxDecrement={selectedTypePoints}
        contextKey={`${selectedPlayerId ?? 'none'}-${quickScoreType}`}
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
