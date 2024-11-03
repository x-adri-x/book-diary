'use client'

import { Dispatch, SetStateAction } from 'react'
import { createCategory } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import Form from '../components/form'
import FormButton from '../components/form-button'
import useAction from '../hooks/useAction'

type Props = {
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateCategoryForm({ setFormOpen }: Props) {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createCategory, () => setFormOpen(false))

  return (
    <Form onSubmit={handleSubmit} heading='Create a new category.'>
      <div className='w-full'>
        <Input label='Name' placeholder='Name of the category' />
      </div>
      <ErrorMessage errorMessage={errorMessage} />
      <FormButton loading={loading} label='Add a new category' />
    </Form>
  )
}
