'use server'

import { db } from '@/database'
import { book } from '@/database/schema/book'
import { user } from '@/database/schema/user'
import { category } from '@/database/schema/category'
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
import { redirect } from 'next/navigation'
import { addDash } from '../utility/utility'
import { SearchParamsObject } from '../types/types'
import { Params } from 'next/dist/server/request/params'
import {
  CreateBookSchema,
  CreateCategorySchema,
  CreateFieldSchema,
  CreateItemSchema,
  SignupSchema,
} from '../utility/validation/ui_contract'
import zodSchemaValidator from '@/app/utility/validation/validator'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createBook(formData: FormData, searchParams: SearchParamsObject, params: Params) {
  const session = await auth()
  let bookId: number
  let title: string

  if (session && session.user) {
    if (!session.user.id) return { error: 'User was not found.' }
    const userId = parseInt(session.user.id)

    const parsed = zodSchemaValidator({ formData, schema: CreateBookSchema })
    if (parsed) {
      try {
        const result = await db.select().from(book)

        // if no book was added before, add the default categories to db
        if (result.length === 0) {
          await db.insert(category).values({ name: 'Characters' })
          await db.insert(category).values({ name: 'Notes' })
        }

        const insertedIds = await db
          .insert(book)
          .values({ title: parsed.title, author: parsed.author, userId: userId })
          .returning({ insertedId: book.id })

        const characterCategoryIds = await db
          .select({ id: category.id })
          .from(category)
          .where(eq(category.name, 'Characters'))
        const notesCategoryIds = await db.select({ id: category.id }).from(category).where(eq(category.name, 'Notes'))

        bookId = insertedIds[0].insertedId
        title = addDash(parsed.title.toLowerCase().trim())

        await db.insert(book_category).values({ bookId: bookId, categoryId: characterCategoryIds[0].id })
        await db.insert(book_category).values({ bookId: bookId, categoryId: notesCategoryIds[0].id })
        revalidatePath('/diaries')
      } catch (error) {
        if (error instanceof Error) return { error: error.message }
        return { error: 'An error occurred while creating the book.' }
      }
      //TODO: I will might want to change, and not involve the book id in the path
      redirect(`/diaries/${bookId}/${title}`)
    }
  }
  return null
}

export async function createCategory(formData: FormData, _searchParams: SearchParamsObject, params: Params) {
  const data = Object.fromEntries(formData)

  if (typeof params.id !== 'string') return { error: 'A single ID must be provided for book record.' }
  if (typeof params.title !== 'string') return { error: 'A single title must be provided for book record.' }

  try {
    const parsed = CreateCategorySchema.parse(data)
    const insertedIds = await db.insert(category).values({ name: parsed.name }).returning({ insertedId: category.id })

    await db.insert(book_category).values({ bookId: parseInt(params.id), categoryId: insertedIds[0].insertedId })
    revalidatePath(`/diaries/${params.id}/${params.title}`)
    return { success: `Category was successfully created.` }
  } catch (error) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An error occurred while creating the category.' }
  }
}

export async function createItem(formData: FormData, searchParams: SearchParamsObject, params: Params) {
  if (!params) return { error: 'Parameters must be provided.' }
  const { id, title, category } = params
  const data = Object.fromEntries(formData)

  if (typeof id !== 'string') {
    return { error: 'A single id is expected.' }
  }
  try {
    const parsed = CreateItemSchema.parse(data)
    await db
      .insert(item)
      .values({
        name: parsed.name,
        categoryId: parseInt(searchParams.category),
        bookId: parseInt(id),
      })
      .returning({ insertedId: item.id })
    revalidatePath(`/diaries/${id}/${title}/${category}?category=${searchParams.category}`)
    return { success: `Item was successfully created.` }
  } catch (error) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An error occurred while creating this item.' }
  }
}

export async function createField(formData: FormData, searchParams: SearchParamsObject, params: Params) {
  const { id, title, category } = params!
  const data = Object.fromEntries(formData)

  try {
    const parsed = CreateFieldSchema.parse(data)
    await db
      .insert(field)
      .values({ name: parsed.name, categoryId: parseInt(searchParams.category) })
      .returning({ insertedId: field.id })
    revalidatePath(`/diaries/${id}/${title}/${category}/settings?category=${searchParams.category}`)
    return { success: `Field was successfully created.` }
  } catch (error) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An error occurred while creating field.' }
  }
}

export async function editField(formData: FormData, fieldId: number, path: string) {
  const data = Object.fromEntries(formData)

  try {
    const parsed = CreateFieldSchema.parse(data)
    await db.update(field).set({ name: parsed.name }).where(eq(field.id, fieldId))
    revalidatePath(path)
    return { success: `Field was successfully updated.` }
  } catch (error) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'An error occurred while updating field.' }
  }
}

export async function deleteField(fieldId: number, path: string) {
  try {
    await db.delete(field).where(eq(field.id, fieldId))
    revalidatePath(path)
    return { success: `Field was successfully deleted.` }
  } catch (error) {
    if (error instanceof Error) return { error: error.message }
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
    if (error instanceof Error) return { error: error.message }
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
          return { error: 'Invalid credentials.' }
        default:
          return { error: 'Something went wrong while authenticating.' }
      }
    }
    throw error
  }
}

export async function signup(formData: FormData) {
  const data = Object.fromEntries(formData)

  try {
    const parsed = SignupSchema.parse(data)
    if (parsed.password !== parsed['confirm-password']) {
      return { error: 'The passwords entered do not match. Please try again.' }
    }
    const existingUser = await db.select().from(user).where(eq(user.email, parsed.email))
    if (existingUser.length !== 0) {
      return { error: 'Email is already registered.' }
    }

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(parsed.password, salt)

    const insertedId = await db
      .insert(user)
      .values({ password: hashedPassword, email: parsed.email })
      .onConflictDoNothing()
      .returning({ insertedId: user.id })

    if (!insertedId) {
      return { error: 'Failed to register. Please try again later.' }
    }
  } catch (error) {
    if (error instanceof Error) return { error: error.message }
    return { error: 'Password encryption failed.' }
  }
  redirect('/diaries')
}
