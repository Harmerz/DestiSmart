import { ReactNode } from 'react'

export function Button({
  type,
  onClick,
  children,
}: {
  type: String
  onClick?: () => {}
  children: ReactNode
}) {
  let color
  if (type === 'primary') {
    color = 'bg-[#5889BA] px-3 py-1 rounded'
  }
  return (
    <button type="button" className={color} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
