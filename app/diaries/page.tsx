import { eq } from 'drizzle-orm'
import { db } from '@/database'
import { book } from '@/database/schema/book'
import BookList from '../ui/book-list'
import { caveat } from '../fonts/fonts'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

export default async function Page() {
  const session = await auth()
  let books

  if (session && session.user?.id) {
    const userId = parseInt(session.user?.id)
    try {
      books = await db.select().from(book).where(eq(book.userId, userId))
    } catch (error) {
      console.log('An error occurred fetching books list.')
    }
  }

  return (
    <>
      <h1 className={`${caveat.className} text-5xl text-center my-8`}>Your Reading Projects</h1>
      <div className='flex flex-col justify-center items-center text-center'>
        <SessionProvider>{books && <BookList books={books} />}</SessionProvider>
      </div>
    </>
  )
}
