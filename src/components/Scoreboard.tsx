import { useState, useCallback } from 'react'
import { type Player, type ScoreType } from '../types'
import { PlayerDetail } from './PlayerDetail'
import { ScoreInputModal } from './ScoreInputModal'
import { Bar } from 'react-chartjs-2'
import { PLAYER_COLORS } from '../constants/colors'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.defaults.font.size = 20

// 計分板元件屬性
interface ScoreboardProps {
    players: Player[]
    onReset: () => void
    onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
    onUpdatePlayerName: (playerId: number, newName: string) => void
    onShowHistory: () => void
}

export function Scoreboard({ players, onReset, onAddScore, onUpdatePlayerName, onShowHistory }: ScoreboardProps) {

    // 被選中的玩家 ID 狀態（用於查看明細）
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
    // 被選中的玩家 ID 狀態（用於輸入分數）
    const [inputPlayerId, setInputPlayerId] = useState<number | null>(null)
    // 控制是否顯示重設確認彈窗
    const [showResetConfirm, setShowResetConfirm] = useState(false)

    // 找出被選中的玩家（查看明細）
    const selectedPlayer = selectedPlayerId
        ? players.find((p) => p.id === selectedPlayerId) ?? null
        : null

    // 找出被選中的玩家（輸入分數）
    const inputPlayer = inputPlayerId
        ? players.find((p) => p.id === inputPlayerId) ?? null
        : null

    // 處理重設按鈕點擊
    const handleResetClick = useCallback(() => {
        setShowResetConfirm(true)
    }, [])

    // 確認重設遊戲
    const handleConfirmReset = useCallback(() => {
        setShowResetConfirm(false)
        onReset()
    }, [onReset])

    // 準備長條圖資料
    const chartData = {
        labels: players.map((p) => p.name),
        datasets: [
            {
                label: '總分',
                data: players.map((p) => p.score),
                backgroundColor: players.map((p) => PLAYER_COLORS[p.color] || 'rgb(107 114 128)'),
                borderColor: 'rgb(255 255 255)',
                borderWidth: 2,
            },
        ],
    }

    // 長條圖選項
    const chartOptions: ChartOptions<'bar'> = {
        indexAxis: 'y',  // 設定為水平排放
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '玩家分數對比',
                color: 'white',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                padding: 10,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    }

    return (
        <div className={`mx-auto space-y-2`}>
            <div className="flex justify-end items-center">
                <button
                    onClick={handleResetClick}
                    className="rounded-lg p-2 m-1 text-white bg-gray-600 text-2xl"
                    title="重設一局"
                >
                    ↻
                </button>
                <button
                    onClick={onShowHistory}
                    className="rounded-lg p-2 m-1 text-white bg-gray-600 text-2xl"
                    title="紀錄"
                >
                    📜
                </button>
            </div>

            {/* 長條圖 */}
            <div className="bg-gray-800 rounded-lg p-4">
                <div style={{ height: '250px' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* 玩家列表 */}
            <ul className="space-y-2">
                {players.map((p) => {
                    const colorClass = `btn-${p.color}`
                    return (
                        <div key={p.id} className="flex gap-2">
                            <button
                                onClick={() => setSelectedPlayerId(p.id)}
                                className={`flex-1 rounded-lg p-1 ${colorClass}`}
                                title="查看明細"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span>{p.name}</span>
                                    <span className="font-bold">{p.score}</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setInputPlayerId(p.id)}
                                className="rounded-lg p-3 bg-green-600 hover:bg-green-500 text-white text-xl transition"
                                title="輸入分數"
                            >
                                ➕
                            </button>
                        </div>
                    )
                })}
            </ul>

            {/* 玩家詳細彈窗 */}
            {selectedPlayer && (
                <PlayerDetail
                    player={selectedPlayer}
                    onClose={() => setSelectedPlayerId(null)}
                    onUpdatePlayerName={onUpdatePlayerName}
                />
            )}

            {/* 重設確認彈窗 */}
            {showResetConfirm && (
                <div className="fixed inset-0 bg-white/25 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg p-6 max-w-sm mx-4">
                        <h3 className="text-white text-lg font-bold mb-4">確認重設？</h3>
                        <p className="text-gray-300 mb-6">所有玩家的分數將被清除，此操作無法撤銷。</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleConfirmReset}
                                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                確認重設
                            </button>
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 分數輸入彈窗 */}
            {inputPlayer && (
                <ScoreInputModal
                    player={inputPlayer}
                    onClose={() => setInputPlayerId(null)}
                    onAddScore={onAddScore}
                />
            )}
        </div>
    )
}