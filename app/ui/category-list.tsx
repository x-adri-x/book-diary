'use client'

import { z } from 'zod'
import { selectCategorySchema } from '@/database/schema/category'
import CreateCategoryForm from './create-category-form'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { addDash } from '@/app/utility/utility'

type Category = z.infer<typeof selectCategorySchema>
type Props = {
  categories: Category[]
}

export default function CategoryList({ categories }: Props) {
  const path = usePathname()

  return (
    <>
      <CreateCategoryForm />
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
    </>
  )
}
