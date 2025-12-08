"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordGenerator from "@/components/PasswordGenerator";
import PasswordStrength from "@/components/PasswordStrength";


export default function SignupPage() {
  const [email, setEmail] = useState<string>(""); const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [showPassword, setShowPassword] = useState(false);

  const [generatedPassword, setGeneratedPassword] = useState<string | null>( null ); const [message, setMessage] = useState<string>("");


  const router = useRouter();

  // 1️⃣ 가입 + OTP 발급
  const handleSignup = async () => {
    const resSignup = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!resSignup.ok) return alert("가입 실패");

    const resOtp = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!resOtp.ok) return alert("OTP 발급 실패");

    const data = await resOtp.json();
    console.log("테스트용 OTP:", data.otp);

    setStep("verify");
  };

  // 2️⃣ OTP 인증
  const handleVerify = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    if (!res.ok) return alert("OTP 인증 실패");

    router.push("/signup/complete");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="w-96 bg-white p-6 rounded-xl shadow space-y-4">
        {step === "signup" ? (
          <div>
            <input 
            type="email" 
            placeholder="이메일" 
            className="w-full border rounded px-3 py-2" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            />

            {/* 🔐 비밀번호 입력 + 적용 버튼 */} 
            <div className="flex items-center gap-2"> 
              <input 
              type="password" 
              placeholder="비밀번호" 
              className="flex-1 border rounded px-3 py-2" 
              value={password} 
              onChange={(e) => { 
                setPassword(e.target.value);
                setGeneratedPassword(null);
                }} 
              /> 
              
              {generatedPassword && ( 
                <button 
                type="button" 
                onClick={() => setPassword(generatedPassword)} 
                className="px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200" 
                > 
                  적용 
                </button> 
              )} 
            </div>
            
            {/* 🎲 비밀번호 추천 */} <PasswordGenerator onGenerate={(pw) => { setGeneratedPassword(pw); setPassword(pw); }} /> {message && ( <p className="text-sm text-center text-red-500">{message}</p> )}
            
            <button onClick={handleSignup}>가입하기</button>
          </div>
        ) : (
          <div>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="OTP 입력" />
            <button onClick={handleVerify}>인증하기</button>
          </div>
        )}
      </section>
    </div>
  );
}
