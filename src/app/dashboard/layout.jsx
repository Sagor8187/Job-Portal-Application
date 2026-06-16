import { Dashboard } from '@/component/Dashboard'
import React, { Children } from 'react'

export default function layout({children}) {
  return (
    <div className='flex flex-1 min-h-screen bg-black'>
        <Dashboard></Dashboard>
        <div>
            {children}
        </div>
    </div>
  )
}
