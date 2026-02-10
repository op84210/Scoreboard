import { type TouchEvent } from 'react'
import clsx from 'clsx'
import { type HistoryRecord, type RecordDisplay } from './utils'
import { gameHistoryStyles as styles } from './styles'

interface GameHistoryRecordItemProps {
  record: HistoryRecord
  display: RecordDisplay
  timeString: string
  isLatest: boolean
  isActive: boolean
  offsetX: number
  swipeThreshold: number
  onTouchStart: (recordId: string) => (event: TouchEvent<HTMLDivElement>) => void
  onTouchMove: (recordId: string) => (event: TouchEvent<HTMLDivElement>) => void
  onTouchEnd: (recordId: string) => () => void
}

export function GameHistoryRecordItem({
  record,
  display,
  timeString,
  isLatest,
  isActive,
  offsetX,
  swipeThreshold,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: GameHistoryRecordItemProps) {
  return (
    <div
      className={clsx(styles.recordItem, isLatest && styles.recordItemLatest)}
      style={{
        borderLeft: `15px solid ${record.playerColor}`,
        transform: `translateX(${isActive ? offsetX : 0}px)`,
      }}
      onTouchStart={onTouchStart(record.id)}
      onTouchMove={onTouchMove(record.id)}
      onTouchEnd={onTouchEnd(record.id)}
      onTouchCancel={onTouchEnd(record.id)}
      aria-label={isLatest ? '滑動刪除最新記錄' : undefined}
    >
      <div className={styles.swipeOverlay} style={{ background: 'transparent' }} />
      <div className={styles.infoRow}>
        <div>
          <div className={styles.playerName}>{record.playerName}</div>
          <div className={styles.time}>{timeString}</div>
        </div>
      </div>

      <div className={styles.scoreInfo}>
        <div className={styles.scoreLabel}>{display.label}</div>
        {record.description ? (
          <div className={styles.scoreDesc}>{record.description}</div>
        ) : (
          <div
            className={clsx(
              styles.scoreValue,
              record.points > 0 ? styles.scorePositive : styles.scoreNegative,
            )}
          >
            {display.icon}
            {record.points > 0 ? '+' : ''}{record.points}
          </div>
        )}
      </div>

      {isLatest && (
        <div
          className={styles.swipeHint}
          style={{ opacity: Math.min(Math.abs(offsetX) / swipeThreshold, 1) }}
        >
          刪除
        </div>
      )}
    </div>
  )
}
