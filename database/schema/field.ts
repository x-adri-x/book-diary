import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { category } from './category'

export const field = pgTable('fields', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  categoryId: integer('category_id').references(() => category.id),
})
