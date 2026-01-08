import { Container } from './Container'

// 玩家設定組件屬性
interface PlayerSetupProps {
  onPlayerCountSelected: (count: number) => void
}

// 玩家設定組件
export function PlayerSetup({ onPlayerCountSelected }: PlayerSetupProps) {
  return (
    <Container>
      <h2>選擇玩家人數</h2>
      <div>
        {[2, 3, 4, 5].map((count) => (
          <button className="m-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
            key={count}
            onClick={() => onPlayerCountSelected(count)}
          >
            {count} 位玩家
          </button>
        ))}
      </div>
    </Container>
  )
}