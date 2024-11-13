'use client'

import { useRouter } from 'next/navigation'

export default function HowTo() {
  const router = useRouter()

  return (
    <>
      <div className='w-[90dvw] h-90dvh bg-[url("/howto.png")] bg-contain bg-no-repeat'></div>
      <button
        onClick={() => router.back()}
        className={` text-slate-900 tracking-wide underline underline-offset-2 ml-2 self-center`}
      >
        Go back
      </button>
    </>
  )
}
