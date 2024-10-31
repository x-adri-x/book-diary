'use client'

import { z } from 'zod'
import { selectCategorySchema } from '@/database/schema/category'
import { useState } from 'react'
import CreateCategoryForm from './create-category-form'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { addDash } from '../utility/utility'
import { caveat } from '../fonts/fonts'

type Category = z.infer<typeof selectCategorySchema>
interface CategoryListProps {
  categories: Category[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const path = usePathname()

  return (
    <>
      <p className={`${caveat.className} text-start underline text-2xl`}>Categories:</p>
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
