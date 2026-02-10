import { type TouchEvent, useRef, useState } from 'react'
import { type Player } from '../../types'
import { gameHistoryStyles as styles } from './styles'
import { buildHistoryRecords, getRecordDisplay } from './utils'
import { GameHistoryHeader } from './GameHistoryHeader'
import { GameHistoryRecordItem } from './GameHistoryRecordItem'

interface GameHistoryProps {
  players: Player[]
  onBack: () => void
  onDeleteLatest: () => void
}

export function GameHistory({ players, onBack, onDeleteLatest }: GameHistoryProps) {
  const [activeSwipeId, setActiveSwipeId] = useState<string | null>(null)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const records = buildHistoryRecords(players)
  const hasRecords = records.length > 0
  const latestRecordId = hasRecords ? records[0].id : null
  const swipeThreshold = 80

  const handleTouchStart = (recordId: string) => (event: TouchEvent<HTMLDivElement>) => {
    if (recordId !== latestRecordId) return
    touchStartX.current = event.touches[0]?.clientX ?? null
    setActiveSwipeId(recordId)
    setSwipeOffset(0)
  }

  const handleTouchMove = (recordId: string) => (event: TouchEvent<HTMLDivElement>) => {
    if (recordId !== latestRecordId) return
    if (touchStartX.current === null) return
    const currentX = event.touches[0]?.clientX ?? touchStartX.current
    setSwipeOffset(currentX - touchStartX.current)
  }

  const handleTouchEnd = (recordId: string) => () => {
    if (recordId !== latestRecordId) return
    const shouldDelete = Math.abs(swipeOffset) >= swipeThreshold
    setSwipeOffset(0)
    setActiveSwipeId(null)
    touchStartX.current = null
    if (shouldDelete) {
      onDeleteLatest()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <GameHistoryHeader title="記錄" onBack={onBack} />
        {hasRecords && (
          <div className={styles.hint}>左右滑動最新一筆可刪除</div>
        )}

        {records.length === 0 ? (
          <div className={styles.empty}>目前沒有任何得分記錄</div>
        ) : (
          <div className={styles.list}>
            {records.map((record) => {
              const date = new Date(record.timestamp)
              const hours = date.getHours().toString().padStart(2, '0')
              const minutes = date.getMinutes().toString().padStart(2, '0')
              const seconds = date.getSeconds().toString().padStart(2, '0')
              const timeString = `${hours}:${minutes}:${seconds}`

              const isLatest = record.id === latestRecordId
              const isActive = activeSwipeId === record.id
              const display = getRecordDisplay(record)

              return (
                <GameHistoryRecordItem
                  key={record.id}
                  record={record}
                  display={display}
                  timeString={timeString}
                  isLatest={isLatest}
                  isActive={isActive}
                  offsetX={swipeOffset}
                  swipeThreshold={swipeThreshold}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
