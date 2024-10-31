import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { field } from './field'
import { item } from './item'

export const content = pgTable('content', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  itemId: integer('item_id').references(() => item.id, { onDelete: 'cascade' }),
  fieldId: integer('field_id').references(() => field.id, { onDelete: 'cascade' }),
})

export const contentSchema = createInsertSchema(content)
export const insertContentSchema = contentSchema.omit({ id: true })
export const selectContentSchema = contentSchema.omit({ id: true, itemId: true })
