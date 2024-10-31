'use client'

import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from '../lib/actions'
import Input from '../components/input'
import ErrorMessage from '../components/error-message'
import Form from '../components/form'
import FormButton from '../components/form-button'

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    const formData = new FormData(event.currentTarget)
    console.log('signup form', formData)

    try {
      setIsLoading(true) // Set loading state
      const error = await signup(undefined, formData)
      if (error) {
        setErrorMessage(error)
      } else {
        console.log('Signup successful')
        router.push('/diaries')
      }
    } catch (error) {
      setErrorMessage('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} heading='Create an account'>
      <div className='w-full'>
        <Input label='Email' placeholder='Enter your email address' type='email'>
          <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
        </Input>
        <Input label='Password' placeholder='Enter password' type='password'>
          <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
        </Input>
        <div className='mt-4'>
          <label className='mb-3 mt-5 block text-xs font-medium text-gray-900' htmlFor='password'>
            Confirm password
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
              id='password'
              type='password'
              name='password'
              placeholder='Re-enter password'
              required
              minLength={6}
            />
            <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </div>
        </div>
      </div>
      <FormButton loading={loading} label='Create account' />
      <ErrorMessage errorMessage={errorMessage} />
    </Form>
  )
}
