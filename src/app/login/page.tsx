'use client'

import { CommonIcon } from '@/icons/common'
import { postUserLogin } from '@/services/api/user'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()

  const [showPw, setShowPw] = useState(false)
  const [keepLogin, setKeepLogin] = useState(false)

  const router = useRouter()

  const onSubmit = async (data: any) => {
    console.log(data)
    const res = await postUserLogin(data)
    if (res?.status === 200) {
      localStorage.setItem('userInfo', JSON.stringify(res.data))

      //todo 임시 로그인 변경
      // 로그인 유지 선택
      if (keepLogin) {
        const expiresIn = new Date(Date.now() + 86400 * 1000 * 7) // 예: 7일 후 만료
        document.cookie = `loggedIn=true; path=/; expires=${expiresIn.toUTCString()}`
      } else {
        document.cookie = 'loggedIn=true; path=/'
      }

      router.push('/')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex min-h-screen items-center justify-center bg-loginback-gradient"
    >
      <div className="h-[539px] w-[310px] rounded-[20px] bg-white px-[20px] py-[56px] shadow md:h-[654px] md:w-[754px] md:px-[84px]">
        <div className="text-center">
          <div className="text-[32px] font-bold text-blue-600 md:text-[56px]">
            OCEAN SAFETY
          </div>
          <div className="text-[18px]">승선원 안전관리 시스템</div>
        </div>

        <div className="group relative mt-[50px] flex w-full items-center rounded-[12px] border border-[#666666] px-[24px] text-[14px] shadow-sm focus-within:border-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 md:text-[18px]">
          <label
            htmlFor="id"
            className="absolute -top-[9px] left-[12px] bg-white px-[8px] text-[12px] text-gray-700 group-focus-within:text-blue-500 md:-top-[13px] md:text-[18px]"
          >
            ID
          </label>
          <input
            {...register('id')}
            type="text"
            id="id"
            className="flex-1 bg-transparent py-[20px] outline-none placeholder:text-[#888888] md:py-[28px]"
            placeholder="아이디를 입력하세요."
          />
        </div>

        <div className="group relative mt-[23px] flex w-full items-center rounded-[12px] border border-[#666666] px-[24px] text-[14px] shadow-sm focus-within:border-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 md:text-[18px]">
          <label
            htmlFor="password"
            className="absolute -top-[9px] left-[12px] bg-white px-[8px] text-[12px] text-gray-700 group-focus-within:text-blue-500 md:-top-[13px] md:text-[18px]"
          >
            Password
          </label>
          <input
            {...register('password')}
            type={showPw ? 'text' : 'password'}
            id="password"
            className="flex-1 bg-transparent py-[20px] outline-none placeholder:text-[#888888] md:py-[28px]"
            placeholder="비밀번호를 입력하세요."
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="h-[19px] w-[25px] md:h-[24px] md:w-[30px]"
          >
            {showPw ? <CommonIcon.PwShow /> : <CommonIcon.PwHidden />}
          </button>
        </div>

        <div className="mt-[12px] flex items-center gap-[8px]">
          <button
            id="keep-login"
            type="button"
            onClick={() => setKeepLogin(!keepLogin)}
          >
            {keepLogin ? (
              <div className="h-[18px] w-[18px]">
                <CommonIcon.CheckOn />
              </div>
            ) : (
              <div className="h-[18px] w-[18px] rounded-sm border border-[#888888] hover:border-blue-500 hover:bg-blue-50" />
            )}
          </button>

          <label
            htmlFor="keep-login"
            className="text-[14px] leading-[21.6px] text-[#666666] md:text-[18px]"
          >
            로그인 유지
          </label>
        </div>

        <button
          type="submit"
          className="mt-[40px] w-full rounded bg-[#333333] py-[20px] font-bold text-white md:py-[23px] md:text-[20px]"
        >
          로그인
        </button>
      </div>
    </form>
  )
}
