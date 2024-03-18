import Image from 'next/image'
import battery from '/public/icons/board-battery.svg'
import heart from '/public/icons/board-heart.svg'
import leave from '/public/icons/board-leave.svg'
import personnel from '/public/icons/board-personnel.svg'
import sos from '/public/icons/board-sos.svg'
import warnning from '/public/icons/board-warnning.svg'

const dashBoardList = [
  { iconSrc: personnel, name: '충원' },
  {
    iconSrc: heart,
    name: '심박이상',
  },
  {
    iconSrc: warnning,
    name: '제한구역',
  },
  {
    iconSrc: leave,
    name: '선내이탈',
  },
  {
    iconSrc: sos,
    name: 'SOS 구조요청',
  },
  {
    iconSrc: battery,
    name: '배터리 부족',
  },
]

export const CrewStatus = () => {
  return (
    <div>
      <div className="text-[20px] font-bold">
        승선원 현황
        <span className="text-[14px] font-normal"> 2024년 03월 01일</span>
      </div>
      <div className="grid grid-cols-3 gap-[8px] md:w-[636px] md:gap-[16px]">
        {dashBoardList.map((item, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col items-center rounded-[8px] bg-[#F3F5FF] py-[18px] md:py-[28px]"
            >
              <div>
                <Image src={item.iconSrc} alt="충원" />
              </div>
              <div>{item.name}</div>
              <div className="text-[24px] font-bold">10</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
