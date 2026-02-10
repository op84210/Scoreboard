import { type Player, type ScoreRecord, BONUS_TYPE_ICONS, BONUS_TYPE_LABELS, SCORE_TYPE_LABELS, SCORE_TYPE_ICONS } from '../types'
import { PLAYER_COLORS } from '../constants/colors'

interface GameHistoryProps {
    players: Player[]
    onBack: () => void
}

export function GameHistory({ players, onBack }: GameHistoryProps) {
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

    return (
        <div className="min-h-screen bg-gray-900 p-4 rounded-lg">
            <div className="max-w-2xl mx-auto">
                {/* 標題列 */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">得分記錄</h2>
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                    >
                        返回
                    </button>
                </div>

                {/* 記錄列表 */}
                {allRecords.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                        目前沒有任何得分記錄
                    </div>
                ) : (
                    <div className="space-y-2">
                        {allRecords.map((record) => {
                            const date = new Date(record.timestamp)
                            const display = getRecordDisplay(record)

                            // 格式化時間為 HH:MM:SS
                            const hours = date.getHours().toString().padStart(2, '0')
                            const minutes = date.getMinutes().toString().padStart(2, '0')
                            const seconds = date.getSeconds().toString().padStart(2, '0')
                            const timeString = `${hours}:${minutes}:${seconds}`

                            return (
                                <div
                                    key={record.id}
                                    className="bg-gray-800 rounded-lg p-2 flex items-center justify-between"
                                    // 邊框顏色使用玩家顏色
                                    style={{ borderLeft: `15px solid ${record.playerColor}` }}
                                >
                                    {/* 左側：玩家信息 */}
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-white font-semibold">
                                                {record.playerName}
                                            </div>
                                            <div className="text-white text-sm">
                                                {timeString}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 右側：得分信息 */}
                                    <div className="text-right">
                                        <div className="text-white text-sm">
                                            {display.label}
                                        </div>
                                        {record.description && (
                                            <div className="text-gray-300 text-xs">
                                                {record.description}
                                            </div>
                                        )}
                                        <div
                                            className={`font-bold text-lg ${record.points > 0 ? 'text-green-400' : 'text-red-400'
                                                }`}
                                        >
                                            {display.icon}
                                            {record.points > 0 ? '+' : ''}{record.points}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}