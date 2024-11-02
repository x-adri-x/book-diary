'use client'

import { z } from 'zod'
import { selectFieldSchema } from '@/database/schema/field'
import { FaceSmileIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useRef } from 'react'
import CreateFieldForm from './create-field-form'
import Input from '../components/input'
import ErrorMessage from '../components/error-message'
import React from 'react'
import { editField, deleteField } from '@/app/lib/actions'
import { usePathname } from 'next/navigation'
import { caveat } from '../fonts/fonts'

type Field = z.infer<typeof selectFieldSchema>
interface FieldListProps {
  fields: Field[]
}

export default function FieldList({ fields }: FieldListProps) {
  const [editingItemId, setEditingItemId] = useState<number | null>(null)
  const [createFormOpen, setCreateFormOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [actionType, setActionType] = useState('')
  const path = usePathname()
  const formRef = useRef<HTMLFormElement>(null)

  const handleClick = (id: number, type: string) => {
    setEditingItemId((prev) => (prev === id ? null : id))
    setActionType(type)
  }

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>, id: number) => {
    setErrorMessage(null)
    const formData = new FormData(event.currentTarget)
    setLoading(true)

    const response = await editField(formData, id, path)
    if (response && response.error) {
      setErrorMessage(response.error)
    }
    if (response && response.success) {
      setLoading(false)
      formRef.current?.reset()
      setEditingItemId(null)
    }
  }

  const handleDelete = async (id: number) => {
    setErrorMessage(null)
    setLoading(true)

    const response = await deleteField(id, path)
    if (response && response.error) {
      setErrorMessage(response.error)
    }
    if (response && response.success) {
      setLoading(false)
    }
  }

  return (
    <>
      {fields.length === 0 ? (
        <div className='mt-8 flex flex-col items-center'>
          <p className='normal-case my-4 text-center'>
            There are no fields in this category yet. Let's add some, so you can start creating content.
          </p>
          <FaceSmileIcon className='w-8 h-8' />
        </div>
      ) : (
        <p className={`${caveat.className} text-start underline text-2xl`}>Fields:</p>
      )}

      {fields.map((field) => (
        <React.Fragment key={field.name}>
          <div className='p-4 mt-4 shadow-md w-full uppercase text-base flex items-center justify-between bg-slate-50'>
            {field.name}
            <div className='flex'>
              <PencilIcon
                className='w-10 h-10 p-2 border border-slate-400 mr-2 rounded-md'
                onClick={() => handleClick(field.id, 'edit')}
              />
              <XMarkIcon
                className='w-10 h-10 p-2 border border-slate-400 rounded-md'
                onClick={() => handleClick(field.id, 'delete')}
              />
            </div>
          </div>

          <form
            onSubmit={(e) => handleEdit(e, field.id)}
            ref={formRef}
            className={`space-y-3 w-full bg-slate-100 shadow-md overflow-hidden transition-all ease-in-out duration-1000 ${editingItemId === field.id && actionType === 'edit' ? 'max-h-30rem' : 'max-h-0'}`}
          >
            <div className={`flex-1 bg-slate-100 p-4`}>
              <h1 className={`mb-3 text-xl`}>Edit field</h1>
              <div className='w-full'>
                <Input label='Name' placeholder='Field name' />
              </div>
              <ErrorMessage errorMessage={errorMessage} />
              <button
                className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md ${
                  loading ? 'opacity-50' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Edit field'}
              </button>
            </div>
          </form>

          <div
            className={`space-y-3 w-full bg-slate-100 text-center shadow-md overflow-hidden transition-all ease-in-out duration-1000 ${editingItemId === field.id && actionType === 'delete' ? 'max-h-30rem' : 'max-h-0'}`}
          >
            <p className='px-4 text-red-500 font-bold'>Are you sure you want to delete this field?</p>
            <p className='px-4'>All related content will be deleted from the items.</p>
            <button
              className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md ${
                loading ? 'opacity-50' : ''
              }`}
              disabled={loading}
              onClick={() => handleDelete(field.id)}
            >
              {loading ? 'Creating...' : 'Yes, delete field'}
            </button>
          </div>
        </React.Fragment>
      ))}

      {createFormOpen && <CreateFieldForm setFormOpen={setCreateFormOpen} />}
      {!createFormOpen && (
        <button
          className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md`}
          onClick={() => setCreateFormOpen(true)}
        >
          Add a new field
        </button>
      )}
    </>
  )
}
