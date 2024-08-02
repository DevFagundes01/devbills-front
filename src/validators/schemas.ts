import { z } from 'zod';

export const createCategorySchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Deve conter pelo menos 1 caractere.' })
		.max(255),
	color: z.string().regex(/^#[A-Fa-f0-9]{6}$/, {
		message: 'Deve seguir o padrão #rrggbb',
	}),
});
