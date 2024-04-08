import { CommonIcon } from '@/components/SvgIcons'

export default function NoticePage() {
  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">공지사항</div>
      <div className="mt-[30px] border-t-[2px] border-[#888888]">
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className="group cursor-pointer border-b border-[#E9ECEF] p-[20px] hover:bg-[#F8F9FA]"
            >
              <div className="flex gap-[10px] text-[20px] leading-[24px]">
                <div className="group-hover:font-bold">
                  <div className="mr-3 inline-block">12</div>
                  제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
                  <span className="ml-1 inline-block">
                    <CommonIcon.ATTACH_FILE />
                  </span>
                </div>
              </div>
              <div className="mt-[9.5px] leading-[19.2px] text-[#666666]">
                관리자<span className="px-[12px] text-[#DDDDDD]">/</span>
                24.01.05 12:32
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
