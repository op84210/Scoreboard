import { buttonStyles, cardStyles, layoutStyles, modalStyles, textStyles } from '../styles'

export const scoreboardStyles = {
  container: 'mx-auto space-y-2',
  topBar: layoutStyles.rowEnd,
  iconButton: buttonStyles.iconBase,
  iconButtonGray: buttonStyles.iconGray,
  iconButtonAmber: buttonStyles.iconAmber,
  iconButtonDisabled: buttonStyles.iconDisabled,
  chartCard: cardStyles.sectionMd,
  playerList: 'flex flex-col md:flex-row gap-2 md:gap-3',
  playerRow: layoutStyles.rowGap2,
  playerButton: 'flex-1 rounded-lg p-3',
  playerScoreRow: layoutStyles.rowBetween,
  playerScoreValue: textStyles.bold,
  quickActions: 'flex gap-1',
  quickAddButton: 'rounded-lg px-3 py-2 bg-green-700 hover:bg-green-600 text-white font-bold transition',
  quickInputButton: 'rounded-lg px-2 py-2 bg-gray-700 hover:bg-gray-600 text-white transition',
  addScoreButton: buttonStyles.addScore,
  modalPrimary: modalStyles.primary,
  modalSecondary: modalStyles.secondary,
} as const
