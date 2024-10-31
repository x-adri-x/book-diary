'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useState, useRef } from 'react'

export default function useAction(actionFunction: Function, onSuccess?: () => void) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const searchParams = useSearchParams()
  const params = useParams()

  const searchParamsObject = Object.fromEntries(searchParams.entries())

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await actionFunction(formData, { ...searchParamsObject }, params)

    if (response && response.error) {
      setErrorMessage(response.error)
    }

    if (response && response.success) {
      setLoading(false)
      formRef.current?.reset()
      if (onSuccess) onSuccess()
    }
  }

  return {
    loading,
    errorMessage,
    handleSubmit,
    formRef,
  }
}
