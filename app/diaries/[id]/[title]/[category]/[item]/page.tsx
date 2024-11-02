import { db } from '@/database'
import { field } from '@/database/schema/field'
import { content } from '@/database/schema/content'
import { eq } from 'drizzle-orm'
import { removeDash } from '@/app/utility/utility'
import Field from '@/app/ui/field'
import Breadcrumb from '@/app/components/breadcrumb'
import Title from '@/app/components/title'
import ErrorMessage from '@/app/components/error-message'
import Link from 'next/link'

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
  let errorMessage

  try {
    fields = await db
      .select()
      .from(field)
      .where(eq(field.categoryId, parseInt(category)))
  } catch (error) {
    errorMessage = 'An error occcured while fetching fields.'
  }

  try {
    contents = await db
      .select({ text: content.text, fieldId: content.fieldId })
      .from(content)
      .where(eq(content.itemId, parseInt(item)))
    console.log(contents)
  } catch (error) {
    errorMessage = 'An error occured while fetching contents.'
  }

  return (
    <>
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
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {fields && fields?.length === 0 && (
        <div className='flex flex-col items-center'>
          <p>There are no fields in this category yet. Add fields to be able to start creating content.</p>
          <Link
            href={`/diaries/${id}/${title}/${params.category}/settings?category=${category}`}
            className={` text-slate-900 tracking-wide underline underline-offset-2 ml-2`}
          >
            Add fields now
          </Link>
        </div>
      )}
      {fields && contents && fields.map((field) => <Field key={field.id} field={field} contents={contents} />)}
    </>
  )
}
