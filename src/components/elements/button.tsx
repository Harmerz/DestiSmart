import { ReactNode } from 'react'

export function Button({
  type,
  onClick,
  children,
  buttonType = 'button',
}: {
  type: String
  onClick?: () => {}
  children: ReactNode
  buttonType?: 'button' | 'submit' | 'reset' | undefined
}) {
  let color
  if (type === 'primary') {
    color = 'bg-[#5889BA] px-3 py-1 rounded'
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={buttonType} className={color} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
