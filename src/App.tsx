import { useState, useCallback, useEffect } from 'react'
import './App.css'
import { type Player, type GameState, type ScoreBreakdown, type ScoreRecord, type ScoreType } from './types'
import { PLAYER_COLORS, type PlayerColor } from './constants/colors'
import { PlayerSetup } from './components/PlayerSetup'
import { ColorSelection } from './components/ColorSelection'
import { Scoreboard } from './components/Scoreboard'
import { GameHistory } from './components/GameHistory'

const STORAGE_KEY = 'scoreboard-state-v1'

type StoredState = {
  gameState: GameState
  players: Player[]
  playerCount: number
}

const loadStoredState = (): StoredState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredState
    if (!parsed || !Array.isArray(parsed.players)) return null
    return parsed
  } catch {
    return null
  }
}

function App() {

  const storedState = loadStoredState()

  // 遊戲狀態與玩家資料
  const [gameState, setGameState] = useState<GameState>(storedState?.gameState ?? 'setup')
  const [players, setPlayers] = useState<Player[]>(storedState?.players ?? [])
  const [playerCount, setPlayerCount] = useState(storedState?.playerCount ?? 0)

  // 建立空的得分類別
  const createEmptyBreakdown = (): ScoreBreakdown => ({
    castle: 0,
    road: 0,
    monastery: 0,
    garden: 0,
    field: 0,
  })

  // 建立新玩家資料
  const createNewPlayer = (id: number, color: PlayerColor): Player => ({
    id,
    name: `玩家 ${id}`,
    score: 0,
    color,
    scoreBreakdown: createEmptyBreakdown(),
    scoreHistory: [] as ScoreRecord[],
  })

  // 處理玩家人數選擇
  const handlePlayerCountSelected = useCallback((count: number) => {
    setPlayerCount(count)// 設定玩家人數

    // 如果選擇 5 人，直接使用所有顏色並進入遊戲
    if (count === 5) {
      const allColors = Object.keys(PLAYER_COLORS) as PlayerColor[]
      const newPlayers: Player[] = allColors.map((color, i) => createNewPlayer(i + 1, color))
      setPlayers(newPlayers)
      setGameState('playing')
    } else {
      // 其他人數需要選擇顏色
      setGameState('color-selection')
    }
  }, [createNewPlayer])

  // 處理顏色選擇完成
  const handleColorsSelected = useCallback((selectedColors: PlayerColor[]) => {
    const newPlayers: Player[] = selectedColors.map((color, i) => createNewPlayer(i + 1, color))
    setPlayers(newPlayers)
    setGameState('playing')
  }, [createNewPlayer])

  // 處理重設遊戲
  const handleReset = useCallback(() => {
    setGameState('setup')
    setPlayerCount(0)
    setPlayers([])
  }, [])

  // 處理玩家名稱更新
  const handleUpdatePlayerName = useCallback((playerId: number, newName: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, name: newName } : player,
      ),
    )
  }, [])

  // 處理新增得分
  const handleAddScore = useCallback((playerId: number, points: number, scoreType: ScoreType) => {

    // 更新玩家得分資料
    setPlayers((prevPlayers) =>
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
  }, [])

  // 處理返回設置頁面
  const handleBackToSetup = useCallback(() => {
    setGameState('setup')
    setPlayerCount(0)
  }, [])

  // 處理顯示歷史記錄
  const handleShowHistory = useCallback(() => {
    setGameState('history')
  }, [])

  // 處理從歷史記錄返回
  const handleBackFromHistory = useCallback(() => {
    setGameState('playing')
  }, [])

  useEffect(() => {
    const nextState: StoredState = {
      gameState,
      players,
      playerCount,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  }, [gameState, players, playerCount])

  return (
    <>
      {gameState === 'setup' && (
        <PlayerSetup
          onPlayerCountSelected={handlePlayerCountSelected}
        />
      )}

      {gameState === 'color-selection' && (
        <ColorSelection
          playerCount={playerCount}
          onColorsSelected={handleColorsSelected}
          onBack={handleBackToSetup}
        />
      )}

      {gameState === 'playing' && (
        <Scoreboard
          players={players}
          onReset={handleReset}
          onAddScore={handleAddScore}
          onUpdatePlayerName={handleUpdatePlayerName}
          onShowHistory={handleShowHistory}
        />
      )}

      {gameState === 'history' && (
        <GameHistory
          players={players}
          onBack={handleBackFromHistory}
        />
      )}
    </>
  )
}

export default App
