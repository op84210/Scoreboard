import { type ReactNode } from 'react'

// 容器組件屬性
interface Props {
  children: ReactNode
  className?: string
}

// 容器組件
export function Container({ children, className = '' }: Props) {
  return (
    <div className={`mx-auto max-w-5xl px-6 md:px-8 py-6 md:py-8 space-y-6 ${className}`}>
      {children}
    </div>
  )
}
