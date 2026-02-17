import { useState, useCallback, useEffect } from 'react'
import './App.css'
import { type BonusBreakdown, type BonusType, type Player, type GameState, type ScoreBreakdown, type ScoreRecord, type ScoreType } from './types'
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
  endgameApplied: boolean
}

const normalizeScoreBreakdown = (breakdown?: Partial<ScoreBreakdown>): ScoreBreakdown => ({
  castle: breakdown?.castle ?? 0,
  road: breakdown?.road ?? 0,
  monastery: breakdown?.monastery ?? 0,
  garden: breakdown?.garden ?? 0,
  field: breakdown?.field ?? 0,
})

const normalizeBonusBreakdown = (breakdown?: Partial<BonusBreakdown>): BonusBreakdown => ({
  barrel: breakdown?.barrel ?? 0,
  wheat: breakdown?.wheat ?? 0,
  cloth: breakdown?.cloth ?? 0,
})

const calculateTotalScore = (breakdown: ScoreBreakdown, endgameBonus: number): number =>
  Object.values(breakdown).reduce((sum, s) => sum + s, 0) + endgameBonus

const findLatestRecord = (players: Player[]): { playerId: number; record: ScoreRecord } | null => {
  let latest: { playerId: number; record: ScoreRecord } | null = null

  for (const player of players) {
    for (const record of player.scoreHistory) {
      if (!latest || record.timestamp >= latest.record.timestamp) {
        latest = { playerId: player.id, record }
      }
    }
  }

  return latest
}

