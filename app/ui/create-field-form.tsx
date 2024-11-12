'use client'

import { useState } from 'react'
import { createField } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import FormButton from '../components/form-button'
import useAction from '../hooks/useAction'
import Form from '../components/form'
import Button from '../components/button'

export default function CreateFieldForm() {
  const [formOpen, setFormOpen] = useState(false)
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createField, () => setFormOpen(false))

  return (
    <>
      {formOpen && (
        <Form onSubmit={handleSubmit} ref={formRef} onClose={() => setFormOpen(false)}>
          <div className='w-full'>
            <Input label='Name' placeholder='Field name' />
          </div>
          <ErrorMessage errorMessage={errorMessage} />
          <FormButton label='Add a new field' loading={loading} />
        </Form>
      )}
      {!formOpen && <Button label='Add a new field' onClick={() => setFormOpen(true)} />}
    </>
  )
}
