'use client'

import { selectItemSchema } from '@/database/schema/item'
import { useState } from 'react'
import { z } from 'zod'
import { usePathname, useSearchParams } from 'next/navigation'
import { caveat } from '../fonts/fonts'
import EmptyList from '../components/empty-list'
import CreateItemForm from './create-item-form'
import { addDash } from '../utility/utility'
import Link from 'next/link'

type Item = z.infer<typeof selectItemSchema>
interface ItemListProps {
  items: Item[]
}
export default function ItemsList({ items }: ItemListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const path = usePathname()
  const searchParams = useSearchParams()

  return (
    <>
      {items.length === 0 ? (
        <EmptyList name='item' />
      ) : (
        <ul className='grid grid-cols-3 grid-rows-auto w-full gap-x-2.5'>
          {items.map((item) => (
            <Link
              key={item.id}
              href={{
                pathname: `${path}/${addDash(item.name.toLowerCase().trim())}`,
                query: { category: searchParams.get('category'), item: item.id },
              }}
              className={`py-6 flex justify-center items-center border border-gray-200 shadow-lg rounded-md mb-4 text-xl text-center ${caveat.className}`}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      )}
      {formOpen && <CreateItemForm setFormOpen={setFormOpen} />}
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
