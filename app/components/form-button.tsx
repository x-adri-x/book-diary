type FormButtonProps = {
  label: string
  loading: boolean
}

export default function FormButton({ label, loading }: FormButtonProps) {
  return (
    <button
      className={`my-6 rounded-md text-slate-100 bg-slate-900 tracking-wider p-2 w-full shadow-md ${
        loading ? 'opacity-50' : ''
      }`}
      disabled={loading}
    >
      {loading ? 'Creating...' : label}
    </button>
  )
}