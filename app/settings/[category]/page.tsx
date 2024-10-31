import { db } from '@/database'
import { field } from '@/database/schema/field'
import { eq } from 'drizzle-orm'
import FieldList from '@/app/ui/field-list'
import Title from '@/app/components/title'

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
        <Title text='Settings' />
      </div>
      {fields && <FieldList fields={fields} />}
    </>
  )
}
