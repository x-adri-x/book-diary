import { FormEventHandler } from 'react'

type FormProps = {
  children: React.ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  heading: string
}

export default function Form({ children, onSubmit, heading }: FormProps) {
  return (
    <form onSubmit={onSubmit} className='space-y-3 mt-10 w-full'>
      <div className='flex-1'>
        <h1 className={`mb-3 text-xl text-center`}>{heading}</h1>
        {children}
      </div>
    </form>
  )
}
