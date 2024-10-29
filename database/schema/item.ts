import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { category } from './category'
import { book } from './book'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const item = pgTable('items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  categoryId: integer('category_id').references(() => category.id, { onDelete: 'cascade' }),
  bookId: integer('book_id').references(() => book.id, { onDelete: 'cascade' }),
})

const itemSchema = createInsertSchema(item)
export const insertItemSchema = itemSchema.omit({ id: true })
export const selectItemSchema = createSelectSchema(item)
