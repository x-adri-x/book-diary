import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

type ErrorMessageProps = {
  errorMessage: string | null
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return (
    <div className='flex h-6 items-end space-x-1' aria-live='polite' aria-atomic='true'>
      {errorMessage && (
        <>
          <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
          <p className='text-sm text-red-500'>{errorMessage}</p>
        </>
      )}
    </div>
  )
}
