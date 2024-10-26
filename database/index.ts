import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('DATABASE_URL must be a Neon postgres connection string')
}

// You can specify any property from the node-postgres connection options
export const db = drizzle({
  connection: {
    connectionString: process.env.NEON_DATABASE_URL!,
    ssl: true,
  },
})
