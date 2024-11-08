'use client'

import { selectItemSchema } from '@/database/schema/item'
import { useState } from 'react'
import { z } from 'zod'
import { usePathname, useSearchParams } from 'next/navigation'
import { caveat } from '@/app/fonts/fonts'
import EmptyList from '@/app/components/empty-list'
import CreateItemForm from './create-item-form'
import { addDash } from '@/app/utility/utility'
import Link from 'next/link'
import Button from '@/app/components/button'

type Item = z.infer<typeof selectItemSchema>
type Props = {
  items: Item[]
}
export default function ItemsList({ items }: Props) {
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
      {!formOpen && <Button label='Add a new item' loading={false} onClick={() => setFormOpen(true)} />}
    </>
  )
}
