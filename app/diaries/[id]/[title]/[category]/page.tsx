import ItemsList from '@/app/ui/items-list'
import { db } from '@/database'
import { item } from '@/database/schema/item'
import { sql } from 'drizzle-orm'

export default async function Category({
  params,
  searchParams,
}: {
  params: { id: string; title: string; category: string }
  searchParams: { category: string }
}) {
  const { id } = params
  const { category } = searchParams
  let items
  let title

  try {
    items = await db
      .select()
      .from(item)
      .where(sql`${item.bookId} = ${parseInt(id)} and ${item.categoryId} = ${category}`)
  } catch (error) {}
  return (
    <>
      <h1 className='capitalize text-2xl my-8 text-center'>{params.title.replace('-', ' ')}</h1>
      <p className='font-slate-200 text-2xl w-full'>{params.category}</p>
      {items && <ItemsList items={items} />}
    </>
  )
}
