'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function VerifyOtpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('인증 코드는 6자리입니다.')
      return
    }

    setLoading(true)
    setError('')

    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })

    if (res.ok) {
      // 인증 완료 → 완료 페이지
      router.push('/signup/complete')
    } else {
      const msg = await res.text()
      setError(msg || '인증에 실패했습니다.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl space-y-5">
        <h1 className="text-xl font-semibold text-center">
          이메일 인증
        </h1>

        <p className="text-sm text-gray-600 text-center">
          {email}
          <br />
          이 주소로 보낸 숫자 6개를 입력해주세요.
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value.replace(/\D/g, '').slice(0, 6)
            )
          }
          placeholder="000000"
          className="w-full border rounded-lg px-3 py-2 text-center text-lg tracking-widest"
        />

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          인증하기
        </button>
      </div>
    </div>
  )
}
