'use client'

import { createBook } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import Form from '../components/form'
import FormButton from '../components/form-button'
import useAction from '../hooks/useAction'

export default function CreateBookForm() {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createBook)

  return (
    <Form onSubmit={handleSubmit} ref={formRef} heading='Create a new diary.'>
      <div className='w-full'>
        <Input label='Author' placeholder="Author's name" />
        <Input label='Title' placeholder='Title of the book' />
      </div>
      <ErrorMessage errorMessage={errorMessage} />
      <FormButton label='Start a new book' loading={loading} />
    </Form>
  )
}
