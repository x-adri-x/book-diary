import { eq } from 'drizzle-orm'
import { db } from '@/database'
import { book, selectBookSchema } from '@/database/schema/book'
import BookList from '../ui/book-list'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import Title from '../components/title'
import { z } from 'zod'
import ErrorMessage from '@/app/components/error-message'

type Book = z.infer<typeof selectBookSchema>

export default async function Page() {
  const session = await auth()
  let books: Array<Book> | null = null
  let errorMessage: string | null = null

  if (session && session.user?.id) {
    const userId = parseInt(session.user?.id)
    try {
      books = await db.select().from(book).where(eq(book.userId, userId))
    } catch (error) {
      if (error instanceof Error) errorMessage = error.message
      errorMessage = 'An error occured while fetching the books list.'
    }
  }

  return (
    <div className='lg:min-w-screen-sm'>
      <Title text='Your Reading Projects' />
      <div className='flex flex-col justify-center items-center '>
        <SessionProvider>{books && <BookList books={books} />}</SessionProvider>
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  )
}
