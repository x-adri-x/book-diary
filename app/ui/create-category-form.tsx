'use client'

import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { createCategory } from '../lib/actions'
import { usePathname } from 'next/navigation'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'

type CreateCategoryFormProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateCategoryForm({ setFormOpen }: CreateCategoryFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const pathname = usePathname()
  const bookId = pathname.split('/')[2]

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setErrorMessage(null)
    const formData = new FormData(event.currentTarget)
    setLoading(true)

    const response = await createCategory(formData, bookId, pathname)
    if (response && response.error) {
      setErrorMessage(response.error)
    }
    if (response && response.success) {
      setLoading(false)
      formRef.current?.reset()
      setFormOpen(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} className='space-y-3 mt-10 w-full'>
      <div className='flex-1'>
        <h1 className={`mb-3 text-xl text-center`}>Create a new category.</h1>
        <div className='w-full'>
          <Input label='Name' placeholder='Name of the category' />
        </div>
        <ErrorMessage errorMessage={errorMessage} />
        <button
          className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md ${
            loading ? 'opacity-50' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Add a new category'}
        </button>
      </div>
    </form>
  )
}
