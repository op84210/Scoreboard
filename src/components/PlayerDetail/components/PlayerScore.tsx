import clsx from 'clsx'
import { textStyles } from '../../styles'

const styles = {
  container: 'flex flex-row justify-center items-end text-center my-3',
}

interface PlayerScoreProps {
  score: number
}

// 玩家分數顯示元件，顯示玩家的總分
export function PlayerScore({ score }: PlayerScoreProps) {
  return (
    <div className={clsx(styles.container)}>
      <div className={textStyles.scoreLg}>{score}</div>
      <div className={textStyles.muted}>總分</div>
    </div>
  )
}
