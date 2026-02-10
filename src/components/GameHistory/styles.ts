import clsx from 'clsx'
import { buttonStyles, cardStyles, layoutStyles, pageStyles, textStyles } from '../styles'

export const gameHistoryStyles = {
  container: pageStyles.container,
  content: pageStyles.content,
  header: layoutStyles.rowBetween,
  title: textStyles.titleLg,
  actions: 'flex items-center gap-2',
  backButton: buttonStyles.closeIcon,
  hint: textStyles.mutedSm,
  empty: clsx('text-center py-8', textStyles.muted),
  list: layoutStyles.listY2,
  recordItem: clsx(cardStyles.listItem, layoutStyles.rowBetween, 'transition-transform relative'),
  recordItemLatest: 'touch-pan-y',
  infoRow: layoutStyles.rowGap2,
  playerName: 'text-white font-semibold',
  time: textStyles.labelSm,
  scoreInfo: 'text-right',
  scoreLabel: textStyles.labelSm,
  scoreDesc: textStyles.mutedSm,
  scoreValue: textStyles.valueLg,
  scorePositive: textStyles.statusPositive,
  scoreNegative: textStyles.statusNegative,
  swipeOverlay: 'absolute inset-0 rounded-lg pointer-events-none',
} as const
