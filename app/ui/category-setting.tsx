'use client'

import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useParams } from 'next/navigation'
import { addDash } from '../utility/utility'

export default function CategorySettings() {
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const params = useParams()

  const categoryId = searchParams.get('category')
  return (
    <div className='relative'>
      <Cog6ToothIcon className='h-8 w-8 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Link
          className='cursor-pointer w-max py-2 px-8 absolute -bottom-10 -left-32 border border-slate-200 shadow-md bg-slate-100'
          href={{
            pathname: `/settings/${addDash(params.category as string)}`,
            query: { category: categoryId },
          }}
        >
          Add new field
        </Link>
      )}
    </div>
  )
}
