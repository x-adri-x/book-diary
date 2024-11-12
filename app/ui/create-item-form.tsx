'use client'

import { useState } from 'react'
import { createItem } from '../lib/actions'
import ErrorMessage from '../components/error-message'
import Input from '../components/input'
import FormButton from '../components/form-button'
import Form from '../components/form'
import useAction from '../hooks/useAction'
import Button from '../components/button'

export default function CreateItemForm() {
  const [formOpen, setFormOpen] = useState(false)
  const { loading, errorMessage, handleSubmit, formRef } = useAction(createItem, () => setFormOpen(false))

  return (
    <>
      {formOpen && (
        <Form onSubmit={handleSubmit} ref={formRef} onClose={() => setFormOpen(false)}>
          <div className='w-full'>
            <Input label='Name' placeholder="Item's name" />
          </div>
          <ErrorMessage errorMessage={errorMessage} />
          <FormButton loading={loading} label='Create a new item' />
        </Form>
      )}
      {!formOpen && <Button label='Add a new item' loading={false} onClick={() => setFormOpen(true)} />}
    </>
  )
}
