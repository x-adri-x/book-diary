import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOut } from '@/auth'

export default function Header() {
  return (
    <div className='sticky top-0 left-0 right-0 py-4 bg-white'>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button type='submit'>
          <ArrowRightStartOnRectangleIcon className='w-6 h-6 cursor-pointer' />
        </button>
      </form>
    </div>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type='submit'>Sign Out</button>
    </form>
  )
}
