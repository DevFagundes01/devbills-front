import { type ComponentProps, forwardRef } from 'react';
import { InputStyles } from './styles';

type InputProps = ComponentProps<'input'> & {
	label?: string;
	error?: string;
	variant?: 'black' | 'dark';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, variant = 'black', ...props }, ref) => (
		<InputStyles $variant={variant}>
			{label && <label>{label}</label>}
			<input ref={ref} {...props} />
			{error && <p style={{ color: 'red', fontSize: '0.625rem' }}>{error}</p>}
		</InputStyles>
	),
);
