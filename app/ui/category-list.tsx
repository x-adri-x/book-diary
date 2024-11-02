'use client'

import { z } from 'zod'
import { selectCategorySchema } from '@/database/schema/category'
import { useState } from 'react'
import CreateCategoryForm from './create-category-form'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { addDash } from '@/app/utility/utility'
import { caveat } from '@/app/fonts/fonts'
import Button from '@/app/components/button'

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
      {!formOpen && <Button label='Add a new category' onClick={() => setFormOpen(true)} />}
    </>
  )
}
