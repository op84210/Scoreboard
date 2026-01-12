// 玩家顏色
export type PlayerColor = keyof typeof PLAYER_COLORS

export const PLAYER_COLORS = {
  red: 'rgb(220 38 38)',
  blue: 'rgb(59 130 246)',
  green: 'rgb(34 197 94)',
  yellow: 'rgb(234 179 8)',
  black: 'rgb(61, 65, 73)',
} as const

export const PLAYER_BG_COLORS: Record<string, string> = {
  red: 'rgb(127 29 29)',      // red-900
  blue: 'rgb(30 58 138)',     // blue-900
  green: 'rgb(20 83 45)',     // green-900
  yellow: 'rgb(113 63 18)',   // yellow-900
  black: 'rgb(23 23 23)',     // neutral-900
}

