'use client'

import { fieldSchema } from '@/database/schema/field'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
import { useState } from 'react'
import { z } from 'zod'

type Field = z.infer<typeof fieldSchema>
type FieldProps = {
  field: Field
  children?: React.ReactNode
}

export default function Field({ field, children }: FieldProps) {
  const [accordionOpen, setAccordionOpen] = useState(false)
  return (
    <details
      className='p-4 border-x border-slate-300 text-base shadow-md bg-slate-100 uppercase tracking-wider'
      onClick={() => setAccordionOpen(!accordionOpen)}
    >
      <summary className='pl-4 list-outside ml-4 list-none flex align-middle justify-between tracking-widest'>
        {field.name}
        {accordionOpen ? (
          <ChevronDownIcon className='h-5 w-5 inline-block' />
        ) : (
          <ChevronRightIcon className='h-5 w-5 inline-block' />
        )}
      </summary>
      {/* {content} */}
    </details>
  )
}
