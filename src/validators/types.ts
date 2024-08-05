import type { z } from "zod"
import type { createCategorySchema, createTransactionSchema } from "./schemas"

export type createCategoryData = z.infer<typeof createCategorySchema>

export type CreateTransactionData = z.infer<typeof createTransactionSchema>