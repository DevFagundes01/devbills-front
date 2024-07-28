import { type ComponentProps, forwardRef } from 'react';
import { ButtonStyles } from './styles';

export type ButtonProps = ComponentProps<'button'> & {
	variant?: 'default' | 'outline';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant = 'default', ...props }, ref) => (
		<ButtonStyles ref={ref} {...props} $variant={variant}>
			{children}
		</ButtonStyles>
	),
);
