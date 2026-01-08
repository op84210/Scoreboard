import { useState } from 'react'
import { type Player, type ScoreType, SCORE_TYPE_LABELS, SCORE_TYPE_ICONS } from '../types'

// 玩家詳細組件屬性
interface PlayerDetailProps {
    player: Player
    onClose: () => void
    onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
}

// 玩家詳細組件
export function PlayerDetail({ player, onClose, onAddScore }: PlayerDetailProps) {
    
    // 選擇的得分類型與自定義分數輸入
    const [selectedScoreType, setSelectedScoreType] = useState<ScoreType>('castle')
    const [customScore, setCustomScore] = useState('')

    // 處理快速加分
    const handleQuickScore = (points: number) => {
        onAddScore(player.id, points, selectedScoreType)
    }

    // 處理自定義分數加分
    const handleCustomScore = () => {
        const points = parseInt(customScore)
        if (!isNaN(points) && points !== 0) {
            onAddScore(player.id, points, selectedScoreType)
            setCustomScore('')
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* 標題和關閉按鈕 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">{player.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 text-3xl leading-none w-10 h-10 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>

                {/* 總分顯示 */}
                <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-white mb-2">{player.score}</div>
                    <div className="text-gray-400">總分</div>
                </div>

                {/* 得分明細統計 */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="text-white font-bold mb-3 text-sm">得分明細</h3>
                    <div className="space-y-2">
                        {(Object.keys(player.scoreBreakdown) as ScoreType[]).map((type) => {
                            const score = player.scoreBreakdown[type]
                            const percentage = player.score > 0 ? (score / player.score) * 100 : 0

                            return (
                                <div key={type} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{SCORE_TYPE_ICONS[type]}</span>
                                        <span className="text-white text-sm">{SCORE_TYPE_LABELS[type]}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-white font-bold text-sm w-12 text-right">
                                            {score}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 選擇得分類型 */}
                <div className="mb-4">
                    <h3 className="text-white font-bold mb-2 text-sm">選擇得分類型</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {(Object.keys(SCORE_TYPE_LABELS) as ScoreType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedScoreType(type)}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg transition ${selectedScoreType === type
                                        ? 'bg-blue-600 ring-2 ring-white'
                                        : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                            >
                                <span className="text-2xl mb-1">{SCORE_TYPE_ICONS[type]}</span>
                                <span className="text-white text-xs">{SCORE_TYPE_LABELS[type]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 快速加分按鈕 */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {[1, 2, 3, 5, 10, -1, -2, -5].map((points) => (
                        <button
                            key={points}
                            onClick={() => handleQuickScore(points)}
                            className={`${points > 0
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700'
                                } text-white font-bold py-3 rounded-lg transition`}
                        >
                            {points > 0 ? '+' : ''}
                            {points}
                        </button>
                    ))}
                </div>

                {/* 自定義得分輸入 */}
                <div className="flex gap-2">
                    <input
                        type="number"
                        value={customScore}
                        onChange={(e) => setCustomScore(e.target.value)}
                        placeholder="輸入分數"
                        className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleCustomScore()
                            }
                        }}
                    />
                    <button
                        onClick={handleCustomScore}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
                    >
                        確定
                    </button>
                </div>
            </div>
        </div>
    )
}