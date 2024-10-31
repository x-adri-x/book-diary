import { eq } from 'drizzle-orm'
import { db } from '@/database'
import { book } from '@/database/schema/book'
import BookList from '../ui/book-list'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import Title from '../components/title'

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
      <Title text='Your Reading Projects' />
      <div className='flex flex-col justify-center items-center '>
        <SessionProvider>{books && <BookList books={books} />}</SessionProvider>
      </div>
    </>
  )
}
