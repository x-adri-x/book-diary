import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const category = pgTable('categories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
})

export const insertCategorySchema = createInsertSchema(category)
export const selectCategorySchema = createSelectSchema(category)
