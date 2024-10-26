'use client'

import { useState } from 'react'
import { createBook } from '../lib/actions'
import { useRouter } from 'next/navigation'
import ErrorMessage from '../components/error-message'

export default function CreateItemForm() {
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
        <h1 className={`mb-3 text-xl text-center`}>Add a new item.</h1>
        <div className='w-full'>
          <div>
            <label className='mb-1 mt-5 block text-xs font-medium text-gray-900 text-left' htmlFor='name'>
              Name
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500'
                id='name'
                type='text'
                name='name'
                placeholder="Item's name"
                required
              />
            </div>
          </div>
        </div>
        <ErrorMessage errorMessage={errorMessage} />
        <button
          className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md ${
            loading ? 'opacity-50' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create a new item'}
        </button>
      </div>
    </form>
  )
}
