'use client'

import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline'
import { authenticate } from '@/app/lib/actions'
import Input from '../components/input'
import ErrorMessage from '../components/error-message'
import FormButton from '../components/form-button'
import useAction from '../hooks/useAction'

export default function LoginForm() {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(authenticate)

  return (
    <form onSubmit={handleSubmit} ref={formRef} className='space-y-3 mt-10 w-full lg:w-1/2'>
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
