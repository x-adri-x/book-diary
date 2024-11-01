'use client'

import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'

export default function CategorySettings() {
  const searchParams = useSearchParams()
  const path = usePathname()

  const categoryId = searchParams.get('category')
  return (
    <div className='relative'>
      <Link
        href={{
          pathname: `${path}/settings`,
          query: { category: categoryId },
        }}
      >
        <Cog6ToothIcon className='h-8 w-8 cursor-pointer' />
      </Link>
    </div>
  )
}
