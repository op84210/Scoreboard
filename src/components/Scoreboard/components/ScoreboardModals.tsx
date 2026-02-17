import { type BonusType, type Player, type ScoreType } from '../../../types'
import { PlayerDetail } from '../../PlayerDetail'
import { ScoreInputModal } from '../../ScoreInputModal'
import { ConfirmModal } from '../../common/ConfirmModal'
import { scoreboardStyles as styles } from '../styles'

interface ScoreboardModalsProps {
  selectedPlayer: Player | null
  inputPlayer: Player | null
  showResetConfirm: boolean
  showEndgameConfirm: boolean
  onClosePlayerDetail: () => void
  onCloseScoreInput: () => void
  onUpdatePlayerName: (playerId: number, newName: string) => void
  onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
  onAddBonus: (playerId: number, points: number, bonusType: BonusType) => void
  onConfirmReset: () => void
  onCancelReset: () => void
  onConfirmEndgame: () => void
  onCancelEndgame: () => void
}

// 負責管理和渲染所有與玩家詳情、分數輸入、重設確認和終局結算確認相關的彈窗
export function ScoreboardModals({
  selectedPlayer,
  inputPlayer,
  showResetConfirm,
  showEndgameConfirm,
  onClosePlayerDetail,
  onCloseScoreInput,
  onUpdatePlayerName,
  onAddScore,
  onAddBonus,
  onConfirmReset,
  onCancelReset,
  onConfirmEndgame,
  onCancelEndgame,
}: ScoreboardModalsProps) {
  return (
    <>
      {selectedPlayer && (
        <PlayerDetail
          player={selectedPlayer}
          onClose={onClosePlayerDetail}
          onUpdatePlayerName={onUpdatePlayerName}
        />
      )}

      <ConfirmModal
        isOpen={showResetConfirm}
        title="確認重設？"
        body="所有玩家的分數將被清除，此操作無法撤銷。"
        confirmLabel="確認重設"
        cancelLabel="取消"
        confirmClassName={styles.modalPrimary}
        cancelClassName={styles.modalSecondary}
        onConfirm={onConfirmReset}
        onCancel={onCancelReset}
      />

      <ConfirmModal
        isOpen={showEndgameConfirm}
        title="確認終局結算？"
        body="將為桶子、小麥、絲巾最高者加 10 分，此操作無法撤銷。"
        confirmLabel="確認結算"
        cancelLabel="取消"
        confirmClassName={styles.modalPrimary}
        cancelClassName={styles.modalSecondary}
        onConfirm={onConfirmEndgame}
        onCancel={onCancelEndgame}
      />

      {inputPlayer && (
        <ScoreInputModal
          player={inputPlayer}
          onClose={onCloseScoreInput}
          onAddScore={onAddScore}
          onAddBonus={onAddBonus}
        />
      )}
    </>
  )
}
