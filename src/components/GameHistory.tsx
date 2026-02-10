import { type TouchEvent, useRef, useState } from 'react'
import clsx from 'clsx'
import { type Player, type ScoreRecord, BONUS_TYPE_ICONS, BONUS_TYPE_LABELS, SCORE_TYPE_LABELS, SCORE_TYPE_ICONS } from '../types'
import { PLAYER_COLORS } from '../constants/colors'
import { buttonStyles, cardStyles, layoutStyles, pageStyles, textStyles } from './styles'

const styles = {
    container: pageStyles.container,
    content: pageStyles.content,
    header: layoutStyles.rowBetween,
    title: textStyles.titleLg,
    actions: 'flex items-center gap-2',
    backButton: buttonStyles.closeIcon,
    hint: textStyles.mutedSm,
    empty: clsx('text-center py-8', textStyles.muted),
    list: layoutStyles.listY2,
    recordItem: clsx(cardStyles.listItem, layoutStyles.rowBetween, 'transition-transform relative'),
    recordItemLatest: 'touch-pan-y',
    infoRow: layoutStyles.rowGap2,
    playerName: 'text-white font-semibold',
    time: textStyles.labelSm,
    scoreInfo: 'text-right',
    scoreLabel: textStyles.labelSm,
    scoreDesc: textStyles.mutedSm,
    scoreValue: textStyles.valueLg,
    scorePositive: textStyles.statusPositive,
    scoreNegative: textStyles.statusNegative,
    swipeOverlay: 'absolute inset-0 rounded-lg pointer-events-none',
    swipeHint: clsx('absolute right-3 text-xs', textStyles.statusDangerHint),
}

interface GameHistoryProps {
    players: Player[]
    onBack: () => void
    onDeleteLatest: () => void
}

export function GameHistory({ players, onBack, onDeleteLatest }: GameHistoryProps) {
    const [activeSwipeId, setActiveSwipeId] = useState<string | null>(null)
    const [swipeOffset, setSwipeOffset] = useState(0)
    const touchStartX = useRef<number | null>(null)

    const getRecordDisplay = (record: ScoreRecord) => {
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

    // 將所有玩家的記錄合併並按時間排序
    const allRecords: Array<ScoreRecord & { playerId: number; playerName: string; playerColor: string }> = []

    players.forEach(player => {
        player.scoreHistory.forEach(record => {
            allRecords.push({
                ...record,
                playerId: player.id,
                playerName: player.name,
                playerColor: PLAYER_COLORS[player.color],
            })
        })
    })

    // 按時間倒序排列（最新的在最上面）
    allRecords.sort((a, b) => b.timestamp - a.timestamp)
    const hasRecords = allRecords.length > 0
    const latestRecordId = hasRecords ? allRecords[0].id : null
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
                {/* 標題列 */}
                <div className={styles.header}>
                    <h2 className={styles.title}>記錄</h2>
                    <div className={styles.actions}>
                        <button
                            onClick={onBack}
                            className={styles.backButton}
                        >
                            ×
                        </button>
                    </div>
                </div>
                {hasRecords && (
                    <div className={styles.hint}>左右滑動最新一筆可刪除</div>
                )}

                {/* 記錄列表 */}
                {allRecords.length === 0 ? (
                    <div className={styles.empty}>
                        目前沒有任何得分記錄
                    </div>
                ) : (
                    <div className={styles.list}>
                        {allRecords.map((record) => {
                            const date = new Date(record.timestamp)
                            const display = getRecordDisplay(record)

                            // 格式化時間為 HH:MM:SS
                            const hours = date.getHours().toString().padStart(2, '0')
                            const minutes = date.getMinutes().toString().padStart(2, '0')
                            const seconds = date.getSeconds().toString().padStart(2, '0')
                            const timeString = `${hours}:${minutes}:${seconds}`

                            const isLatest = record.id === latestRecordId
                            const isActive = activeSwipeId === record.id
                            const offsetX = isActive ? swipeOffset : 0

                            return (
                                <div
                                    key={record.id}
                                    className={clsx(styles.recordItem, isLatest && styles.recordItemLatest)}
                                    // 邊框顏色使用玩家顏色
                                    style={{
                                        borderLeft: `15px solid ${record.playerColor}`,
                                        transform: `translateX(${offsetX}px)`,
                                    }}
                                    onTouchStart={handleTouchStart(record.id)}
                                    onTouchMove={handleTouchMove(record.id)}
                                    onTouchEnd={handleTouchEnd(record.id)}
                                    onTouchCancel={handleTouchEnd(record.id)}
                                    aria-label={isLatest ? '滑動刪除最新記錄' : undefined}
                                >
                                    <div
                                        className={styles.swipeOverlay}
                                        style={{ background: 'transparent' }}
                                    />
                                    {/* 左側：玩家信息 */}
                                    <div className={styles.infoRow}>
                                        <div>
                                            <div className={styles.playerName}>
                                                {record.playerName}
                                            </div>
                                            <div className={styles.time}>
                                                {timeString}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 右側：得分信息 */}
                                    <div className={styles.scoreInfo}>
                                        <div className={styles.scoreLabel}>
                                            {display.label}
                                        </div>
                                        {record.description ? (
                                            <div className={styles.scoreDesc}>
                                                {record.description}
                                            </div>
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
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}