'use client'

import { selectBookSchema } from '@/database/schema/book'
import { useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import EmptyBookList from './empty-book-list'
import CreateBookForm from './create-book-form'
import { caveat } from './fonts'

type Book = z.infer<typeof selectBookSchema>
interface BookListProps {
  books: Book[]
}
export default function BookList({ books }: BookListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const router = useRouter()

  const handleClick = (id: number, title: string) => {
    const slug = title.toLowerCase().trim().replace(' ', '-')
    router.push(`/diaries/${id}/${slug}`)
  }

  return (
    <>
      {books.length === 0 ? (
        <EmptyBookList />
      ) : (
        <ul className='grid grid-cols-2 grid-rows-auto w-full gap-x-2.5'>
          {books.map((book) => (
            <li
              key={book.id}
              onClick={() => handleClick(book.id, book.title)}
              className={`py-10 border border-gray-200 shadow-lg rounded-lg mb-4 text-2xl ${caveat.className}`}
            >
              <p>{book.author}</p>
              <p>{book.title}</p>
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
