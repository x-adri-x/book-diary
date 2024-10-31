'use client'

import { fieldSchema } from '@/database/schema/field'
import { selectContentSchema } from '@/database/schema/content'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { caveat } from '../fonts/fonts'
import Button from '../components/button'
import { editContent } from '../lib/actions'
import { usePathname, useSearchParams, useParams } from 'next/navigation'
import ErrorMessage from '../components/error-message'

type Field = z.infer<typeof fieldSchema>
type Content = z.infer<typeof selectContentSchema>
type FieldProps = {
  field: Field
  contents: Array<Content>
}

export default function Field({ field, contents }: FieldProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [accordionOpen, setAccordionOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const path = usePathname()
  const searchParams = useSearchParams()
  const categoryId = parseInt(searchParams?.get('category')!)
  const itemId = parseInt(searchParams?.get('item')!)

  const initialContent = useMemo(() => {
    return contents.find((content) => content.fieldId === field.id)?.text || ''
  }, [field.id, contents])

  const [content, _] = useState(initialContent)
  const [editedContent, setEditedContent] = useState(initialContent)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value)
  }

  const handleEdit = async () => {
    setErrorMessage(null)
    setLoading(true)

    const response = await editContent(editedContent, field.id!, categoryId, itemId, params, path)
    if (response && response.error) {
      setErrorMessage(response.error)
    }
    if (response && response.success) {
      setLoading(false)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedContent(content)
  }

  return (
    <>
      <details className={`p-4 text-2xl`} onClick={() => setAccordionOpen(!accordionOpen)}>
        <summary
          className={`list-outside list-none flex items-center justify-between w-full underline underline-offset-8 ${caveat.className}`}
        >
          {field.name}
          {!accordionOpen ? (
            <ChevronDownIcon className='h-5 w-5 inline-block' />
          ) : (
            <ChevronRightIcon className='h-5 w-5 inline-block' />
          )}
        </summary>
        <div className='mt-6 text-base'>
          {!isEditing ? (
            <>
              <p>{editedContent === '' ? 'Start adding notes...' : editedContent}</p>
              <Button label='Edit' loading={loading} onClick={() => setIsEditing(true)} />
            </>
          ) : (
            <>
              <textarea
                placeholder={content === '' ? 'Add some notes here' : ''}
                rows={6}
                className='p-2 border border-slate-300 rounded w-full'
                onClick={() => setIsEditing(true)}
                onChange={handleContentChange}
                value={editedContent}
              />
              <div className='flex gap-2'>
                <Button label='Save' loading={loading} onClick={handleEdit} />
                <Button label='Cancel' onClick={handleCancel} />
              </div>
            </>
          )}
        </div>
      </details>
      <ErrorMessage errorMessage={errorMessage} />
    </>
  )
}
