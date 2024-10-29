'use client'

import { Dispatch, SetStateAction } from 'react'
import { createItem } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import FormButton from '../components/form-button'
import Form from '../components/form'
import useAction from '../hooks/useAction'

type CreateItemFormProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateItemForm({ setFormOpen }: CreateItemFormProps) {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createItem, () => setFormOpen(false))

  return (
    <Form onSubmit={handleSubmit} heading='Add a new item.'>
      <div className='w-full'>
        <Input label='Name' placeholder="Item's name" />
      </div>
      <ErrorMessage errorMessage={errorMessage} />
      <FormButton loading={loading} label='Create a new item' />
    </Form>
  )
}
