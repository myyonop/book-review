// app/mypage/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type UserInfo = {
  email: string
  name: string
}

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const email = localStorage.getItem('userEmail')
      const name = localStorage.getItem('userName')

      if (!email) {
        // 🚪 로그인 안 됐으면 들이지 않음
        router.replace('/login')
        return
      }

      setUser({
        email,
        name: name || '',
      })
    } catch (e) {
      console.error('Failed to load user info', e)
      router.replace('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>마이페이지를 불러오는 중...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">마이페이지</h1>

        <div className="space-y-2">
          <p>
            <span className="font-medium">이메일: </span>
            {user!.email}
          </p>

          {user!.name && (
            <p>
              <span className="font-medium">이름(닉네임): </span>
              {user!.name}
            </p>
          )}

          <p className="text-sm text-gray-500">
            로그인 시 입력한 정보를 기반으로 표시됩니다.
          </p>
        </div>
      </div>
    </main>
  )
}
