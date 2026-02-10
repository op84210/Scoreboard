import clsx from 'clsx'
import { textStyles } from '../styles'

const styles = {
  container: 'flex flex-row justify-center items-end text-center my-3',
}

interface PlayerScoreProps {
  score: number
}

export function PlayerScore({ score }: PlayerScoreProps) {
  return (
    <div className={clsx(styles.container)}>
      <div className={textStyles.scoreLg}>{score}</div>
      <div className={textStyles.muted}>總分</div>
    </div>
  )
}