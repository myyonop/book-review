// components/PasswordGenerator.tsx

'use client'

import { generatePassword } from '@/lib/password'

export default function PasswordGenerator({
  onGenerate,
}: {
  onGenerate: (pw: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onGenerate(generatePassword())}
      className="btn"
    >
      안전한 비밀번호 추천받기
    </button>
  )
}