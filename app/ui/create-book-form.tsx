'use client'

import { useState } from 'react'
import { createBook } from '../lib/actions'
import { useRouter } from 'next/navigation'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'

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
          <Input label='Author' placeholder="Author's name" />
          <Input label='Title' placeholder='Title of the book' />
        </div>
        <ErrorMessage errorMessage={errorMessage} />
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
