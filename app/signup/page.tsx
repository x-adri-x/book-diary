'use client'

import { Suspense } from 'react'
import SignUpForm from '@/app/ui/signup-form'

export default function Page() {
  return (
    <div className='h-full'>
      <Suspense>
        <SignUpForm />
      </Suspense>
    </div>
  )
}
