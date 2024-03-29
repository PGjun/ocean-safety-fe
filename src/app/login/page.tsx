import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="m-auto flex min-h-screen items-center justify-center bg-loginback-gradient">
      <div className="h-[539px] w-[310px] rounded-[20px] bg-white px-[20px] py-[56px] shadow md:h-[654px] md:w-[754px] md:px-[84px]">
        <div className="text-center">
          <div className="text-[32px] font-bold text-blue-600 md:text-[56px]">
            LOGO
          </div>
          <div className="text-[18px]">승선원 안전관리 시스템</div>
        </div>

        <div className="group relative mt-[50px] flex w-full items-center rounded-[12px] border border-[#666666] px-[24px] text-[14px] shadow-sm focus-within:border-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 md:text-[18px]">
          <label
            htmlFor="user-id"
            className="absolute -top-[9px] left-[12px] bg-white px-[8px] text-[12px] text-gray-700 group-focus-within:text-blue-500 md:-top-[13px] md:text-[18px]"
          >
            ID
          </label>
          <input
            type="text"
            id="user-id"
            className="flex-1 bg-transparent py-[20px] outline-none placeholder:text-[#888888] md:py-[28px]"
            placeholder="아이디를 입력하세요."
          />
        </div>

        <div className="group relative mt-[23px] flex w-full items-center rounded-[12px] border border-[#666666] px-[24px] text-[14px] shadow-sm focus-within:border-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 md:text-[18px]">
          <label
            htmlFor="user-id"
            className="absolute -top-[9px] left-[12px] bg-white px-[8px] text-[12px] text-gray-700 group-focus-within:text-blue-500 md:-top-[13px] md:text-[18px]"
          >
            Password
          </label>
          <input
            type="text"
            id="user-id"
            className="flex-1 bg-transparent py-[20px] outline-none placeholder:text-[#888888] md:py-[28px]"
            placeholder="비밀번호를 입력하세요."
          />
        </div>

        <div className="mt-[12px] flex items-center gap-[5px]">
          <input type="checkbox" id="keep-login" />
          <label htmlFor="keep-login" className="text-[14px] md:text-[18px]">
            로그인 유지
          </label>
        </div>
        <Link href={'/?login=true'}>
          <button className="mt-[40px] w-full rounded bg-[#333333] py-[20px] font-bold text-white md:py-[23px] md:text-[20px]">
            로그인
          </button>
        </Link>
      </div>
    </div>
  )
}
