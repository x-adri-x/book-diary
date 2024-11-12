import { FormEventHandler, ForwardedRef, forwardRef, MouseEventHandler } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

type Props = {
  children: React.ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  onClose: MouseEventHandler
}

const Form = forwardRef(function Form({ children, onSubmit, onClose }: Props, ref: ForwardedRef<HTMLFormElement>) {
  return (
    <form onSubmit={onSubmit} ref={ref} className='space-y-3 mt-10 w-full lg:max-w-xl'>
      <XCircleIcon className='w-7 h-7 justify-self-end' onClick={onClose} />
      <div className='flex-1'>{children}</div>
    </form>
  )
})

export default Form
