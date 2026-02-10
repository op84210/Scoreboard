import clsx from 'clsx'
import { buttonStyles, layoutStyles } from './styles'

const styles = {
  container: layoutStyles.centerPage,
  button: 'm-2',
}

// 玩家設定組件屬性
interface PlayerSetupProps {
  onPlayerCountSelected: (count: number) => void
}

// 玩家設定組件
export function PlayerSetup({ onPlayerCountSelected }: PlayerSetupProps) {
  return (
    <div className={styles.container}>
      <h2>選擇玩家人數</h2>
      <div>
        {[2, 3, 4, 5, 6].map((count) => (
          <button
            className={clsx(buttonStyles.primary, styles.button)}
            key={count}
            onClick={() => onPlayerCountSelected(count)}
          >
            {count} 位玩家
          </button>
        ))}
      </div>
    </div>
  )
}