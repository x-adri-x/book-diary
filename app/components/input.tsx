type Props = {
  label: string
  placeholder: string
  type?: string
  children?: React.ReactNode | null
}

export default function Input({ label, placeholder, type = 'text', children }: Props) {
  return (
    <div>
      <label className='mb-1 mt-2 block text-xs font-semibold text-gray-900 text-left' htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <div className='relative'>
        <input
          className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-8 text-sm outline-2 placeholder:text-gray-500'
          id={label.toLowerCase()}
          type={type}
          name={label.toLowerCase()}
          placeholder={placeholder}
          required
        />
        {children}
      </div>
    </div>
  )
}
