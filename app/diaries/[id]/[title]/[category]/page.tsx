import ItemsList from '@/app/ui/items-list'
import { db } from '@/database'
import { item, selectItemSchema } from '@/database/schema/item'
import { sql } from 'drizzle-orm'
import { removeDash } from '@/app/utility/utility'
import CategorySettings from '@/app/ui/category-setting'
import Search from '@/app/ui/search'
import Breadcrumb from '@/app/components/breadcrumb'
import { z } from 'zod'

type Item = z.infer<typeof selectItemSchema>
type Props = {
  params: { id: string; title: string; category: string }
  searchParams: { category: string; query: string }
}

export default async function Category({ params, searchParams }: Props) {
  const { id, title } = params
  const { category, query } = searchParams
  let items: Array<Item> | null = null
  let disabled = false

  try {
    items = await db
      .select()
      .from(item)
      .where(sql`${item.bookId} = ${parseInt(id)} and ${item.categoryId} = ${category}`)
    if (query) items = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    if (items.length === 0 && query === '') disabled = true
  } catch (error) {}

  return (
    <>
      <div className='flex items-center'>
        <p className='font-slate-200 text-2xl w-full uppercase my-6 tracking-wider font-bold'>
          {removeDash(params.category)}
        </p>
        <CategorySettings />
      </div>
      <Breadcrumb routes={[{ path: `/diaries/${id}/${title}`, label: 'Categories' }]} />
      <Search placeholder='Search items in this category' disabled={disabled} />
      {items && <ItemsList items={items} />}
    </>
  )
}
