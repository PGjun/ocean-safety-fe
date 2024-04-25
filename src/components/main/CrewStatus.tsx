'use client'

import Image from 'next/image'
import battery from '/public/icons/board-battery.svg'
import heart from '/public/icons/board-heart.svg'
import leave from '/public/icons/board-leave.svg'
import personnel from '/public/icons/board-personnel.svg'
import sos from '/public/icons/board-sos.svg'
import warnning from '/public/icons/board-warnning.svg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useUser } from '@/hooks/useUser'
import { ROLES } from '@/constants/roles'
import { useEffect, useState } from 'react'
import { SliderDropDownSm } from '../common/SliderDropDown'
import { fetchShipNameList } from '@/services/api/user'

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

export const CrewStatus = ({ selectedDrop, setSelectedDrop }: any) => {
  const { user, role } = useUser()

  const isMobile = useMediaQuery('768')

  const [shipList, setShipList] = useState()

  const handleOnChange = (dropItem: { value: string; label: string }) => {
    setSelectedDrop(dropItem)
  }

  useEffect(() => {
    if (!user) return
    const getShipList = async () => {
      const res = await fetchShipNameList({
        group_id: user.group_id.toString(),
      })
      if (res?.status === 200) {
        console.log(res.data)
        setShipList(
          res.data.data.map((item: any) => ({
            value: item.ship_id,
            label: item.ship_name,
          })),
        )
      }
    }
    getShipList()
  }, [user])

  useEffect(() => {
    console.log(selectedDrop)
  }, [selectedDrop, shipList])

  return (
    <div className="flex max-w-[636px] flex-col gap-[12px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="text-[20px] font-bold">승선원 현황</div>
          <div className="text-[14px] font-normal"> 2024년 03월 01일</div>
        </div>
        <div className="flex items-center gap-[10px]">
          {role && role !== ROLES.SHIP ? (
            <>
              {isMobile ? null : <div>선박 선택</div>}
              <SliderDropDownSm
                id="main_ship_dropdown"
                dropData={shipList}
                fieldValue={
                  selectedDrop ? selectedDrop : { value: '', label: '' }
                }
                fieldOnChange={handleOnChange}
              />
            </>
          ) : null}
        </div>
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
