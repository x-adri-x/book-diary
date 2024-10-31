import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

type ErrorMessageProps = {
  errorMessage: string | null
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return (
    <div className='flex items-center space-x-1' aria-live='polite' aria-atomic='true'>
      {errorMessage && (
        <>
          <ExclamationCircleIcon className='h-8 w-8 text-red-500' />
          <p className='text-sm text-red-600'>{errorMessage}</p>
        </>
      )}
    </div>
  )
}
