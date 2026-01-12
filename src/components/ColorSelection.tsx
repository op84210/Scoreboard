import { useState, useCallback } from 'react'
import { type PlayerColor } from '../types'
import { PLAYER_COLORS } from '../constants/colors'

// 顏色選擇元件屬性
interface ColorSelectionProps {
    playerCount: number
    onColorsSelected: (colors: PlayerColor[]) => void
    onBack: () => void
}

export function ColorSelection({ playerCount, onColorsSelected, onBack }: ColorSelectionProps) {
    // 可選顏色列表
    const availableColors = Object.entries(PLAYER_COLORS).map(([key]) => key as PlayerColor)
    
    // 已選擇的顏色狀態
    const [selectedColors, setSelectedColors] = useState<PlayerColor[]>([])

    // 處理顏色選擇
    const handleColorSelect = useCallback((color: PlayerColor) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(c => c !== color))
        } else if (selectedColors.length < playerCount) {
            setSelectedColors([...selectedColors, color])
        }
    }, [selectedColors, playerCount])

    // 是否已完成顏色選擇
    const isComplete = selectedColors.length === playerCount

    return (
        <div className={`flex flex-col justify-center min-h-screen mx-auto text-center`}>
            <h2>選擇玩家顏色</h2>
            <p>
                請為 {playerCount} 位玩家選擇顏色
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {availableColors.map((color) => (
                    <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`p-4 rounded-lg font-semibold transition-all ${selectedColors.includes(color)
                                ? 'ring-4 ring-offset-2 ring-gray-400 scale-105'
                                : 'opacity-70 hover:opacity-100'
                            }`}
                        style={{
                            backgroundColor: PLAYER_COLORS[color],
                        }}
                    >
                        {selectedColors.includes(color) && (
                            <span className="text-white drop-shadow">✓</span>
                        )}
                    </button>
                ))}
            </div>

            <div>
                已選擇: {selectedColors.length} / {playerCount}
            </div>

            <button
                onClick={() => onColorsSelected(selectedColors)}
                disabled={!isComplete}
                className="m-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                開始遊戲
            </button>
            <button
                onClick={onBack}
                className="m-2 rounded-lg bg-gray-600 px-4 py-2 text-white"
            >
                返回
            </button>
        </div>
    )
}