import { caveat } from '@/app/fonts/fonts'
import { db } from '@/database'
import { field } from '@/database/schema/field'
import { eq } from 'drizzle-orm'
import { removeDash } from '@/app/utility/utility'
import Field from '@/app/ui/field'

export default async function Item({
  params,
  searchParams,
}: {
  params: { id: string; title: string; category: string; item: number }
  searchParams: { category: string }
}) {
  const { title } = params
  const { category } = searchParams
  let fields

  try {
    fields = await db
      .select()
      .from(field)
      .where(eq(field.categoryId, parseInt(category)))
  } catch (error) {}

  return (
    <>
      <h1 className={`capitalize text-2xl my-8 text-center ${caveat.className}`}>{removeDash(title)}</h1>
      <div className='flex items-center'>
        <p className='font-slate-200 text-2xl w-full capitalize my-6'>{removeDash(params.category)}</p>
      </div>
      <h2 className='my-8 text-xl uppercase'>Your {removeDash(params.category)} items</h2>
      {fields && fields.map((field) => <Field field={field} />)}
    </>
  )
}
