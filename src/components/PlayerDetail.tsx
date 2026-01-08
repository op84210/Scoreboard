import { useState } from 'react'
import { type Player, type ScoreType } from '../types'
import { PlayerHeader } from './PlayerDetail/PlayerHeader'
import { PlayerScore } from './PlayerDetail/PlayerScore'
import { ScoreBreakdown } from './PlayerDetail/ScoreBreakdown'
import { ScoreTypeSelector } from './PlayerDetail/ScoreTypeSelector'
import { ScoreInputPanel } from './PlayerDetail/ScoreInputPanel'

interface PlayerDetailProps {
  player: Player
  onClose: () => void
  onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
}

export function PlayerDetail({ player, onClose, onAddScore }: PlayerDetailProps) {
  const [selectedScoreType, setSelectedScoreType] = useState<ScoreType>('castle')

  const handleQuickScore = (points: number) => {
    onAddScore(player.id, points, selectedScoreType)
  }

  const handleCustomScore = (points: number) => {
    onAddScore(player.id, points, selectedScoreType)
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-end justify-center p-4 z-50"
      onClick={onClose}
    >
      {/* 點擊背景關閉 */}
      <div 
        className="bg-gray-900 rounded-t-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 防止點擊內容時關閉 */}
        <PlayerHeader playerName={player.name} onClose={onClose} />
        <PlayerScore score={player.score} />
        <ScoreBreakdown breakdown={player.scoreBreakdown} totalScore={player.score} />
        <ScoreTypeSelector selectedScoreType={selectedScoreType} onSelectScoreType={setSelectedScoreType} />
        <ScoreInputPanel onQuickScore={handleQuickScore} onCustomScore={handleCustomScore} />
      </div>
    </div>
  )
}