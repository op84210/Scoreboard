import { useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import { BONUS_TYPE_ICONS, BONUS_TYPE_LABELS, type BonusType, type Player } from '../../../types'
import { PLAYER_COLORS } from '../../../constants/colors'
import { buttonStyles, cardStyles, layoutStyles, modalStyles, textStyles } from '../../styles'

interface ScoreboardBonusLeadersProps {
  players: Player[]
}

const BONUS_TYPES: BonusType[] = ['barrel', 'wheat', 'cloth']

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.defaults.font.size = 18
ChartJS.defaults.font.family = 'system-ui, -apple-system, sans-serif'

export function ScoreboardBonusLeaders({ players }: ScoreboardBonusLeadersProps) {
  const [activeBonusType, setActiveBonusType] = useState<BonusType | null>(null)
  const leaders = useMemo(
    () =>
      BONUS_TYPES.map((bonusType) => {
        const maxPoints = Math.max(
          0,
          ...players.map((player) => player.bonusBreakdown[bonusType] ?? 0),
        )
        const leaderNames = players
          .filter((player) => player.bonusBreakdown[bonusType] === maxPoints)
          .map((player) => player.name)

        return { bonusType, maxPoints, leaderNames }
      }),
    [players],
  )

  const chartData = useMemo(() => {
    if (!activeBonusType) return { labels: [], datasets: [] }

    return {
      labels: players.map((player) => player.name),
      datasets: [
        {
          label: BONUS_TYPE_LABELS[activeBonusType],
          data: players.map((player) => player.bonusBreakdown[activeBonusType] ?? 0),
          backgroundColor: players.map(
            (player) => PLAYER_COLORS[player.color] || 'rgb(107 114 128)',
          ),
          borderColor: 'rgb(255 255 255)',
          borderWidth: 2,
        },
      ],
    }
  }, [activeBonusType, players])

  const chartOptions = useMemo<ChartOptions<'bar'>>(() => {
    if (!activeBonusType) {
      return { responsive: true, maintainAspectRatio: false }
    }

    return {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `${BONUS_TYPE_ICONS[activeBonusType]} ${BONUS_TYPE_LABELS[activeBonusType]} 領先分佈`,
          color: 'white',
          font: { size: 24, weight: 'bold' },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          padding: 12,
          titleFont: { size: 24, weight: 'bold' },
          bodyFont: { size: 20 },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: 'white', font: { size: 24, weight: 'bold' } },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
        },
        y: {
          ticks: { color: 'white', font: { size: 24, weight: 'bold' } },
          grid: { display: false },
        },
      },
    }
  }, [activeBonusType])

  return (
    <section className={cardStyles.sectionMd}>
      <div className={layoutStyles.rowBetween}>
        <h1 className={textStyles.titleSm}>獎勵領先</h1>
        <span className={textStyles.mutedSm}>同分並列</span>
      </div>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {leaders.map(({ bonusType, maxPoints, leaderNames }) => {
          const label = BONUS_TYPE_LABELS[bonusType]
          const icon = BONUS_TYPE_ICONS[bonusType]
          const leaderText = maxPoints === 0 ? '尚無' : leaderNames.join(' / ')

          return (
            <li key={bonusType}>
              <button
                type="button"
                className={`${cardStyles.item} w-full text-left transition hover:bg-gray-700`}
                onClick={() => setActiveBonusType(bonusType)}
              >
                <div className={textStyles.labelSm}>
                  {icon} {label}
                </div>
                <div className={textStyles.valueLg}>
                  {leaderText}
                  {maxPoints > 0 ? `（${maxPoints}）` : ''}
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {activeBonusType && (
        <div className={modalStyles.overlay} onClick={() => setActiveBonusType(null)}>
          <div className="bg-gray-900 rounded-lg p-6 w-11/12 h-5/6 max-h-[90vh] flex flex-col" onClick={(event) => event.stopPropagation()}>
            <div className={layoutStyles.rowBetween}>
              <h3 className={modalStyles.title}>獎勵長條圖</h3>
              <button
                type="button"
                onClick={() => setActiveBonusType(null)}
                className={buttonStyles.closeIcon}
              >
                ×
              </button>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
