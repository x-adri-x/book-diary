import { FormEventHandler, ForwardedRef, RefObject, forwardRef } from 'react'

type FormProps = {
  children: React.ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  heading: string
}

const Form = forwardRef(function Form({ children, onSubmit, heading }: FormProps, ref: ForwardedRef<HTMLFormElement>) {
  return (
    <form onSubmit={onSubmit} ref={ref} className='space-y-3 mt-10 w-full'>
      <div className='flex-1'>
        <h1 className={`mb-3 text-xl text-center`}>{heading}</h1>
        {children}
      </div>
    </form>
  )
})

export default Form
