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
      {formOpen && <CreateBookForm />}
      {!formOpen && (
        <button
          className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md`}
          onClick={() => setFormOpen(true)}
        >
          Start a new book
        </button>
      )}
      {books.length === 0 ? (
        <EmptyList name='book' />
      ) : (
        <ul className='flex flex-col w-full '>
          {books.map((book) => (
            <li
              key={book.id}
              className={`py-4 border pl-4 border-gray-200 shadow-lg rounded-lg mb-4 text-xl cursor-pointer transform scale-100 ease-in-out duration-500 hover:scale-105 ${caveat.className}`}
            >
              <Link href={{ pathname: `${path}/${book.id}/${addDash(book.title.toLowerCase().trim())}` }}>
                <p>
                  {book.author}: <span className='font-bold'>{book.title}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
