import { useState } from 'react'

interface PlayerHeaderProps {
  playerName: string
  onClose: () => void
  onNameChange?: (newName: string) => void
}

export function PlayerHeader({ playerName, onClose, onNameChange }: PlayerHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(playerName)

  const handleSaveName = () => {
    const trimmedName = editName.trim()
    if (trimmedName !== '' && trimmedName !== playerName) {
      onNameChange?.(trimmedName)
    } else {
      // 如果為空或未變更，恢復原名
      setEditName(playerName)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      handleSaveName()
    }
    if (key === 'Escape') {
      setEditName(playerName)
      setIsEditing(false)
    }
  }

  return (
    <div className="flex justify-between items-center">
      {!isEditing ? (
        <h2
          onClick={() => setIsEditing(true)}
          className="text-2xl font-bold text-white cursor-pointer hover:text-gray-300 transition"
        >
          {playerName}
        </h2>
      ) : (
        <div className="flex gap-2 flex-1">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveName}
            className="w-24 bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            onKeyDown={(e) => handleKeyDown(e.key)}
          />
        </div>
      )}

      <button
        onClick={onClose}
        className="text-white hover:text-gray-300 text-3xl leading-none w-10 h-10 flex items-center justify-center"
      >
        ×
      </button>
    </div>
  )
}