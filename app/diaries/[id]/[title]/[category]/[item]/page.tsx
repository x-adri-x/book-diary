import { caveat } from '@/app/fonts/fonts'
import { db } from '@/database'
import { field } from '@/database/schema/field'
import { content } from '@/database/schema/content'
import { eq } from 'drizzle-orm'
import { removeDash } from '@/app/utility/utility'
import Field from '@/app/ui/field'
import Breadcrumb from '@/app/components/breadcrumb'
import Title from '@/app/components/title'

export default async function Item({
  params,
  searchParams,
}: {
  params: { id: string; title: string; category: string; item: string }
  searchParams: { category: string; item: string }
}) {
  const { id, title } = params
  const { category, item } = searchParams
  let fields
  let contents

  try {
    fields = await db
      .select()
      .from(field)
      .where(eq(field.categoryId, parseInt(category)))
  } catch (error) {
    console.log(error)
  }

  try {
    contents = await db
      .select({ text: content.text, fieldId: content.fieldId })
      .from(content)
      .where(eq(content.itemId, parseInt(item)))
    console.log(contents)
  } catch (error) {
    console.log(error)
  }

  return (
    <div className='lg:flex lg:flex-col lg:w-3/5 lg:min-h-96 lg:max-w-screen-sm lg:p-8 lg:shadow-lg'>
      <Title text={removeDash(params.item)} />
      <Breadcrumb
        routes={[
          { path: `/diaries/${id}/${title}`, label: 'Categories' },
          {
            path: `/diaries/${id}/${title}/${params.category}?category=${category}`,
            label: `${removeDash(params.category)}`,
          },
        ]}
      />
      {fields && contents && fields.map((field) => <Field key={field.id} field={field} contents={contents} />)}
    </div>
  )
}
