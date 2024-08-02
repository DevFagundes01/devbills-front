import { z } from 'zod';

export const createCategorySchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Deve conter pelo menos 1 caractere.' })
		.max(255),
	color: z.string().regex(/^(0[1-9]|[12][0-9]|3[01]\/0[0-9]|1[0-2]\/\d{4}$)/, {
		message: 'Data inválida',
	}),
});
