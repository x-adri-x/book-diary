'use client'

import { selectBookSchema } from '@/database/schema/book'
import { useState } from 'react'
import { z } from 'zod'
import { usePathname } from 'next/navigation'
import CreateBookForm from './create-book-form'
import { caveat } from '../fonts/fonts'
import EmptyList from '../components/empty-list'
import Link from 'next/link'
import { addDash } from '../utility/utility'

type Book = z.infer<typeof selectBookSchema>
interface BookListProps {
  books: Book[]
}
export default function BookList({ books }: BookListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const path = usePathname()

  return (
    <>
      {books.length === 0 ? (
        <EmptyList name='book' />
      ) : (
        <ul className='grid grid-cols-2 grid-rows-auto w-full gap-x-2.5'>
          {books.map((book) => (
            <li
              key={book.id}
              className={`py-10 border border-gray-200 shadow-lg rounded-lg mb-4 text-2xl ${caveat.className}`}
            >
              <Link href={{ pathname: `${path}/${book.id}/${addDash(book.title.toLowerCase().trim())}` }}>
                <p>{book.author}</p>
                <p>{book.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {formOpen && <CreateBookForm />}
      {!formOpen && (
        <button
          className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md`}
          onClick={() => setFormOpen(true)}
        >
          Start a new book
        </button>
      )}
    </>
  )
}
