import { db } from '@/database'
import { eq } from 'drizzle-orm'
import { category } from '@/database/schema/category'
import { book_category } from '@/database/schema/book-category'
import CategoryList from '@/app/ui/category-list'
import { removeDash } from '@/app/utility/utility'
import Breadcrumb from '@/app/components/breadcrumb'

type PageProps = {
  params: { id: string; title: string }
}

export default async function Page({ params }: PageProps) {
  const { id, title } = params
  let categories

  try {
    categories = await db
      .select({ name: category.name, id: category.id })
      .from(category)
      .innerJoin(book_category, eq(book_category.categoryId, category.id))
      .where(eq(book_category.bookId, parseInt(id)))
  } catch (error) {}

  return (
    <div>
      <h1 className={`text-2xl mb-6 mt-2 text-center font-bold uppercase tracking-wider`}>{removeDash(title)}</h1>
      <Breadcrumb routes={[]} />
      {categories && <CategoryList categories={categories} />}
    </div>
  )
}
