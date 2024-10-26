import { db } from '@/database'
import { eq } from 'drizzle-orm'
import { category } from '@/database/schema/category'
import { book } from '@/database/schema/book'
import { book_category } from '@/database/schema/book-category'
import CategoryList from '@/app/ui/category-list'

type PageProps = {
  params: { id: string; title: string }
}

export default async function Page({ params }: PageProps) {
  const { id } = params
  let categories
  let title

  try {
    const bookRecord = await db.select().from(book)
    title = bookRecord[0].title
    categories = await db
      .select({ name: category.name, id: category.id })
      .from(category)
      .innerJoin(book_category, eq(book_category.categoryId, category.id))
      .where(eq(book_category.bookId, parseInt(id)))
  } catch (error) {}

  return (
    <div>
      <h1 className='text-2xl my-8 text-center'>{title}</h1>
      {categories && <CategoryList categories={categories} />}
    </div>
  )
}
