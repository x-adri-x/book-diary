import { ZodSchema, ZodError } from 'zod'

type ZodParams<T> = {
  formData: FormData
  schema: ZodSchema<T>
}

export default function zodSchemaValidator<T>(params: ZodParams<T>) {
  const { formData, schema } = params
  const data = Object.fromEntries(formData)

  try {
    const parsed = schema.parse(data)
    return parsed
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation Error:', error.errors)
    }
  }
  return null
}
