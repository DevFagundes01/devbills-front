import { InputMask } from '@react-input/mask';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../button';
import { Dialog } from '../dialog';
import { Input } from '../input';
import { Title } from '../title';
import { Container, CurrencyInput, InputGroup, RadioForm, RadioGroup } from './styles';
import { useFetchAPI } from '../../hooks/useFetchAPI';

export function CreateTransactionDialog() {
	const {categories, fetchCategories} = useFetchAPI()
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<string>('');

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories])

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
		setOpen(false);
	}, []);

	const onSubmit = useCallback(() => {
		handleClose();
	}, [handleClose]);

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

				<form>
					<InputGroup>
						<label>Categoria</label>
						<select>
							{categories?.length && categories.map((item) => (
								<option key={item._id} value={item._id}>
									{item.title}
								</option>
							))}
						</select>
					</InputGroup>
					<Input label="Nome" placeholder="Nome da transação..." />

					<InputGroup>
						<label>Valor</label>
						<CurrencyInput
							placeholder="R$ 0,00"
							onChange={handleChange}
							value={value}
						/>
					</InputGroup>

					<InputMask
						component={Input}
						mask="dd/mm/aaaa"
						replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
						variant="black"
						label="Data"
						placeholder="dd/mm/aaaa"
					/>

					<RadioForm>
						<RadioGroup>
							<input type="radio" id="income" value="income" name='type'/>
              <label htmlFor="income">Receita</label>
						</RadioGroup>
						<RadioGroup>
							<input type="radio" id="expense" value="expense" name='type'/>
              <label htmlFor="expense">Gasto</label>
						</RadioGroup>
					</RadioForm>
					<footer>
						<Button onClick={handleClose} variant="outline" type="button">
							Cancelar
						</Button>
						<Button onClick={onSubmit} type="button">
							Cadastrar
						</Button>
					</footer>
				</form>
			</Container>
		</Dialog>
	);
}
