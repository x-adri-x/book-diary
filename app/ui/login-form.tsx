'use client'

import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { authenticate } from '@/app/lib/actions'
import { useRouter } from 'next/navigation'
import Input from '../components/input'
import ErrorMessage from '../components/error-message'
import FormButton from '../components/form-button'

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setErrorMessage(null)
    const formData = new FormData(event.currentTarget)

    try {
      setIsLoading(true)
      const error = await authenticate(undefined, formData)

      if (error) {
        setErrorMessage(error)
      }
      router.push('/diaries')
    } catch (error) {
      setErrorMessage('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3 mt-10 w-full'>
      <div className='flex-1'>
        <h1 className={`mb-3 text-xl text-center`}>Please log in to continue.</h1>
        <div className='w-full'>
          <Input label='Email' placeholder='Enter your email address' type='email'>
            <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </Input>

          <Input label='Password' placeholder='Enter password' type='password'>
            <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </Input>
        </div>
        <FormButton loading={loading} label='Log in' />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    </form>
  )
}
