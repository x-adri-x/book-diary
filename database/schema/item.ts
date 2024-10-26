import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { category } from './category'

export const item = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  categoryId: integer('category_id').references(() => category.id),
})
