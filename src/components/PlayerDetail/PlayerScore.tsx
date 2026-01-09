interface PlayerScoreProps {
  score: number
}

export function PlayerScore({ score }: PlayerScoreProps) {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-white">{score}</div>
      <div className="text-gray-400">總分</div>
    </div>
  )
}