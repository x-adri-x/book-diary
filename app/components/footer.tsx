import Link from 'next/link'

export default function Footer() {
  return (
    <Link href='/howto' className={` text-slate-900 tracking-wide underline underline-offset-2 ml-2 self-center`}>
      Learn more
    </Link>
  )
}
