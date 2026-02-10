import { useCallback, useState } from 'react'
import { type BonusType, type Player, type ScoreType } from '../../types'
import { scoreboardStyles as styles } from './styles'
import { ScoreboardHeader } from './components/ScoreboardHeader'
import { ScoreboardChart } from './components/ScoreboardChart'
import { ScoreboardPlayerList } from './components/ScoreboardPlayerList'
import { ScoreboardModals } from './components/ScoreboardModals'

interface ScoreboardProps {
  players: Player[]
  onReset: () => void
  onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
  onAddBonus: (playerId: number, points: number, bonusType: BonusType) => void
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
  onUpdatePlayerName,
  onShowHistory,
  onApplyEndgameBonus,
  endgameApplied,
}: ScoreboardProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
  const [inputPlayerId, setInputPlayerId] = useState<number | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showEndgameConfirm, setShowEndgameConfirm] = useState(false)

  const selectedPlayer = selectedPlayerId
    ? players.find((player) => player.id === selectedPlayerId) ?? null
    : null

  const inputPlayer = inputPlayerId
    ? players.find((player) => player.id === inputPlayerId) ?? null
    : null

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

  return (
    <div className={styles.container}>
      <ScoreboardHeader
        endgameApplied={endgameApplied}
        onReset={handleResetClick}
        onEndgame={handleEndgameClick}
        onShowHistory={onShowHistory}
      />

      <ScoreboardChart players={players} />

      <ScoreboardPlayerList
        players={players}
        onSelectPlayer={setSelectedPlayerId}
        onInputScore={setInputPlayerId}
      />

      <ScoreboardModals
        selectedPlayer={selectedPlayer}
        inputPlayer={inputPlayer}
        showResetConfirm={showResetConfirm}
        showEndgameConfirm={showEndgameConfirm}
        onClosePlayerDetail={() => setSelectedPlayerId(null)}
        onCloseScoreInput={() => setInputPlayerId(null)}
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
