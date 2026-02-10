interface PlayerScoreProps {
  score: number
}

export function PlayerScore({ score }: PlayerScoreProps) {
  return (
    <div className="flex flex-row justify-center items-end text-center my-3">
      <div className="text-5xl font-bold text-white">{score}</div>
      <div className="text-gray-400">總分</div>
    </div>
  )
}