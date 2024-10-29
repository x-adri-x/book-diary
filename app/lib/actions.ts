'use server'

import { db } from '@/database'
import { book, insertBookSchema } from '@/database/schema/book'
import { user } from '@/database/schema/user'
import { category, insertCategorySchema } from '@/database/schema/category'
import { item } from '@/database/schema/item'
import { field } from '@/database/schema/field'
import { book_category } from '@/database/schema/book-category'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { ReadonlyURLSearchParams, redirect } from 'next/navigation'
import { addDash } from '../utility/utility'

interface Params {
  [key: string]: string | string[]
}

export async function createBook(formData: FormData, searchParams?: ReadonlyURLSearchParams, params?: Params) {
  const session = await auth()
  let bookId
  let title

  if (session && session.user?.id) {
    const userId = parseInt(session.user?.id)

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

export async function createCategory(formData: FormData, searchParams?: ReadonlyURLSearchParams, params?: Params) {
  const data = insertCategorySchema.parse({
    name: formData.get('name'),
  })
  const bookId = params?.id as string
  try {
    const insertedIds = await db.insert(category).values({ name: data.name }).returning({ insertedId: category.id })

    await db.insert(book_category).values({ bookId: parseInt(bookId), categoryId: insertedIds[0].insertedId })
    revalidatePath(`/diaries/${bookId}/${params?.title as string}`)
    return { success: `Category was successfully created.` }
  } catch (error) {
    return { error: 'An error occurred while creating the category.' }
  }
}

export async function createItem(formData: FormData, searchParams?: ReadonlyURLSearchParams, params?: Params) {
  try {
    await db
      .insert(item)
      .values({
        name: formData.get('name') as string,
        categoryId: parseInt(searchParams?.get('category')!),
        bookId: parseInt(params?.bookId as string),
      })
      .returning({ insertedId: item.id })
    return { success: `Item was successfully created.` }
  } catch (error) {
    return { error: 'An error occurred while creating this item.' }
  }
}

export async function createField(formData: FormData, searchParams?: ReadonlyURLSearchParams, params?: Params) {
  try {
    await db
      .insert(field)
      .values({ name: formData.get('name') as string, categoryId: parseInt(searchParams?.get('category')!) })
      .returning({ insertedId: field.id })
    return { success: `Field was successfully created.` }
  } catch (error) {
    return { error: 'An error occurred while creating field.' }
  }
}

export async function editField(formData: FormData, fieldId: number, path: string) {
  try {
    await db
      .update(field)
      .set({ name: formData.get('name') as string })
      .where(eq(field.id, fieldId))
    revalidatePath(path)
    return { success: `Field was successfully updated.` }
  } catch (error) {
    return { error: 'An error occurred while updating field.' }
  }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
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

export async function signup(prevState: string | undefined, formData: FormData) {
  try {
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (error, salt) => {
      if (error) return
      const password = formData.get('password') as string
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) return

        // Hashing successful, 'hash' contains the hashed password
        console.log('Hashed password:', hash)
        const id = await db
          .insert(user)
          .values({ password: hash, email: formData.get('email') as string })
          .returning({ insertedId: user.id })
        console.log('id', id)
      })
    })
  } catch (error) {
    return 'Password encryption failed.'
  }
}
