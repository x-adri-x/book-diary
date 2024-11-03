'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

type Props = {
  placeholder: string
  disabled: boolean
}

export default function Search({ placeholder, disabled }: Props) {
  const searchParams = useSearchParams()
  const path = usePathname()
  const { replace } = useRouter()

  const handleSearch = async (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${path}?${params.toString()}`)
  }

  return (
    <div className='relative flex flex-1 flex-shrink-0 mb-4'>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
        disabled={disabled}
      />
      <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  )
}
