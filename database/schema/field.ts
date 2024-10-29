import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { category } from './category'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const field = pgTable('fields', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  categoryId: integer('category_id').references(() => category.id, { onDelete: 'cascade' }),
})

export const fieldSchema = createInsertSchema(field)
export const insertFieldSchema = fieldSchema.omit({ id: true })
export const selectFieldSchema = createSelectSchema(field)
