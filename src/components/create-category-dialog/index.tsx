import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchAPI } from '../../hooks/useFetchAPI';
import { theme } from '../../styles/theme';
import { createCategorySchema } from '../../validators/schemas';
import type { createCategoryData } from '../../validators/types';
import { Button } from '../button';
import { Dialog } from '../dialog';
import { Input } from '../input';
import { Container } from './styles';
import Title from '../title';

export function CreateCategoryDialog() {
	const { createCategory, fetchCategories } = useFetchAPI();
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			color: theme.colors.primary,
		},
		resolver: zodResolver(createCategorySchema),
	});

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const onSubmit = useCallback(
		async (data: createCategoryData) => {
			await createCategory(data);
			handleClose();
			await fetchCategories()
			alert('Categoria cadastrada')
		},
		[handleClose, createCategory, fetchCategories],
	);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
			trigger={<Button>Nova Categoria</Button>}
		>
			<Container>
				<Title
					title="Nova Categoria"
					subTitle="Crie uma nova categoria para sua transações"
				/>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<Input
							label="Nome"
							placeholder="Nome da Categoria..."
							{...register('title', { required: 'Nome é obrigatório' })}
							error={errors.title?.message}
						/>
						<Input
							label="Cor"
							type="color"
							{...register('color')}
							error={errors.title?.message}
						/>
					</div>
					<footer>
						<Button onClick={handleClose} variant="outline" type="button">
							Cancelar
						</Button>
						<Button type="submit">Cadastrar</Button>
					</footer>
				</form>
			</Container>
		</Dialog>
	);
}
