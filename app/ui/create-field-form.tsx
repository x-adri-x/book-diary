'use client'

import { Dispatch, SetStateAction } from 'react'
import { createField } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import FormButton from '../components/form-button'
import useAction from '../hooks/useAction'

type CreateFieldFormProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateFieldForm({ setFormOpen }: CreateFieldFormProps) {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createField, () => setFormOpen(false))

  return (
    <form onSubmit={handleSubmit} ref={formRef} className='space-y-3 mt-10 w-full'>
      <div className='flex-1'>
        <h1 className={`mb-3 text-xl text-center`}>Create a new field.</h1>
        <div className='w-full'>
          <Input label='Name' placeholder='Field name' />
        </div>
        <ErrorMessage errorMessage={errorMessage} />
        <FormButton label='Add a new field' loading={loading} />
      </div>
    </form>
  )
}
