import { z } from 'zod'

const invalid_type_error = 'Invalid type provided for this field.'
const required_error = 'This field cannot be blank.'

export const CreateBookSchema = z.object({
  title: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short.'),
  author: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short.'),
})

export const CreateCategorySchema = z.object({
  name: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short.'),
})

export const CreateItemSchema = z.object({
  name: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short.'),
})

export const CreateFieldSchema = z.object({
  name: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short.'),
})

export const SignupSchema = z.object({
  email: z.string({ invalid_type_error, required_error }).email(),
  password: z.string({ invalid_type_error, required_error }).min(5, 'Password has to be at least 5 characters long.'),
  'confirm-password': z.string({ invalid_type_error, required_error }),
})