const loadStoredState = (): StoredState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredState
    if (!parsed || !Array.isArray(parsed.players)) return null
    return {
      ...parsed,
      endgameApplied: parsed.endgameApplied ?? false,
      players: parsed.players.map((player) => ({
        ...player,
        scoreBreakdown: normalizeScoreBreakdown(player.scoreBreakdown),
        bonusBreakdown: normalizeBonusBreakdown(player.bonusBreakdown),
        endgameBonus: player.endgameBonus ?? 0,
        score: calculateTotalScore(
          normalizeScoreBreakdown(player.scoreBreakdown),
          player.endgameBonus ?? 0,
        ),
        scoreHistory: (Array.isArray(player.scoreHistory) ? player.scoreHistory : []).map((record) => {
          if (record && typeof record === 'object' && 'recordType' in record) {
            return record as ScoreRecord
          }

          return {
            ...(record as Omit<ScoreRecord, 'recordType'>),
            recordType: 'score',
          } as ScoreRecord
        }),
      })),
    }
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
  const [endgameApplied, setEndgameApplied] = useState(storedState?.endgameApplied ?? false)

  // 建立空的得分類別
  const createEmptyBreakdown = (): ScoreBreakdown => ({
    ...normalizeScoreBreakdown(),
  })

  const createEmptyBonusBreakdown = (): BonusBreakdown => ({
    ...normalizeBonusBreakdown(),
  })

  // 建立新玩家資料
  const createNewPlayer = (id: number, color: PlayerColor): Player => ({
    id,
    name: `玩家 ${id}`,
    score: 0,
    color,
    scoreBreakdown: createEmptyBreakdown(),
    bonusBreakdown: createEmptyBonusBreakdown(),
    endgameBonus: 0,
    scoreHistory: [] as ScoreRecord[],
  })

  // 處理玩家人數選擇
  const handlePlayerCountSelected = useCallback((count: number) => {
    setPlayerCount(count)// 設定玩家人數
    setEndgameApplied(false)

    // 如果選擇 6 人，直接使用所有顏色並進入遊戲
    if (count === 6) {
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
    setEndgameApplied(false)
  }, [createNewPlayer])

  // 處理重設遊戲
  const handleReset = useCallback(() => {
    setGameState('setup')
    setPlayerCount(0)
    setPlayers([])
    setEndgameApplied(false)
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
          recordType: 'score',
          scoreType,
          points,
        }

        // 更新得分明細
        const newBreakdown = {
          ...player.scoreBreakdown,
          [scoreType]: Math.max(0, player.scoreBreakdown[scoreType] + points),
        }

        // 計算新總分
        const newScore = calculateTotalScore(newBreakdown, player.endgameBonus)

        return {
          ...player,
          score: newScore,
          scoreBreakdown: newBreakdown,
          scoreHistory: [...player.scoreHistory, newRecord],
        }
      }),
    )
  }, [])

  // 處理新增獎勵點數
  const handleAddBonus = useCallback((playerId: number, points: number, bonusType: BonusType) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id !== playerId) return player

        const newRecord: ScoreRecord = {
          id: `${Date.now()}-${Math.random()}`,
          timestamp: Date.now(),
          recordType: 'bonus',
          bonusType,
          points,
        }

        const newBonusBreakdown = {
          ...player.bonusBreakdown,
          [bonusType]: Math.max(0, player.bonusBreakdown[bonusType] + points),
        }

        return {
          ...player,
          bonusBreakdown: newBonusBreakdown,
          scoreHistory: [...player.scoreHistory, newRecord],
        }
      }),
    )
  }, [])

  // 刪除最新得分紀錄
  const handleDeleteLatestRecord = useCallback(() => {
    let nextEndgameApplied = false

    setPlayers((prevPlayers) => {
      const latest = findLatestRecord(prevPlayers)

      if (!latest) {
        nextEndgameApplied = prevPlayers.some((player) =>
          player.scoreHistory.some((record) => record.recordType === 'endgame'),
        )
        return prevPlayers
      }

      const { playerId, record } = latest

      const nextPlayers = prevPlayers.map((player) => {
        if (player.id !== playerId) return player

        const nextHistory = player.scoreHistory.filter((item) => item.id !== record.id)
        let nextScoreBreakdown = player.scoreBreakdown
        let nextBonusBreakdown = player.bonusBreakdown
        let nextEndgameBonus = player.endgameBonus

        if (record.recordType === 'score') {
          nextScoreBreakdown = {
            ...player.scoreBreakdown,
            [record.scoreType]: Math.max(0, player.scoreBreakdown[record.scoreType] - record.points),
          }
        } else if (record.recordType === 'bonus') {
          nextBonusBreakdown = {
            ...player.bonusBreakdown,
            [record.bonusType]: Math.max(0, player.bonusBreakdown[record.bonusType] - record.points),
          }
        } else {
          nextEndgameBonus = Math.max(0, player.endgameBonus - record.points)
        }

        const newScore = calculateTotalScore(nextScoreBreakdown, nextEndgameBonus)

        return {
          ...player,
          score: newScore,
          scoreBreakdown: nextScoreBreakdown,
          bonusBreakdown: nextBonusBreakdown,
          endgameBonus: nextEndgameBonus,
          scoreHistory: nextHistory,
        }
      })

      nextEndgameApplied = nextPlayers.some((player) =>
        player.scoreHistory.some((record) => record.recordType === 'endgame'),
      )

      return nextPlayers
    })

    setEndgameApplied(nextEndgameApplied)
  }, [])

  // 終局結算：桶子、小麥、絲巾各自最高者 +10
  const handleApplyEndgameBonus = useCallback(() => {
    if (endgameApplied) return

    const endgameTypes: BonusType[] = ['barrel', 'wheat', 'cloth']
    const now = Date.now()

    setPlayers((prevPlayers) => {
      const maxByType = endgameTypes.reduce<Record<BonusType, number>>((acc, type) => {
        const maxValue = Math.max(...prevPlayers.map((p) => p.bonusBreakdown[type] ?? 0))
        acc[type] = maxValue
        return acc
      }, {} as Record<BonusType, number>)

      return prevPlayers.map((player) => {
        let nextEndgameBonus = player.endgameBonus
        let nextHistory = [...player.scoreHistory]
        let bonusApplied = false

        endgameTypes.forEach((type) => {
          const maxValue = maxByType[type]
          if (maxValue <= 0) return
          if (player.bonusBreakdown[type] === maxValue) {
            nextEndgameBonus += 10
            nextHistory.push({
              id: `${now}-${Math.random()}`,
              timestamp: now,
              recordType: 'endgame',
              bonusType: type,
              points: 10,
              description: '終局最高 +10',
            })
            bonusApplied = true
          }
        })

        if (!bonusApplied) return player

        const newScore = calculateTotalScore(player.scoreBreakdown, nextEndgameBonus)

        return {
          ...player,
          score: newScore,
          endgameBonus: nextEndgameBonus,
          scoreHistory: nextHistory,
        }
      })
    })

    setEndgameApplied(true)
  }, [endgameApplied])

  // 處理返回設置頁面
  const handleBackToSetup = useCallback(() => {
    setGameState('setup')
    setPlayerCount(0)
    setEndgameApplied(false)
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
      endgameApplied,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  }, [gameState, players, playerCount, endgameApplied])

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
          onAddBonus={handleAddBonus}
          onUpdatePlayerName={handleUpdatePlayerName}
          onShowHistory={handleShowHistory}
          onApplyEndgameBonus={handleApplyEndgameBonus}
          endgameApplied={endgameApplied}
        />
      )}

      {gameState === 'history' && (
        <GameHistory
          players={players}
          onBack={handleBackFromHistory}
          onDeleteLatest={handleDeleteLatestRecord}
        />
      )}
    </>
  )
}

export default App
