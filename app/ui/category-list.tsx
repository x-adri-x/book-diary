'use client'

import { z } from 'zod'
import { selectCategorySchema } from '@/database/schema/category'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import CreateCategoryForm from './create-category-form'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { addDash } from '../utility/utility'

type Category = z.infer<typeof selectCategorySchema>
interface CategoryListProps {
  categories: Category[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState(false)
  const path = usePathname()

  return (
    <>
      <details
        className='p-4 border-x border-slate-300 text-base shadow-md bg-slate-100 uppercase tracking-wider'
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <summary className='pl-4 list-outside ml-4 list-none flex align-middle justify-between tracking-widest'>
          Categories
          {accordionOpen ? (
            <ChevronDownIcon className='h-5 w-5 inline-block' />
          ) : (
            <ChevronRightIcon className='h-5 w-5 inline-block' />
          )}
        </summary>
        {categories.map((category) => (
          <Link
            key={category.id}
            className='block p-4 my-4 shadow-md w-full uppercase text-sm'
            href={{
              pathname: `${path}/${addDash(category.name.toLowerCase())}`,
              query: { category: category.id },
            }}
          >
            {category.name}
          </Link>
        ))}
      </details>
      {formOpen && <CreateCategoryForm setFormOpen={setFormOpen} />}
      {!formOpen && (
        <button
          className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md`}
          onClick={() => setFormOpen(true)}
        >
          Add a new category
        </button>
      )}
    </>
  )
}
