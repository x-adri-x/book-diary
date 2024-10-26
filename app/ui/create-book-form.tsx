'use client'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { createBook } from '../lib/actions'
import { useRouter } from 'next/navigation'

export default function CreateBookForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setErrorMessage(null)
    const formData = new FormData(event.currentTarget)
    setLoading(true)

    const response = await createBook(formData)
    if (response && response.error) {
      setErrorMessage(response.error)
    }
    if (response && response.success) {
      setLoading(false)
      router.push(response.success)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3 mt-10 w-full'>
      <div className='flex-1'>
        <h1 className={`mb-3 text-xl text-center`}>Create a new diary.</h1>
        <div className='w-full'>
          <div>
            <label className='mb-1 mt-5 block text-xs font-medium text-gray-900 text-left' htmlFor='author'>
              Author
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500'
                id='author'
                type='text'
                name='author'
                placeholder="Author's name"
                required
              />
            </div>
          </div>
          <div className='mt-4'>
            <label className='mb-1 mt-5 block text-xs font-medium text-gray-900 text-left' htmlFor='title'>
              Title
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500'
                id='title'
                type='text'
                name='title'
                placeholder='Title of the book'
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <div className='flex h-6 items-end space-x-1' aria-live='polite' aria-atomic='true'>
          {errorMessage && (
            <>
              <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
              <p className='text-sm text-red-500'>{errorMessage}</p>
            </>
          )}
        </div>
        <button
          className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md ${
            loading ? 'opacity-50' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Start a new book'}
        </button>
      </div>
    </form>
  )
}
