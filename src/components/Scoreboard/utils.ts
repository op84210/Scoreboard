import { type ChartOptions } from 'chart.js'
import { type Player } from '../../types'
import { PLAYER_COLORS } from '../../constants/colors'

export const buildChartData = (players: Player[]) => ({
  labels: players.map((p) => p.name),
  datasets: [
    {
      label: '總分',
      data: players.map((p) => p.score),
      backgroundColor: players.map((p) => PLAYER_COLORS[p.color] || 'rgb(107 114 128)'),
      borderColor: 'rgb(255 255 255)',
      borderWidth: 2,
    },
  ],
})

export const chartOptions: ChartOptions<'bar'> = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: '玩家分數對比',
      color: 'white',
      font: { size: 24, weight: 'bold' },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      padding: 10,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: { color: 'white', font: { size: 24 } },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
    },
    y: {
      ticks: { color: 'white', font: { size: 24 } },
      grid: { display: false },
    },
  },
}
