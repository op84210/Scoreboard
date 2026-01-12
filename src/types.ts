// 得分類型
export type ScoreType = 'castle' | 'road' | 'monastery' | 'garden' | 'field'

// 得分細項
export interface ScoreBreakdown {
  castle: number
  road: number
  monastery: number
  garden: number
  field: number
}

// 得分紀錄
export interface ScoreRecord {
  id: string
  timestamp: number
  scoreType: ScoreType
  points: number
  description?: string
}

// 玩家顏色
export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow' | 'black'

// 玩家資料
export interface Player {
  id: number
  name: string
  score: number
  color: PlayerColor
  scoreBreakdown: ScoreBreakdown
  scoreHistory: ScoreRecord[]
}

// 遊戲狀態
export type GameState = 'setup' | 'color-selection' | 'playing'

// 得分類型標籤與圖示
export const SCORE_TYPE_LABELS: Record<ScoreType, string> = {
  castle: '城堡',
  road: '道路',
  monastery: '修道院',
  garden: '花圃',
  field: '草地',
}

// 得分類型圖示
export const SCORE_TYPE_ICONS: Record<ScoreType, string> = {
  castle: '🏰',
  road: '🛣️',
  monastery: '⛪',
  garden: '🌸',
  field: '🌾',
}
