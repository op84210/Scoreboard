interface PlayerScoreProps {
  score: number
}

export function PlayerScore({ score }: PlayerScoreProps) {
  return (
    <div className="text-center mb-6">
      <div className="text-5xl font-bold text-white mb-2">{score}</div>
      <div className="text-gray-400">總分</div>
    </div>
  )
}