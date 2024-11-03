'use server'

import { db } from '@/database'
import { book, insertBookSchema } from '@/database/schema/book'
import { user } from '@/database/schema/user'
import { category, insertCategorySchema } from '@/database/schema/category'
import { item } from '@/database/schema/item'
import { field } from '@/database/schema/field'
import { content } from '@/database/schema/content'
import { book_category } from '@/database/schema/book-category'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { ReadonlyURLSearchParams, redirect } from 'next/navigation'
import { addDash } from '../utility/utility'

interface Params {
  [key: string]: string | string[]
}

export async function createBook(formData: FormData, searchParams: ReadonlyURLSearchParams, params: Params) {
  const session = await auth()
  let bookId: number
  let title: string

  if (session && session.user) {
    if (!session.user.id) return { error: 'User was not found.' }
    const userId = parseInt(session.user.id)

    const data = insertBookSchema.parse({
      title: formData.get('title'),
      author: formData.get('author'),
      userId: userId,
    })

    try {
      const result = await db.select().from(book)

      // if no book was added before, add the default categories to db
      if (result.length === 0) {
        await db.insert(category).values({ name: 'Characters' })
        await db.insert(category).values({ name: 'Notes' })
      }

      const insertedIds = await db
        .insert(book)
        .values({ title: data.title, author: data.author, userId: userId })
        .returning({ insertedId: book.id })

      const characterCategoryIds = await db
        .select({ id: category.id })
        .from(category)
        .where(eq(category.name, 'Characters'))
      const notesCategoryIds = await db.select({ id: category.id }).from(category).where(eq(category.name, 'Notes'))

      bookId = insertedIds[0].insertedId
      title = addDash(data.title.toLowerCase().trim())

      await db.insert(book_category).values({ bookId: bookId, categoryId: characterCategoryIds[0].id })
      await db.insert(book_category).values({ bookId: bookId, categoryId: notesCategoryIds[0].id })
      revalidatePath('/diaries')
    } catch (error) {
      return { error: 'An error occurred while creating the book.' }
    }
    //TODO: I will might want to change, and not involve the book id in the path
    redirect(`/diaries/${bookId}/${title}`)
  }
  return null
}

export async function createCategory(formData: FormData, searchParams: ReadonlyURLSearchParams, params: Params) {
  const data = insertCategorySchema.parse({
    name: formData.get('name'),
  })

  if (typeof params.id !== 'string') return { error: 'A single ID must be provided for book record.' }
  if (typeof params.title !== 'string') return { error: 'A single title must be provided for book record.' }

  try {
    const insertedIds = await db.insert(category).values({ name: data.name }).returning({ insertedId: category.id })

    await db.insert(book_category).values({ bookId: parseInt(params.id), categoryId: insertedIds[0].insertedId })
    revalidatePath(`/diaries/${params.id}/${params.title}`)
    return { success: `Category was successfully created.` }
  } catch (error) {
    return { error: 'An error occurred while creating the category.' }
  }
}

export async function createItem(
  formData: FormData,
  searchParams: { category: string },
  params: { id: string; title: string; category: string }
) {
  if (!params) return { error: 'Parameters must be provided.' }
  if (typeof formData.get('name') !== 'string') return { error: 'A name has to be provided for the item.' }
  const name = formData.get('name')
  const { id, title, category } = params

  try {
    await db
      .insert(item)
      .values({
        name: name as string,
        categoryId: parseInt(searchParams.category),
        bookId: parseInt(id),
      })
      .returning({ insertedId: item.id })
    revalidatePath(`/diaries/${id}/${title}/${category}?category=${searchParams.category}`)
    return { success: `Item was successfully created.` }
  } catch (error) {
    return { error: 'An error occurred while creating this item.' }
  }
}

export async function createField(formData: FormData, searchParams: { category: string }, params: Params) {
  const { id, title, category } = params!
  try {
    await db
      .insert(field)
      .values({ name: formData.get('name') as string, categoryId: parseInt(searchParams.category) })
      .returning({ insertedId: field.id })
    revalidatePath(`/diaries/${id}/${title}/${category}/settings?category=${searchParams.category}`)
    return { success: `Field was successfully created.` }
  } catch (error) {
    return { error: 'An error occurred while creating field.' }
  }
}

export async function editField(formData: FormData, fieldId: number, path: string) {
  const name = formData.get('name')
  try {
    await db
      .update(field)
      .set({ name: name as string })
      .where(eq(field.id, fieldId))
    revalidatePath(path)
    return { success: `Field was successfully updated.` }
  } catch (error) {
    return { error: 'An error occurred while updating field.' }
  }
}

export async function deleteField(fieldId: number, path: string) {
  try {
    await db.delete(field).where(eq(field.id, fieldId))
    revalidatePath(path)
    return { success: `Field was successfully deleted.` }
  } catch (error) {
    return { error: 'An error occurred while updating field.' }
  }
}

export async function editContent(
  text: string,
  fieldId: number,
  categoryId: number,
  itemId: number,
  params: Params,
  path: string
) {
  try {
    const record = await db
      .select({ text: content.text })
      .from(content)
      .where(sql`${content.fieldId} = ${fieldId} and ${content.itemId} = ${itemId}`)

    if (record.length === 0) {
      await db.insert(content).values({ text: text, fieldId: fieldId, itemId: itemId })
      revalidatePath(`${path.replace(`/${params.item}`, `?category=${categoryId}&item=${itemId}`)}`)
      return { success: `Content was successfully created.` }
    } else {
      await db
        .update(content)
        .set({ text: text })
        .where(sql`${content.fieldId} = ${fieldId} and ${content.itemId} = ${itemId}`)
    }
    revalidatePath(`${path.replace(`/${params.item}`, `?category=${categoryId}&item=${itemId}`)}`)
    return { success: 'Updating of content was successful.' }
  } catch (error) {
    console.log(error)
    return { error: 'An error occurred while creating content.' }
  }
}

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
    })
    redirect('/diaries')
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function signup(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm-password')!
  const email = formData.get('email') as string

  if (password !== confirmPassword) {
    return { error: 'The passwords entered do not match. Please try again.' }
  }

  try {
    const existingUser = await db.select().from(user).where(eq(user.email, email))
    if (existingUser.length !== 0) {
      return { error: 'Email is already registered.' }
    }

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    const insertedId = await db
      .insert(user)
      .values({ password: hashedPassword, email: email })
      .onConflictDoNothing()
      .returning({ insertedId: user.id })

    if (!insertedId) {
      return { error: 'Failed to register. Please try again later.' }
    }
  } catch (error) {
    console.error(error)
    return { error: 'Password encryption failed.' }
  }
  redirect('/diaries')
}
