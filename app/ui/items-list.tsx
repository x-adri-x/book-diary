'use client'

import { selectItemSchema } from '@/database/schema/item'
import { useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import CreateBookForm from './create-book-form'
import { caveat } from '../fonts/fonts'
import EmptyList from '../components/empty-list'
import CreateItemForm from './create-item-form'

type Item = z.infer<typeof selectItemSchema>
interface ItemListProps {
  items: Item[]
}
export default function ItemsList({ items }: ItemListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const router = useRouter()
  console.log('items', items)
  const handleClick = (id: number, title: string) => {
    const slug = title.toLowerCase().trim().replace(' ', '-')
    router.push(`/diaries/${id}/${slug}`)
  }

  return (
    <>
      {items.length === 0 ? (
        <EmptyList name='item' />
      ) : (
        <ul className='grid grid-cols-2 grid-rows-auto w-full gap-x-2.5'>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => handleClick(item.id, item.name)}
              className={`py-10 border border-gray-200 shadow-lg rounded-lg mb-4 text-2xl ${caveat.className}`}
            ></li>
          ))}
        </ul>
      )}
      {formOpen && <CreateItemForm />}
      {!formOpen && (
        <button
          className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md`}
          onClick={() => setFormOpen(true)}
        >
          Add a new item
        </button>
      )}
    </>
  )
}
