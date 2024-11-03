type Props = {
  label: string
  loading?: boolean
  onClick: () => void
}

export default function Button({ label, onClick, loading = false }: Props) {
  return (
    <button
      className={`my-6 rounded-md text-slate-100 bg-amber-400 tracking-wider p-2 w-full shadow-md ${
        loading ? 'opacity-50' : ''
      }`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? 'Loading...' : label}
    </button>
  )
}
