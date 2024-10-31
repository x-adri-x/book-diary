'use client'

import { Dispatch, SetStateAction } from 'react'
import { createField } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import FormButton from '../components/form-button'
import useAction from '../hooks/useAction'
import Form from '../components/form'

type CreateFieldFormProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateFieldForm({ setFormOpen }: CreateFieldFormProps) {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createField, () => setFormOpen(false))

  return (
    <Form onSubmit={handleSubmit} ref={formRef} heading='Create a new field.'>
      <div className='w-full'>
        <Input label='Name' placeholder='Field name' />
      </div>
      <ErrorMessage errorMessage={errorMessage} />
      <FormButton label='Add a new field' loading={loading} />
    </Form>
  )
}
