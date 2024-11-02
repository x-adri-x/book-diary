import { db } from '@/database'
import { field } from '@/database/schema/field'
import { eq } from 'drizzle-orm'
import FieldList from '@/app/ui/field-list'
import Title from '@/app/components/title'
import Breadcrumb from '@/app/components/breadcrumb'
import ErrorMessage from '@/app/components/error-message'

export default async function Settings({
  params,
  searchParams,
}: {
  params: { id: string; title: string; category: string }
  searchParams: { category: string }
}) {
  const { id, title } = params
  const { category } = searchParams
  let fields
  let errorMessage

  try {
    fields = await db
      .select()
      .from(field)
      .where(eq(field.categoryId, parseInt(category)))
  } catch (error) {
    errorMessage = 'An error occured while fetching fields for category.'
  }

  return (
    <div>
      <div className='text-center'>
        <Title text='Settings' />
      </div>
      <Breadcrumb routes={[{ path: `/diaries/${parseInt(id)}/${title}`, label: 'Categories' }]} />
      {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : fields && <FieldList fields={fields} />}
    </div>
  )
}
