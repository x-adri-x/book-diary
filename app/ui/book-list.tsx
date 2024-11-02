'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { z } from 'zod'
import { caveat } from '../fonts/fonts'
import { selectBookSchema } from '@/database/schema/book'
import CreateBookForm from './create-book-form'
import EmptyList from '@/app/components/empty-list'
import { addDash } from '@/app/utility/utility'
import Button from '../components/button'

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
      {!formOpen && <Button label='Start a new book' onClick={() => setFormOpen(true)} />}
      {books.length === 0 ? (
        <EmptyList name='book' />
      ) : (
        <ul className='flex flex-col w-full '>
          {books.map((book) => (
            <li
              key={book.id}
              className={`py-4 border pl-4 border-gray-200 shadow-lg rounded-lg mb-4 text-lg cursor-pointer transform scale-100 ease-in-out duration-500 hover:scale-105`}
            >
              <Link href={{ pathname: `${path}/${book.id}/${addDash(book.title.toLowerCase().trim())}` }}>
                <p>{book.author}</p>
                <p className='font-bold'>{book.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
