import type { ComponentProps } from "react"
import { ButtonStyle } from "./styles"

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'default' | 'outline';
}

export default function Button({children, variant = 'default'}: ButtonProps) {
  return (
    <ButtonStyle $variant={variant}>{children}</ButtonStyle>
  )
}
