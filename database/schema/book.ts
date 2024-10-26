import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { user } from './user'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const book = pgTable('books', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 100 }).notNull(),
  author: varchar({ length: 100 }).notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
})

const bookSchema = createInsertSchema(book)
export const insertBookSchema = bookSchema.omit({ id: true })
export const selectBookSchema = createSelectSchema(book)
