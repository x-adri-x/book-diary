import { caveat } from '@/app/fonts/fonts'
import { db } from '@/database'
import { field } from '@/database/schema/field'
import { eq } from 'drizzle-orm'
import { removeDash } from '@/app/utility/utility'
import FieldList from '@/app/ui/field-list'

export default async function Settings({
  params,
  searchParams,
}: {
  params: { id: string; title: string; category: string }
  searchParams: { category: string }
}) {
  const { category } = searchParams
  let fields

  try {
    fields = await db
      .select()
      .from(field)
      .where(eq(field.categoryId, parseInt(category)))
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <div className='flex items-center'>
        <p className='font-slate-200 text-2xl w-full capitalize my-6'>{removeDash(params.category)}</p>
      </div>
      {fields && <FieldList fields={fields} />}
    </>
  )
}
