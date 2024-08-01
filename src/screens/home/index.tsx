import { InputMask } from '@react-input/mask';
import { ButtonIcon } from '../../components/button-icon';
import { Card } from '../../components/card';
import { Input } from '../../components/input';
import { Logo } from '../../components/logo';
import { Title } from '../../components/title';
import {
	Aside,
	Balance,
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
import { Transaction } from '../../components/transaction';
import { CreateCategoryDialog } from '../../components/create-category-dialog';
import { CreateTransactionDialog } from '../../components/create-transaction-dialog';
import { CategoriesPieChart } from '../../components/categories-pie-chart';
import { FinancialEvolutionBarChart } from '../../components/financial-evolution-bar-chart';

export function Home() {
	return (
		<>
			<Header>
				<Logo />
				<div>
					<CreateTransactionDialog/>
					<CreateCategoryDialog/>
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
							/>
							<InputMask
								component={Input}
								mask="dd/mm/aaaa"
								replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
								variant="dark"
								label="Início"
								placeholder="dd/mm/aaaa"
							/>
							<ButtonIcon />
						</InputGroup>
					</Filters>
					<Balance>
						<Card title="Saldo" amount={1000000} />
						<Card title="Receitas" amount={1000000} variant="incomes" />
						<Card title="Gastos" amount={1000000} variant="expenses" />
					</Balance>
					<ChartContainer>
						<header>
							<Title
								title="Gastos"
								subTitle="Despesas por categoria no período"
							/>
						</header>
						<ChartContent>
							<CategoriesPieChart/>
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
								/>
								<ButtonIcon />
							</ChartAction>
						</header>
						<ChartContent>
							<FinancialEvolutionBarChart/>
						</ChartContent>
					</ChartContainer>
				</Section>
				<Aside>
					<header>
						<Title title="Transações" subTitle="Receitas e Gastos no período" />
						<SearchTransaction>
							<Input variant="black" placeholder="Procurar transação..." />
							<ButtonIcon />
						</SearchTransaction>
					</header>
						<TransactionList>
						<Transaction
						id={1}
						title="Compra de carro"
            date="10/08/2022"
            amount={10000}
						category={{ title: 'Automóvel', color: '#FFA500' }}
						/>
						<Transaction
						id={1}
						title="Compra de carro"
            date="10/08/2022"
            amount={10000}
						category={{ title: 'Automóvel', color: '#FFA500' }}
						/>
						<Transaction
						id={1}
						title="Compra de carro"
            date="10/08/2022"
            amount={10000}
						category={{ title: 'Automóvel', color: '#FFA500' }}
						/>
						</TransactionList>
				</Aside>
			</Main>
		</>
	);
}
