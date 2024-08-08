import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from 'react';
import { APIService } from '../services/api';
import type { Category } from '../services/api-types';
import type { createCategoryData, CreateTransactionData } from '../validators/types';
import { formatDate } from '../utils/format-date';

interface FetchAPIProps {
	createCategory: (data: createCategoryData) => Promise<void>;
	createTransaction: (data: CreateTransactionData) => Promise<void>;
	fetchCategories: () => Promise<void>;
	categories: Category[];
}

const FetchAPIContext = createContext<FetchAPIProps>({} as FetchAPIProps);

type FetchAPIProviderProps = {
	children: ReactNode;
};

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
	const [categories, setCategories] = useState<Category[]>([]);

	const createTransaction = useCallback(async (data: CreateTransactionData) => {
		await APIService.createTransaction({
			...data,
			date: formatDate(data.date),
			amount: Number(data.amount.replace(/[^0-9]/g, ''))
		})
	}, [])

	const createCategory = useCallback(async (data: createCategoryData) => {
		await APIService.createCategory(data);
	}, []);

	const fetchCategories = useCallback(async () => {
		const data = await APIService.getCategories();
		setCategories(data);
	}, []);

	return (
		<FetchAPIContext.Provider
			value={{
				createCategory,
				fetchCategories,
				categories,
				createTransaction,
			}}
		>
			{children}
		</FetchAPIContext.Provider>
	);
}

export function useFetchAPI(): FetchAPIProps {
	return useContext(FetchAPIContext);
}
