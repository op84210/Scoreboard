import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { type PlayerColor } from '../types'
import { PLAYER_COLORS } from '../constants/colors'
import { buttonStyles, layoutStyles } from './styles'

const styles = {
    container: layoutStyles.centerPage,
    grid: layoutStyles.grid2Gap4,
    colorButton: 'p-4 rounded-lg font-semibold transition-all',
    colorButtonSelected: 'ring-4 ring-offset-2 ring-gray-400 scale-105',
    colorButtonUnselected: 'opacity-70 hover:opacity-100',
    checkmark: 'text-white drop-shadow',
    buttonMargin: 'm-2',
}

// 顏色選擇元件屬性
interface ColorSelectionProps {
    playerCount: number
    onColorsSelected: (colors: PlayerColor[]) => void
    onBack: () => void
}

// 顏色選擇元件，允許用戶為每位玩家選擇一種顏色，並在完成後開始遊戲或返回上一步
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
        <div className={styles.container}>
            <h2>選擇玩家顏色</h2>
            <p>
                請為 {playerCount} 位玩家選擇顏色
            </p>

            <div className={styles.grid}>
                {availableColors.map((color) => (
                    <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={clsx(
                            styles.colorButton,
                            selectedColors.includes(color)
                                ? styles.colorButtonSelected
                                : styles.colorButtonUnselected,
                        )}
                        style={{
                            backgroundColor: PLAYER_COLORS[color],
                        }}
                    >
                        {selectedColors.includes(color) && (
                            <span className={styles.checkmark}>✓</span>
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
                className={clsx(buttonStyles.primary, styles.buttonMargin)}
            >
                開始遊戲
            </button>
            <button
                onClick={onBack}
                className={clsx(buttonStyles.secondary, styles.buttonMargin)}
            >
                返回
            </button>
        </div>
    )
}