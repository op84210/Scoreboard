import type { PlayerColor } from "./constants/colors"

export type { PlayerColor }

// 得分類型
export type ScoreType = 'castle' | 'road' | 'monastery' | 'garden' | 'field'

// 獎勵類型
export type BonusType = 'barrel' | 'wheat' | 'cloth'

// 得分細項
export interface ScoreBreakdown {
  castle: number
  road: number
  monastery: number
  garden: number
  field: number
}

// 獎勵細項
export interface BonusBreakdown {
  barrel: number
  wheat: number
  cloth: number
}

// 得分紀錄
type ScoreRecordBase = {
  id: string
  timestamp: number
  points: number
  description?: string
}

export type ScoreRecord =
  | (ScoreRecordBase & {
      recordType: 'score'
      scoreType: ScoreType
    })
  | (ScoreRecordBase & {
      recordType: 'bonus'
      bonusType: BonusType
    })
  | (ScoreRecordBase & {
      recordType: 'endgame'
      bonusType: BonusType
    })


// 玩家資料
export interface Player {
  id: number
  name: string
  score: number
  color: PlayerColor
  scoreBreakdown: ScoreBreakdown
  bonusBreakdown: BonusBreakdown
  endgameBonus: number
  scoreHistory: ScoreRecord[]
}

// 遊戲狀態
export type GameState = 'setup' | 'color-selection' | 'playing' | 'history'

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
  field: '🟩',
}

// 獎勵類型標籤與圖示
export const BONUS_TYPE_LABELS: Record<BonusType, string> = {
  barrel: '酒桶',
  wheat: '麥穗',
  cloth: '布匹',
}

export const BONUS_TYPE_ICONS: Record<BonusType, string> = {
  barrel: '🍷',
  wheat: '🌾',
  cloth: '👗',
}
