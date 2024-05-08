'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CommonIcon } from '@/icons/common'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { SyntheticEvent, useEffect, useState } from 'react'
import logo from '/public/temp-logo.jpg'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const isMobile = useMediaQuery('768')
  const router = useRouter()
  const [userID, setUserID] = useState('')
  const [userPW, setUserPW] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [keepLogin, setKeepLogin] = useState(false)
  const [testMsg, setTestMsg] = useState('123')

  useEffect(() => {
    // 로컬 스토리지에서 로그인 유지 상태를 읽어와서 설정
    const storedKeepLogin = localStorage.getItem('keepLogin')
    if (storedKeepLogin) {
      setKeepLogin(storedKeepLogin === 'true')
    }
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (isLoading) return // 로딩 중에는 함수 early return 중복 요청 방지
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        username: userID,
        password: userPW,
        keepLogin, // 로그인 유지 상태 전송
        redirect: false, // 페이지 리디렉션 방지
      })

      if (result?.error) {
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해 주세요.')
      } else {
        localStorage.setItem('keepLogin', keepLogin.toString()) // 로그인 성공 시 로컬 스토리지에 상태 저장
        window.location.href = '/' // 성공 시 메인 페이지로 이동
      }
    } catch (error) {
      console.error('로그인 프로세스 중 에러 발생:', error)
      alert('로그인 처리 중 문제가 발생했습니다.')
    } finally {
      setIsLoading(false) // 처리가 끝난 후 로딩 상태 해제
      //! sendMessageToFlutter 실행
      sendMessageToFlutter()
    }
  }

  useEffect(() => {
    if ((window as any).flutter_inappwebview) {
      ;(window as any).receiveMessageFromFlutter = (msg: any) => {
        setTestMsg(msg)
        console.log('Received from Flutter:', msg)
      }
    }
    return () => {
      ;(window as any).receiveMessageFromFlutter = undefined
    }
  }, [])

  const sendMessageToFlutter = () => {
    if ((window as any).flutter_inappwebview) {
      ;(window as any).flutter_inappwebview.callHandler('fromWeb', {
        message: 'Hello from Next.js!',
      })
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="m-auto flex min-h-screen items-center justify-center bg-loginback-gradient"
    >
      <div className="h-[539px] w-[310px] rounded-[20px] bg-white px-[20px] py-[56px] shadow md:h-[654px] md:w-[754px] md:px-[84px]">
        <div className="text-center">
          <div className="flex justify-center text-[32px] font-bold text-blue-600 md:text-[56px]">
            {isMobile ? (
              <div className="w-[200px]">
                <Image src={logo} alt="temp-logo" />
              </div>
            ) : (
              <div className="w-[400px]">
                <Image src={logo} alt="temp-logo" />
              </div>
            )}
          </div>
          {/* 오션세이프티 */}
          <div className="mt-[20px] text-[16px] md:text-[18px]">
            승선원 안전관리 시스템
          </div>
        </div>

        <div className="group relative mt-[50px] flex w-full items-center rounded-[12px] border border-[#666666] px-[24px] text-[14px] shadow-sm focus-within:border-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 md:text-[18px]">
          <label
            htmlFor="inputID"
            className="absolute -top-[9px] left-[12px] bg-white px-[8px] text-[12px] text-gray-700 group-focus-within:text-blue-500 md:-top-[13px] md:text-[18px]"
          >
            ID
          </label>
          <input
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            type="text"
            id="inputID"
            className="flex-1 bg-transparent py-[20px] outline-none placeholder:text-[#888888] md:py-[28px]"
            placeholder="아이디를 입력하세요."
          />
        </div>

        <div className="group relative mt-[23px] flex w-full items-center rounded-[12px] border border-[#666666] px-[24px] text-[14px] shadow-sm focus-within:border-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 md:text-[18px]">
          <label
            htmlFor="inputPW"
            className="absolute -top-[9px] left-[12px] bg-white px-[8px] text-[12px] text-gray-700 group-focus-within:text-blue-500 md:-top-[13px] md:text-[18px]"
          >
            Password
          </label>
          <input
            value={userPW}
            onChange={(e) => setUserPW(e.target.value)}
            type={showPw ? 'text' : 'password'}
            id="inputPW"
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
          id="loginBtn"
          className="mt-[40px] w-full rounded bg-[#333333] py-[20px] font-bold text-white md:py-[23px] md:text-[20px]"
        >
          로그인
        </button>
      </div>
    </form>
  )
}
