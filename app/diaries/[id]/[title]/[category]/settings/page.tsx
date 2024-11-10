import { db } from '@/database'
import { field, selectFieldSchema } from '@/database/schema/field'
import { eq } from 'drizzle-orm'
import FieldList from '@/app/ui/field-list'
import Title from '@/app/components/title'
import Breadcrumb from '@/app/components/breadcrumb'
import ErrorMessage from '@/app/components/error-message'
import { z } from 'zod'

type Field = z.infer<typeof selectFieldSchema>
type Props = {
  params: Promise<{ id: string; title: string; category: string }>
  searchParams: Promise<{ category: string }>
}

export default async function Settings(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { id, title } = params
  const { category } = searchParams

  let fields: Array<Field> | null = null
  let errorMessage: string | null = null

  try {
    fields = await db
      .select()
      .from(field)
      .where(eq(field.categoryId, parseInt(category)))
  } catch (error) {
    if (error instanceof Error) errorMessage = error.message
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
