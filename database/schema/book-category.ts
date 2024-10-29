import { integer, pgTable } from 'drizzle-orm/pg-core'
import { book } from './book'
import { category } from './category'

export const book_category = pgTable('books_categories', {
  bookId: integer('book_id')
    .notNull()
    .references(() => book.id),
  categoryId: integer('category_id')
    .notNull()
    .references(() => category.id),
})
