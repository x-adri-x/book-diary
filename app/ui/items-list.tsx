'use client'

import { selectItemSchema } from '@/database/schema/item'
import { z } from 'zod'
import { usePathname, useSearchParams } from 'next/navigation'
import { caveat } from '@/app/fonts/fonts'
import EmptyList from '@/app/components/empty-list'
import { addDash } from '@/app/utility/utility'
import Link from 'next/link'

type Item = z.infer<typeof selectItemSchema>
type Props = {
  items: Item[]
}
export default function ItemsList({ items }: Props) {
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
              className={`${caveat.className} py-6 flex justify-center items-center border border-gray-200 shadow-lg rounded-md mb-4 text-xl text-center aspect-square`}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      )}
    </>
  )
}
