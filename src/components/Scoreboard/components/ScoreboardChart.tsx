import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { type Player } from '../../../types'
import { scoreboardStyles as styles } from '../styles'
import { buildChartData, chartOptions } from '../utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.defaults.font.size = 20

interface ScoreboardChartProps {
  players: Player[]
}

// 分數圖表元件，使用水平條形圖展示玩家的分數對比
export function ScoreboardChart({ players }: ScoreboardChartProps) {
  const chartData = buildChartData(players)

  return (
    <div className={styles.chartCard}>
      <div style={{ height: '60vh' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
