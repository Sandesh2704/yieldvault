'use client'

import { useState, type ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

export function Layout({ active, children }: { active: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden "  style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(4,8,17,0.88) 0%, rgba(4,8,17,0.76) 38%, rgba(5,7,23,0.72) 100%), url('/backround/home-page-backround.png')",
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}>
      <Sidebar active={active} open={open} onClose={() => setOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setOpen(true)} />

        {/* ONLY this div scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto ">
          <div className="mx-auto px-10 pb-16 pt-[42px] max-lg:px-6 max-md:px-[15px] max-md:pb-12 max-md:pt-7" >

          {children}
          </div>
        </div>
      </div>
    </div>
  )
}