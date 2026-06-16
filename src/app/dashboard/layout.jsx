import { Dashboard } from '@/component/Dashboard'
import React, { Children } from 'react'

export default function layout({children}) {
  return (
  
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      <Dashboard />

      <main className="flex-1 w-full p-6">
        {children}
      </main>
    </div>
 
  )
}
