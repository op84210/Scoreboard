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
