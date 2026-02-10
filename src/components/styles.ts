export const modalStyles = {
  overlay: 'fixed inset-0 bg-white/25 flex items-center justify-center z-50',
  modal: 'bg-gray-900 rounded-lg p-6 max-w-sm mx-4',
  title: 'text-white text-lg font-bold mb-4',
  body: 'text-gray-300 mb-6',
  actions: 'flex flex-col gap-3',
  primaryRed: 'flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition',
  primaryAmber: 'flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-lg transition',
  secondary: 'flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition',
} as const

export const sheetStyles = {
  overlay: 'fixed inset-0 bg-black/50 flex items-end justify-center z-50',
  panel: 'bg-gray-900 rounded-t-3xl p-4 w-full h-full max-w-md overflow-y-auto',
  panelOpen: 'animate-slide-up',
  panelClose: 'animate-slide-down',
  content: 'flex flex-col space-y-6 animate-fade-in',
} as const

export const buttonStyles = {
  primary: 'rounded-lg bg-blue-600 px-4 py-2 text-white',
  secondary: 'rounded-lg bg-gray-600 px-4 py-2 text-white',
  action: 'bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition',
  closeIcon: 'text-white hover:text-gray-300 text-3xl leading-none w-10 h-10 flex items-center justify-center',
  iconBase: 'rounded-lg p-2 m-1 text-white text-2xl',
  iconGray: 'bg-gray-600',
  iconAmber: 'bg-amber-600 hover:bg-amber-500',
  iconDisabled: 'bg-gray-500 cursor-not-allowed',
  addScore: 'rounded-lg p-3 bg-gray-800 hover:bg-green-500 text-white text-xl transition',
} as const

export const cardStyles = {
  base: 'bg-gray-800 rounded-lg',
  paddedSm: 'p-2',
  paddedMd: 'p-4',
  item: 'bg-gray-900 rounded-lg p-2 text-center',
  sectionSm: 'bg-gray-800 rounded-lg p-2 my-1',
  sectionMd: 'bg-gray-800 rounded-lg p-4',
  listItem: 'bg-gray-800 rounded-lg p-2',
} as const

export const textStyles = {
  titleLg: 'text-2xl font-bold text-white',
  titleSm: 'text-white font-bold text-sm mb-2',
  labelSm: 'text-white text-sm',
  muted: 'text-gray-400',
  mutedSm: 'text-gray-300 text-xs m-2',
  mutedMd: 'text-gray-300',
  labelXs: 'text-gray-200 text-xs',
  valueLg: 'text-white font-bold text-lg',
  scoreLg: 'text-5xl font-bold text-white',
  bold: 'font-bold',
  statusPositive: 'text-green-400',
  statusNegative: 'text-red-400',
  statusDangerHint: 'text-red-300',
} as const

export const layoutStyles = {
  centerPage: 'flex flex-col justify-center min-h-screen mx-auto text-center',
  rowBetween: 'flex items-center justify-between w-full',
  rowEnd: 'flex justify-end items-center',
  rowGap2: 'flex gap-2',
  rowCenter: 'flex items-center justify-center',
  listY2: 'space-y-2',
  grid2: 'grid grid-cols-2 gap-2',
  grid2Gap4: 'grid grid-cols-2 gap-4 mb-6',
  gridCols3: 'grid grid-cols-3 gap-2',
  inputRow: 'flex gap-2 flex-col sm:flex-row',
} as const

export const pageStyles = {
  container: 'min-h-screen bg-gray-900 p-2 rounded-lg',
  content: 'max-w-2xl mx-auto',
} as const
