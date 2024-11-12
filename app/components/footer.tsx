import Link from 'next/link'

export default function Footer() {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 text-center bg-white'>
      <Link href='/howto' className={` text-slate-900 tracking-wide underline underline-offset-2 ml-2 self-center`}>
        Learn more
      </Link>
    </div>
  )
}
