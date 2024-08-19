import { zodResolver } from '@hookform/resolvers/zod';
import { X } from '@phosphor-icons/react';
import { InputMask } from '@react-input/mask';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonIcon } from '../../components/button-icon';
import { Card } from '../../components/card';
import {
	CategoriesPieChart,
	type CategoryProps,
} from '../../components/categories-pie-chart';
import { CreateCategoryDialog } from '../../components/create-category-dialog';
import { CreateTransactionDialog } from '../../components/create-transaction-dialog';
import { FinancialEvolutionBarChart } from '../../components/financial-evolution-bar-chart';
import { Input } from '../../components/input';
import { Logo } from '../../components/logo';
import Title from '../../components/title';
import { Transaction } from '../../components/transaction';
import { useFetchAPI } from '../../hooks/useFetchAPI';
import { transactionsFilterSchema } from '../../validators/schemas';
import type { FinancialEvolutionFilterData, TransactionsFilterData } from '../../validators/types';
import {
	Aside,
	Balance,
	CategoryBadge,
	ChartAction,
	ChartContainer,
	ChartContent,
	Filters,
	Header,
	InputGroup,
	Main,
	SearchTransaction,
	Section,
	TransactionList,
} from './styles';

export function Home() {
	const resolver = zodResolver(transactionsFilterSchema);

	const transactionsFilterForm = useForm<TransactionsFilterData>({
		defaultValues: {
			title: '',
			categoryId: '',
			beginDate: dayjs().startOf('month').format('DD/MM/YYYY'),
			endDate: dayjs().endOf('month').format('DD/MM/YYYY'),
		},
		resolver,
	});

	const financialEvolutionsFilterForm = useForm<FinancialEvolutionFilterData>({
		defaultValues: {
			year: dayjs().get('year').toString(),
		}
	})

	const { transactions, dashboard, financialEvolution, fetchTransactions, fetchDashboard, fetchFinancialEvolution } =
		useFetchAPI();

	useEffect(() => {
		const { beginDate, endDate } = transactionsFilterForm.getValues();
		fetchDashboard({ beginDate, endDate });
		fetchTransactions(transactionsFilterForm.getValues());
		fetchFinancialEvolution(financialEvolutionsFilterForm.getValues());
	}, [fetchTransactions, transactionsFilterForm, fetchDashboard, fetchFinancialEvolution, financialEvolutionsFilterForm]);

	const [selectedCategory, setSelectedCategory] =
		useState<CategoryProps | null>(null);

	const handleSelectCategory = useCallback(
		async ({ id, title, color }: CategoryProps) => {
			setSelectedCategory({ id, title, color });
			transactionsFilterForm.setValue('categoryId', id);

			await fetchTransactions(transactionsFilterForm.getValues())
		},
		[transactionsFilterForm, fetchTransactions],
	);

	const handleDeselectCategory = useCallback(async () => {
		setSelectedCategory(null);
		transactionsFilterForm.setValue('categoryId', '');

		await fetchTransactions(transactionsFilterForm.getValues())
	}, [transactionsFilterForm, fetchTransactions]);

	const onSubmitTransactions = useCallback(() => {
		async (data: TransactionsFilterData) => {
			await fetchTransactions(data);
			console.log(data);
		};
	}, [fetchTransactions]);

	const onSubmitDashboard = useCallback(async (data: TransactionsFilterData) => {
		const { beginDate, endDate } = data;

		await fetchDashboard({ beginDate, endDate });
		await fetchTransactions(data);
	}, [fetchDashboard, fetchTransactions]);

	const onSubmitFinancialEvolution = useCallback(async (data: FinancialEvolutionFilterData) => {
    await fetchFinancialEvolution(data);
  }, [fetchFinancialEvolution]);

	return (
		<>
			<Header>
				<Logo />
				<div>
					<CreateTransactionDialog />
					<CreateCategoryDialog />
				</div>
			</Header>
			<Main>
				<Section>
					<Filters>
						<Title title="Saldo" subTitle="Receitas e despesas no período" />
						<InputGroup>
							<InputMask
								component={Input}
								mask="dd/mm/aaaa"
								replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
								variant="dark"
								label="Início"
								placeholder="dd/mm/aaaa"
								error={
									transactionsFilterForm.formState.errors.beginDate?.message
								}
								{...transactionsFilterForm.register('beginDate')}
							/>
							<InputMask
								component={Input}
								mask="dd/mm/aaaa"
								replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
								variant="dark"
								label="Fim"
								placeholder="dd/mm/aaaa"
								error={transactionsFilterForm.formState.errors.endDate?.message}
								{...transactionsFilterForm.register('endDate')}
							/>
							<ButtonIcon
								onClick={transactionsFilterForm.handleSubmit(
									onSubmitDashboard,
								)}
							/>
						</InputGroup>
					</Filters>
					<Balance>
						<Card title="Saldo" amount={dashboard?.balance?.balance || 0} />
						<Card
							title="Receitas"
							amount={dashboard?.balance?.incomes || 0}
							variant="incomes"
						/>
						<Card
							title="Gastos"
							amount={dashboard?.balance?.expenses * -1 || 0}
							variant="expenses"
						/>
					</Balance>
					<ChartContainer>
						<header>
							<Title
								title="Gastos"
								subTitle="Despesas por categoria no período"
							/>
							{selectedCategory && (
								<CategoryBadge
									$color={selectedCategory.color}
									onClick={handleDeselectCategory}
								>
									<X />
									{selectedCategory.title.toUpperCase()}
								</CategoryBadge>
							)}
						</header>
						<ChartContent>
							<CategoriesPieChart
								expenses={dashboard.expenses}
								onClick={handleSelectCategory}
							/>
						</ChartContent>
					</ChartContainer>
					<ChartContainer>
						<header>
							<Title
								title="Evolução Financeira"
								subTitle="Saldo, Receitas e Gastos no ano"
							/>
							<ChartAction>
								<InputMask
									component={Input}
									mask="aaaa"
									replacement={{ d: /\d/ }}
									variant="black"
									label="Ano"
									placeholder="aaaa"
									{...financialEvolutionsFilterForm.register('year')}
								/>
								<ButtonIcon onClick={financialEvolutionsFilterForm.handleSubmit(onSubmitFinancialEvolution)}/>
							</ChartAction>
						</header>
						<ChartContent>
							<FinancialEvolutionBarChart financialEvolution={financialEvolution}/>
						</ChartContent>
					</ChartContainer>
				</Section>
				<Aside>
					<header>
						<Title title="Transações" subTitle="Receitas e Gastos no período" />
						<SearchTransaction>
							<Input
								variant="black"
								placeholder="Procurar transação..."
								{...transactionsFilterForm.register('title')}
							/>
							<ButtonIcon
								onClick={transactionsFilterForm.handleSubmit(
									onSubmitTransactions,
								)}
							/>
						</SearchTransaction>
					</header>
					<TransactionList>
						{transactions?.length &&
							transactions?.map((item, index) => (
								<Transaction
									key={item._id}
									id={index + 1}
									amount={
										item.type === 'expense' ? item.amount * -1 : item.amount
									}
									date={dayjs(item.date).add(3, 'hours').format('DD/MM/YYYY')}
									category={{
										title: item.category.title,
										color: item.category.color,
									}}
									title={item.title}
									variant={item.type}
								/>
							))}
					</TransactionList>
				</Aside>
			</Main>
		</>
	);
}
