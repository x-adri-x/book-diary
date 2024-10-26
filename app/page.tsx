'use client'

import React from 'react'
import LoginForm from '@/app/ui/login-form'
import Link from 'next/link'
import { caveat } from '@/app/ui/fonts'

export default function Page() {
  return (
    <div className='h-full'>
      <h1 className={`${caveat.className} text-5xl text-center mt-4`}>Book Diary</h1>
      <p className='text-base my-8'>
        The ultimate companion for book lovers! Keep track of characters, places, and plot twists in epic, multi-book
        series!
      </p>
      <LoginForm />
      <div className='flex flex-col justify-end items-center text-center text-base mb-6'>
        <div>
          <span className='text-sm align-middle'>No account yet?</span>
          <Link className={` text-slate-900 tracking-wide ml-2 underline underline-offset-2`} href='/signup'>
            Create Account
          </Link>
        </div>

        <Link className={` text-slate-900 tracking-wide underline underline-offset-2 mt-4`} href='/howto'>
          Learn More
        </Link>
      </div>
    </div>
  )
}
