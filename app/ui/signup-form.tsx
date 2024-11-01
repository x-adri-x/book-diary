'use client'

import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline'
import { signup } from '../lib/actions'
import Input from '../components/input'
import ErrorMessage from '../components/error-message'
import Form from '../components/form'
import FormButton from '../components/form-button'
import useAction from '../hooks/useAction'
import Link from 'next/link'

export default function SignUpForm() {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(signup)

  return (
    <div className='h-full lg:max-w-3xl lg:shadow-lg p-8 lg:rounded-lg lg:flex lg:flex-col lg:items-center'>
      <Form onSubmit={handleSubmit} ref={formRef} heading='Create an account'>
        <div className='w-full'>
          <Input label='Email' placeholder='Enter your email address' type='email'>
            <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </Input>
          <Input label='Password' placeholder='Enter password' type='password'>
            <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </Input>
          <div className='mt-4'>
            <label className='mb-3 mt-5 block text-xs font-medium text-gray-900' htmlFor='confirm-password'>
              Confirm password
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                id='confirm-password'
                type='password'
                name='confirm-password'
                placeholder='Re-enter password'
                required
                minLength={6}
              />
              <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
        </div>
        <FormButton loading={loading} label='Create account' />
        <div className='flex items-center'>
          <ErrorMessage errorMessage={errorMessage} />
          {errorMessage && errorMessage === 'Email is already registered.' && (
            <Link href='/' className={` text-slate-900 tracking-wide underline underline-offset-2 ml-2`}>
              Go to login
            </Link>
          )}
        </div>
      </Form>
    </div>
  )
}
