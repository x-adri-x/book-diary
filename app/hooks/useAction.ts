'use client'

import { Params } from 'next/dist/server/request/params'
import { useParams, useSearchParams } from 'next/navigation'
import { useState, useRef } from 'react'
import { SearchParamsObject } from '../types/types'

export default function useAction(
  actionFunction: (
    formData: FormData,
    searchParams: SearchParamsObject,
    params: Params
  ) => Promise<{ error: string } | { success: string } | null>,
  onSuccess?: () => void
) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const searchParams = useSearchParams()
  const params = useParams()

  const searchParamsObject = searchParams ? Object.fromEntries(searchParams.entries()) : {}

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await actionFunction(formData, { ...searchParamsObject }, params)

    if (response) {
      if ('error' in response) {
        setErrorMessage(response.error)
        setLoading(false)
      }

      if ('success' in response) {
        setLoading(false)
        formRef.current?.reset()
        if (onSuccess) onSuccess()
      }
    }
  }

  return {
    loading,
    errorMessage,
    handleSubmit,
    formRef,
  }
}
