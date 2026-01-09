import { type ReactNode } from 'react'

// 容器組件屬性
interface Props {
  children: ReactNode
  className?: string
}

// 容器組件
export function Container({ children, className = '' }: Props) {
  return (
    <div className={`mx-auto max-w-5xl px-4 md:px-8 md:py-8 space-y-4 ${className}`}>
      {children}
    </div>
  )
}
