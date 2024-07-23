import {styled} from "styled-components";
import { theme } from "../../styles/theme";

type ButtonProps = {
  $variant: 'default' | 'outline'
}

export const ButtonStyle = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  border-radius: 0.25rem;
  background-color: ${(props) => props.$variant === 'default' ? theme.colors.primary : 'transparent'};
  color: ${(props) => props.$variant === 'default' ? theme.colors.black : theme.colors.primary};
  border: 0;
  padding: 0 0.75rem;
  transition: all 100ms;

  &:hover {
    background-color: ${theme.colors.primarydark};
  }
`