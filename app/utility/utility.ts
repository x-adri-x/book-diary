import { ZodType } from 'zod'

export function addDash(text: string) {
  return text.replaceAll(' ', '-')
}

export function removeDash(text: string) {
  return text.replaceAll('-', ' ')
}
type ZObjectType = ZodType<Record<string | number, unknown>>
type Params<T extends ZObjectType> = {
  data: FormData
  schema: T
}

export function formValidator<T extends ZObjectType>(params: Params<T>) {
  const { data, schema } = params
  try {
    const parsed = schema.parse(data)
    return parsed
  } catch (error) {
    console.log(error)
  }
}
