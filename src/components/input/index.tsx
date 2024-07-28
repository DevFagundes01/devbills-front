import { type ComponentProps, forwardRef } from 'react';
import { InputStyles } from './styles';

type InputProps = ComponentProps<'input'> & {
	label?: string;
	variant?: 'black' | 'dark';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, variant = 'black', ...props }, ref) => (
		<InputStyles $variant={variant}>
			{label && <label>{label}</label>}
			<input ref={ref} {...props} />
		</InputStyles>
	),
);
