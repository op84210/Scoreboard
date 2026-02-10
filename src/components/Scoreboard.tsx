import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { type BonusType, type Player, type ScoreType } from '../types'
import { PlayerDetail } from './PlayerDetail'
import { ScoreInputModal } from './ScoreInputModal'
import { Bar } from 'react-chartjs-2'
import { PLAYER_COLORS } from '../constants/colors'
import { buttonStyles, cardStyles, layoutStyles, modalStyles, textStyles } from './styles'
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

const styles = {
    container: 'mx-auto space-y-2',
    topBar: layoutStyles.rowEnd,
    iconButton: buttonStyles.iconBase,
    iconButtonGray: buttonStyles.iconGray,
    iconButtonAmber: buttonStyles.iconAmber,
    iconButtonDisabled: buttonStyles.iconDisabled,
    chartCard: cardStyles.sectionMd,
    playerList: layoutStyles.listY2,
    playerRow: layoutStyles.rowGap2,
    playerButton: 'flex-1 rounded-lg p-3',
    playerScoreRow: layoutStyles.rowBetween,
    playerScoreValue: textStyles.bold,
    addScoreButton: buttonStyles.addScore,
    modalPrimaryRed: modalStyles.primaryRed,
    modalPrimaryAmber: modalStyles.primaryAmber,
    modalSecondary: modalStyles.secondary,
}

// 計分板元件屬性
interface ScoreboardProps {
    players: Player[]
    onReset: () => void
    onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
    onAddBonus: (playerId: number, points: number, bonusType: BonusType) => void
    onUpdatePlayerName: (playerId: number, newName: string) => void
    onShowHistory: () => void
    onApplyEndgameBonus: () => void
    endgameApplied: boolean
}

export function Scoreboard({ players, onReset, onAddScore, onAddBonus, onUpdatePlayerName, onShowHistory, onApplyEndgameBonus, endgameApplied }: ScoreboardProps) {

    // 被選中的玩家 ID 狀態（用於查看明細）
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
    // 被選中的玩家 ID 狀態（用於輸入分數）
    const [inputPlayerId, setInputPlayerId] = useState<number | null>(null)
    // 控制是否顯示重設確認彈窗
    const [showResetConfirm, setShowResetConfirm] = useState(false)
    // 控制是否顯示終局結算確認彈窗
    const [showEndgameConfirm, setShowEndgameConfirm] = useState(false)

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

    // 開啟終局結算確認
    const handleEndgameClick = useCallback(() => {
        if (endgameApplied) return
        setShowEndgameConfirm(true)
    }, [endgameApplied])

    // 確認終局結算
    const handleConfirmEndgame = useCallback(() => {
        setShowEndgameConfirm(false)
        onApplyEndgameBonus()
    }, [onApplyEndgameBonus])

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
        <div className={styles.container}>
            <div className={styles.topBar}>
                <button
                    onClick={handleResetClick}
                    className={clsx(styles.iconButton, styles.iconButtonGray)}
                    title="重設一局"
                >
                    ↻
                </button>
                <button
                    onClick={handleEndgameClick}
                    className={clsx(
                        styles.iconButton,
                        endgameApplied ? styles.iconButtonDisabled : styles.iconButtonAmber,
                    )}
                    title={endgameApplied ? '已結算終局' : '終局結算'}
                    disabled={endgameApplied}
                >
                    🏁
                </button>
                <button
                    onClick={onShowHistory}
                    className={clsx(styles.iconButton, styles.iconButtonGray)}
                    title="紀錄"
                >
                    📜
                </button>
            </div>

            {/* 長條圖 */}
            <div className={styles.chartCard}>
                <div style={{ height: '250px' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* 玩家列表 */}
            <ul className={styles.playerList}>
                {players.map((p) => {
                    const colorClass = `btn-${p.color}`
                    return (
                        <div key={p.id} className={styles.playerRow}>
                            <button
                                onClick={() => setSelectedPlayerId(p.id)}
                                className={clsx(styles.playerButton, colorClass)}
                                title="查看明細"
                            >
                                <div className={styles.playerScoreRow}>
                                    <span>{p.name}</span>
                                    <span className={styles.playerScoreValue}>{p.score}</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setInputPlayerId(p.id)}
                                className={styles.addScoreButton}
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
                <div className={modalStyles.overlay}>
                    <div className={modalStyles.modal}>
                        <h3 className={modalStyles.title}>確認重設？</h3>
                        <p className={modalStyles.body}>所有玩家的分數將被清除，此操作無法撤銷。</p>
                        <div className={modalStyles.actions}>
                            <button
                                onClick={handleConfirmReset}
                                className={styles.modalPrimaryRed}
                            >
                                確認重設
                            </button>
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className={styles.modalSecondary}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 終局結算確認彈窗 */}
            {showEndgameConfirm && (
                <div className={modalStyles.overlay}>
                    <div className={modalStyles.modal}>
                        <h3 className={modalStyles.title}>確認終局結算？</h3>
                        <p className={modalStyles.body}>將為酒桶、麥穗、布匹最高者加 10 分，此操作無法撤銷。</p>
                        <div className={modalStyles.actions}>
                            <button
                                onClick={handleConfirmEndgame}
                                className={styles.modalPrimaryAmber}
                            >
                                確認結算
                            </button>
                            <button
                                onClick={() => setShowEndgameConfirm(false)}
                                className={styles.modalSecondary}
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
                    onAddBonus={onAddBonus}
                />
            )}
        </div>
    )
}