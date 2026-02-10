import { type Player, type ScoreRecord, BONUS_TYPE_ICONS, BONUS_TYPE_LABELS, SCORE_TYPE_ICONS, SCORE_TYPE_LABELS } from '../../types'
import { PLAYER_COLORS } from '../../constants/colors'

export type HistoryRecord = ScoreRecord & {
  playerId: number
  playerName: string
  playerColor: string
}

export type RecordDisplay = {
  label: string
  icon: string
}

// 刪除記錄的滑動閾值（像素）
export const SWIPE_DELETE_THRESHOLD = 80

// 建立歷史記錄列表，將所有玩家的得分紀錄合併並排序
export const buildHistoryRecords = (players: Player[]): HistoryRecord[] => {
  const records: HistoryRecord[] = []

  players.forEach((player) => {
    player.scoreHistory.forEach((record) => {
      records.push({
        ...record,
        playerId: player.id,
        playerName: player.name,
        playerColor: PLAYER_COLORS[player.color],
      })
    })
  })

  records.sort((a, b) => b.timestamp - a.timestamp)
  return records
}

// 根據得分紀錄類型返回對應的顯示資訊（標籤和圖示）
export const getRecordDisplay = (record: ScoreRecord): RecordDisplay => {
  if (record.recordType === 'score') {
    return {
      label: SCORE_TYPE_LABELS[record.scoreType],
      icon: SCORE_TYPE_ICONS[record.scoreType],
    }
  }

  return {
    label: BONUS_TYPE_LABELS[record.bonusType],
    icon: BONUS_TYPE_ICONS[record.bonusType],
  }
}
