interface PlayerHeaderProps {
  playerName: string
  onClose: () => void
}

export function PlayerHeader({ playerName, onClose }: PlayerHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white">{playerName}</h2>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-300 text-3xl leading-none w-10 h-10 flex items-center justify-center"
      >
        ×
      </button>
    </div>
  )
}