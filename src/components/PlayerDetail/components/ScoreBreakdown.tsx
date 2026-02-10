import { type ScoreBreakdown as ScoreBreakdownType, type ScoreType, SCORE_TYPE_ICONS, SCORE_TYPE_LABELS } from '../../../types'
import { cardStyles, layoutStyles, textStyles } from '../../styles'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.defaults.font.size = 16

const styles = {
  card: cardStyles.sectionSm,
  title: textStyles.titleSm,
  chartRow: layoutStyles.rowCenter,
}

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType
  totalScore: number
}

// 得分明細元件，使用圓餅圖展示不同得分類型的分數佔比
export function ScoreBreakdown({ breakdown, totalScore }: ScoreBreakdownProps) {
  const scoreTypes = Object.keys(breakdown) as ScoreType[]
  const scores = scoreTypes.map((type) => breakdown[type])
  const labels = scoreTypes.map((type) => `${SCORE_TYPE_ICONS[type]} ${SCORE_TYPE_LABELS[type]}`)

  const colors = [
    'rgb(239 68 68)',
    'rgb(59 130 246)',
    'rgb(34 197 94)',
    'rgb(234 179 8)',
    'rgb(107 114 128)',
    'rgb(236 72 153)',
    'rgb(168 85 247)',
    'rgb(20 184 166)',
  ]

  const chartData = {
    labels,
    datasets: [
      {
        data: scores,
        backgroundColor: colors.slice(0, scoreTypes.length),
        borderColor: 'rgb(31 41 55)',
        borderWidth: 2,
      },
    ],
  }

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          font: {
            weight: 'bold',
          },
          padding: 18,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const value = context.parsed
            const percentage = totalScore > 0 ? ((value / totalScore) * 100).toFixed(1) : 0
            return `${value} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>得分明細</h3>
      <div className={styles.chartRow}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
