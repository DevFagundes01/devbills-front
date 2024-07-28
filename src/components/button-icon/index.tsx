import { type ComponentProps, forwardRef } from 'react';
import { ButtonStyles } from './styles';
import { MagnifyingGlass } from '@phosphor-icons/react';

export type ButtonIconProps = ComponentProps<'button'>;

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
	({ ...props }, ref) => (
		<ButtonStyles ref={ref} {...props}>
      <MagnifyingGlass/>
		</ButtonStyles>
	),
);
