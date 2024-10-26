import { eq } from 'drizzle-orm'
import { db } from '@/database'
import { book } from '@/database/schema/book'
import BookList from '../ui/book-list'
import { caveat } from '../ui/fonts'
import { SessionProvider } from 'next-auth/react'

export default async function Page() {
  const books = await db.select().from(book).where(eq(book.userId, 1))

  return (
    <>
      <h1 className={`${caveat.className} text-5xl text-center my-8`}>Your Reading Projects</h1>
      <div className='flex flex-col justify-center items-center text-center'>
        <SessionProvider>
          <BookList books={books} />
        </SessionProvider>
      </div>
    </>
  )
}
