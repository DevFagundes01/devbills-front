import { zodResolver } from '@hookform/resolvers/zod';
import { InputMask } from '@react-input/mask';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchAPI } from '../../hooks/useFetchAPI';
import { createTransactionSchema } from '../../validators/schemas';
import type { CreateTransactionData } from '../../validators/types';
import { Button } from '../button';
import { Dialog } from '../dialog';
import { Input } from '../input';
import { Title } from '../title';
import {
	Container,
	CurrencyInput,
	ErrorMessage,
	InputGroup,
	RadioForm,
	RadioGroup,
} from './styles';

export function CreateTransactionDialog() {
	const { categories, fetchCategories, createTransaction } = useFetchAPI();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<string>('');
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<CreateTransactionData>({
		defaultValues: {
			categoryId: 'null',
			title: '',
			amount: '',
			date: dayjs().format('DD/MM/YYYY'),
			type: 'expense',
		},
		resolver: zodResolver(createTransactionSchema),
	});

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/[^0-9.]/g, '');
		const cents = Number.parseInt(numericValue, 10);

		if (!Number.isNaN(cents)) {
			const reais = cents / 100;
			const formattedValue = formattedCurrency(reais);
			setValue(formattedValue);
		} else {
			setValue('');
		}
	};

	const formattedCurrency = (value: number): string => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	};

	const handleClose = useCallback(() => {
		reset();
		setOpen(false);
	}, [reset]);

	const onSubmit = useCallback(async (data: CreateTransactionData) => {
		await createTransaction(data)
		handleClose();
	}, [handleClose, createTransaction]);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
			trigger={<Button>Nova Transação</Button>}
		>
			<Container>
				<Title
					title="Nova Transação"
					subTitle="Crie uma nova transação para seu controle financeiro"
				/>

				<form onSubmit={handleSubmit(onSubmit)}>
					<InputGroup>
						<label>Categoria</label>
						<select {...register('categoryId')}>
							<option value="null">Selecione uma categoria...</option>
							{categories?.length &&
								categories.map((item) => (
									<option key={item._id} value={item._id}>
										{item.title}
									</option>
								))}
						</select>
						{errors.categoryId && (
							<ErrorMessage>{errors.categoryId.message}</ErrorMessage>
						)}
					</InputGroup>
					<Input
						label="Nome"
						placeholder="Nome da transação..."
						{...register('title')}
						error={errors.title?.message}
					/>

					<InputGroup>
						<label>Valor</label>
						<CurrencyInput
							placeholder="R$ 0,00"
							value={value}
							{...register('amount')}
							onChange={(e) => handleChange(e)}
						/>
						{errors.amount && (
							<ErrorMessage>{errors.amount.message}</ErrorMessage>
						)}
					</InputGroup>

					<InputMask
						component={Input}
						mask="dd/mm/aaaa"
						replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
						label="Data"
						variant="black"
						placeholder="dd/mm/aaaa"
						error={errors.date?.message}
						{...register('date')}
						required
					/>

					<RadioForm>
						<RadioGroup>
							<input
								type="radio"
								id="income"
								value="income"
								{...register('type')}
							/>
							<label htmlFor="income">Receita</label>
						</RadioGroup>
						<RadioGroup>
							<input
								type="radio"
								id="expense"
								value="expense"
								{...register('type')}
							/>
							<label htmlFor="expense">Gasto</label>
						</RadioGroup>
						{errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
					</RadioForm>
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
