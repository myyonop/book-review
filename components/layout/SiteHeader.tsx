'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, User } from 'lucide-react'
import {
  SignedIn,
  SignedOut,
  useUser,
  UserButton,
} from '@clerk/nextjs'

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  const isLoggedIn = !!user

  const handleProtectedAction = (path?: string) => {
    if (isLoggedIn) {
      if (path) router.push(path)
    } else {
      setShowLoginPrompt(true)
    }
  }

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-30">
        <div className="app-container mx-auto flex h-16 items-center justify-between px-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden text-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="text-xl font-bold text-gray-900">
              📚 Secure Book Review
            </Link>
          </div>

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-gray-700">
            <button
              onClick={() => handleProtectedAction('/books')}
              className="hover:text-blue-600"
            >
              도서 목록
            </button>

            <button
              onClick={() => handleProtectedAction('/community')}
              className="hover:text-blue-600"
            >
              커뮤니티
            </button>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* 검색창 */}
            <div
              onClick={() => handleProtectedAction()}
              className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-xl cursor-pointer"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search books..."
                readOnly
                className="bg-transparent px-2 text-sm cursor-pointer focus:outline-none"
              />
            </div>

            {/* 로그인 / 프로필 */}
            <SignedOut>
              <Link
                href="/login"
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <User className="w-4 h-4" />
                로그인
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-3 space-y-3">
            <button
              onClick={() => handleProtectedAction('/books')}
              className="block w-full text-left text-gray-700"
            >
              도서 목록
            </button>

            <button
              onClick={() => handleProtectedAction('/community')}
              className="block w-full text-left text-gray-700"
            >
              커뮤니티
            </button>

            <div
              onClick={() => handleProtectedAction()}
              className="flex items-center bg-gray-100 px-3 py-2 rounded-xl cursor-pointer"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                readOnly
                className="bg-transparent px-2 text-sm cursor-pointer focus:outline-none"
              />
            </div>
          </div>
        )}
      </header>

      {/* 로그인 유도 팝업 */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center space-y-4 shadow-xl">
            <h3 className="text-lg font-semibold">
              로그인 후 이용할 수 있어요
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              이 공간은  
              로그인한 사용자에게만 열려 있어요.
            </p>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 rounded-lg border"
              >
                닫기
              </button>

              <button
                onClick={() => {
                  setShowLoginPrompt(false)
                  setMobileOpen(false)
                  router.push('/login')
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                로그인하기
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
