'use server'

import { db } from '@/database'
import { book, insertBookSchema } from '@/database/schema/book'
import { user } from '@/database/schema/user'
import { category, insertCategorySchema } from '@/database/schema/category'
import { book_category } from '@/database/schema/book-category'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function createBook(formData: FormData) {
  const session = await auth()

  const data = insertBookSchema.parse({
    title: formData.get('title'),
    author: formData.get('author'),
  })

  if (session && session.user?.id) {
    const userId = parseInt(session.user?.id)

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

      const bookId = insertedIds[0].insertedId
      const title = data.title.toLowerCase().trim().replace(' ', '-')

      await db.insert(book_category).values({ bookId: bookId, categoryId: characterCategoryIds[0].id })
      await db.insert(book_category).values({ bookId: bookId, categoryId: notesCategoryIds[0].id })
      revalidatePath('/diaries')
      return { success: `/diaries/${bookId}/${title}` }
    } catch (err) {
      return { error: 'An error occurred while creating the book.' }
    }
  }
  return null
}

export async function createCategory(formData: FormData, bookId: string, path: string) {
  const data = insertCategorySchema.parse({
    name: formData.get('name'),
  })

  try {
    const insertedIds = await db.insert(category).values({ name: data.name }).returning({ insertedId: category.id })
    await db.insert(book_category).values({ bookId: parseInt(bookId), categoryId: insertedIds[0].insertedId })
    revalidatePath(path)
    return { success: `Category was successfully created.` }
  } catch (error) {
    return { error: 'An error occurred while creating the category.' }
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
