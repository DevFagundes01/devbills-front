import type { z } from "zod"
import type { createCategorySchema } from "./schemas"

export type createCategoryData = z.infer<typeof createCategorySchema>