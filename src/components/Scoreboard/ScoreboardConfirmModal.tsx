import { modalStyles } from '../styles'

interface ScoreboardConfirmModalProps {
  isOpen: boolean
  title: string
  body: string
  confirmLabel: string
  cancelLabel: string
  confirmClassName: string
  cancelClassName: string
  onConfirm: () => void
  onCancel: () => void
}

export function ScoreboardConfirmModal({
  isOpen,
  title,
  body,
  confirmLabel,
  cancelLabel,
  confirmClassName,
  cancelClassName,
  onConfirm,
  onCancel,
}: ScoreboardConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modal}>
        <h3 className={modalStyles.title}>{title}</h3>
        <p className={modalStyles.body}>{body}</p>
        <div className={modalStyles.actions}>
          <button onClick={onConfirm} className={confirmClassName}>
            {confirmLabel}
          </button>
          <button onClick={onCancel} className={cancelClassName}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
