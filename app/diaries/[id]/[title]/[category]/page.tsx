import { caveat } from '@/app/fonts/fonts'
import ItemsList from '@/app/ui/items-list'
import { db } from '@/database'
import { item } from '@/database/schema/item'
import { sql } from 'drizzle-orm'
import { removeDash } from '@/app/utility/utility'
import CategorySettings from '@/app/ui/category-setting'

export default async function Category({
  params,
  searchParams,
}: {
  params: { id: string; title: string; category: string }
  searchParams: { category: string }
}) {
  const { id, title } = params
  const { category } = searchParams
  let items

  try {
    items = await db
      .select()
      .from(item)
      .where(sql`${item.bookId} = ${parseInt(id)} and ${item.categoryId} = ${category}`)
  } catch (error) {}

  return (
    <div className='flex-1'>
      <h1 className={`capitalize text-2xl my-8 text-center ${caveat.className}`}>{removeDash(title)}</h1>
      <div className='flex items-center'>
        <p className='font-slate-200 text-2xl w-full capitalize my-6'>{removeDash(params.category)}</p>
        <CategorySettings />
      </div>
      <h2 className='my-8 text-xl uppercase'>Your {removeDash(params.category)} items</h2>
      {items && <ItemsList items={items} />}
    </div>
  )
}
