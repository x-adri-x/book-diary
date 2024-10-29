import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { field } from './field'
import { item } from './item'

export const content = pgTable('content', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  itemId: integer('item_id').references(() => item.id, { onDelete: 'cascade' }),
  fieldId: integer('field_id').references(() => field.id, { onDelete: 'cascade' }),
})
