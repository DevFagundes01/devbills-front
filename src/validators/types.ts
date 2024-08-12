import type { z } from "zod"
import type { createCategorySchema, createTransactionSchema, transactionsFilterSchema } from "./schemas"

export type createCategoryData = z.infer<typeof createCategorySchema>

export type CreateTransactionData = z.infer<typeof createTransactionSchema>

export type TransactionsFilterData = z.infer<typeof transactionsFilterSchema>