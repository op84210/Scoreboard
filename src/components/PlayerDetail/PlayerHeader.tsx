import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { buttonStyles, layoutStyles, textStyles } from '../styles'

const styles = {
  container: layoutStyles.rowBetween,
  nameBlock: 'flex flex-col items-start',
  nameTitle: 'cursor-pointer hover:text-gray-300 transition flex items-center gap-2',
  nameIcon: 'text-base',
  editRow: 'flex gap-2 flex-1',
  editInput: 'w-24 bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
  closeButton: buttonStyles.closeIcon,
}

interface PlayerHeaderProps {
  playerName: string
  onClose: () => void
  onNameChange?: (newName: string) => void
}

export function PlayerHeader({ playerName, onClose, onNameChange }: PlayerHeaderProps) {

  // 編輯名稱狀態
  const [isEditing, setIsEditing] = useState(false)

  // 編輯中的名稱狀態
  const [editName, setEditName] = useState(playerName)

  // 處理儲存名稱變更
  const handleSaveName = useCallback(() => {
    const trimmedName = editName.trim()
    if (trimmedName !== '' && trimmedName !== playerName) {
      onNameChange?.(trimmedName)
    } else {
      // 如果為空或未變更，恢復原名
      setEditName(playerName)
    }
    setIsEditing(false)
  }, [editName, onNameChange, playerName])

  // 處理鍵盤事件
  const handleKeyDown = useCallback((key: string) => {
    if (key === 'Enter') {
      handleSaveName()
    }
    if (key === 'Escape') {
      setEditName(playerName)
      setIsEditing(false)
    }
  }, [handleSaveName, playerName])

  return (
    <div className={styles.container}>
      {!isEditing ? (
        <div className={styles.nameBlock}>
          <h2
            onClick={() => setIsEditing(true)}
            className={clsx(textStyles.titleLg, styles.nameTitle)}
            title="點擊修改玩家名稱"
          >
            {playerName}
            <span className={styles.nameIcon}>✏️</span>
          </h2>
        </div>
      ) : (
        <div className={styles.editRow}>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveName}
            className={styles.editInput}
            autoFocus
            onKeyDown={(e) => handleKeyDown(e.key)}
          />
        </div>
      )}

      <button
        onClick={onClose}
        className={styles.closeButton}
      >
        ×
      </button>
    </div>
  )
}