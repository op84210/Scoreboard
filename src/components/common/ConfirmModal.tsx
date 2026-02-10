import { modalStyles } from '../styles'

interface ConfirmModalProps {
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

// 通用確認對話框組件
export function ConfirmModal({
  isOpen,
  title,
  body,
  confirmLabel,
  cancelLabel,
  confirmClassName,
  cancelClassName,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
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
