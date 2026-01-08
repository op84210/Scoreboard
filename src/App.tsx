import { useState } from 'react'
import './App.css'
import { type Player, type GameState, PLAYER_COLORS, type ScoreBreakdown, type ScoreRecord, type ScoreType, } from './types'
import { PlayerSetup } from './components/PlayerSetup'
import { Scoreboard } from './components/Scoreboard'

function App() {

  // 遊戲狀態與玩家資料
  const [gameState, setGameState] = useState<GameState>('setup')
  const [players, setPlayers] = useState<Player[]>([])

  // 建立空的得分類別
  const createEmptyBreakdown = (): ScoreBreakdown => ({
    castle: 0,
    road: 0,
    monastery: 0,
    garden: 0,
    field: 0,
  })

  // 處理玩家人數選擇
  const handlePlayerCountSelected = (count: number) => {
    const newPlayers: Player[] = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `玩家 ${i + 1}`,
      score: 0,
      color: PLAYER_COLORS[i],
      scoreBreakdown: createEmptyBreakdown(),
      scoreHistory: [] as ScoreRecord[],
    }))
    setPlayers(newPlayers)
    setGameState('playing')
  }

  // 處理重設遊戲
  const handleReset = () => {
    setGameState('setup')
  }

  // 處理新增得分
  const handleAddScore = (playerId: number, points: number, scoreType: ScoreType) => {
    // 更新玩家得分資料
    setPlayers((prevPlayers) =>
      // 更新目標玩家的得分資料
      prevPlayers.map((player) => {
        // 非目標玩家不變更
        if (player.id !== playerId)
          return player

        // 創建新的得分記錄
        const newRecord: ScoreRecord = {
          id: `${Date.now()}-${Math.random()}`,
          timestamp: Date.now(),
          scoreType,
          points,
        }

        // 更新得分明細
        const newBreakdown = {
          ...player.scoreBreakdown,
          [scoreType]: Math.max(0, player.scoreBreakdown[scoreType] + points),
        }

        // 計算新總分
        const newScore = Object.values(newBreakdown).reduce((sum, s) => sum + s, 0)

        return {
          ...player,
          score: newScore,
          scoreBreakdown: newBreakdown,
          scoreHistory: [...player.scoreHistory, newRecord],
        }
      }),
    )
  }

  return (
    <>
      {gameState === 'setup' && (
        <PlayerSetup onPlayerCountSelected={handlePlayerCountSelected} />
      )}
      {gameState === 'playing' && (
        <Scoreboard players={players} onReset={handleReset} onAddScore={handleAddScore} />
      )}
    </>
  )
}

export default App
