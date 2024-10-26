import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 256 }).notNull().unique(),
  password: varchar({ length: 100 }).notNull(),
})
