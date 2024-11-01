'use client'

import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

type Route = {
  path: string
  label: string
}

type BreadCrumbProps = {
  routes: Array<Route>
}

export default function Breadcrumb({ routes }: BreadCrumbProps) {
  const home = '/diaries'

  return (
    <div>
      <ul className='my-4 text-slate-500 flex'>
        <li>
          <Link href={home} className='flex items-center'>
            Home <ChevronRightIcon data-testid='chevron-icon' className='w-4 h-4 ml-2' />
          </Link>
        </li>
        {routes.map((route) => (
          <li key={route.label} className='ml-2'>
            <Link href={route.path} className='flex items-center capitalize'>
              {route.label} <ChevronRightIcon data-testid='chevron-icon' className='w-4 h-4 ml-2' />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
