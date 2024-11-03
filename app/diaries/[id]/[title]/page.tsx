import { db } from '@/database'
import { eq } from 'drizzle-orm'
import { category, selectCategorySchema } from '@/database/schema/category'
import { book_category } from '@/database/schema/book-category'
import CategoryList from '@/app/ui/category-list'
import { removeDash } from '@/app/utility/utility'
import Breadcrumb from '@/app/components/breadcrumb'
import Title from '@/app/components/title'
import { z } from 'zod'
import ErrorMessage from '@/app/components/error-message'

type Props = {
  params: { id: string; title: string }
}

type Category = z.infer<typeof selectCategorySchema>

export default async function Page({ params }: Props) {
  const { id, title } = params
  let categories: Array<Category> | null = null
  let errorMessage: string | null = null

  try {
    categories = await db
      .select({ name: category.name, id: category.id })
      .from(category)
      .innerJoin(book_category, eq(book_category.categoryId, category.id))
      .where(eq(book_category.bookId, parseInt(id)))
  } catch (error) {
    if (error instanceof Error) errorMessage = error.message
    errorMessage = 'An error occured while fetching categories.'
  }

  return (
    <>
      <Title text={removeDash(title)} />
      <Breadcrumb routes={[]} />
      {categories && <CategoryList categories={categories} />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </>
  )
}
