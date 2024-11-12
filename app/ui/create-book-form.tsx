'use client'

import { createBook } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import Form from '../components/form'
import FormButton from '@/app/components/form-button'
import useAction from '@/app/hooks/useAction'
import Button from '@/app/components/button'
import { useState } from 'react'

export default function CreateBookForm() {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createBook)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      {formOpen && (
        <Form onSubmit={handleSubmit} ref={formRef} onClose={() => setFormOpen(false)}>
          <div className='w-full'>
            <Input label='Author' placeholder="Author's name" />
            <Input label='Title' placeholder='Title of the book' />
          </div>
          <ErrorMessage errorMessage={errorMessage} />
          <FormButton label='Start a new book' loading={loading} />
        </Form>
      )}
      {!formOpen && <Button label='Start a new book' onClick={() => setFormOpen(true)} />}
    </>
  )
}
