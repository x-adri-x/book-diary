'use client'

import { useState } from 'react'
import { createCategory } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import Form from '../components/form'
import FormButton from '../components/form-button'
import useAction from '../hooks/useAction'
import Button from '../components/button'

export default function CreateCategoryForm() {
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createCategory, () => setFormOpen(false))
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      {formOpen && (
        <Form onSubmit={handleSubmit} ref={formRef} onClose={() => setFormOpen(false)}>
          <div className='w-full'>
            <Input label='Name' placeholder='Name of the category' />
          </div>
          <ErrorMessage errorMessage={errorMessage} />
          <FormButton loading={loading} label='Add a new category' />
        </Form>
      )}
      {!formOpen && <Button label='Add a new category' onClick={() => setFormOpen(true)} />}
    </>
  )
}
