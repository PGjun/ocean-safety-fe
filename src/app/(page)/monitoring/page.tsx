'use client'

import Image from 'next/image'
import React, { Suspense, useEffect } from 'react'
import { SliderDropDown } from '@/components/common/SliderDropDown'
import { MonitoringTab } from './components/MonitoringTab'
import { useMonitoringLogic } from '@/hooks/logic/useMonitoringLogic'
import LocationDots from '@/components/common/LocationDots'
import { wrapperzIndex } from '@/constants/wrapperStyles'

const Monitoring = () => {
  const {
    isMobile,
    pageNums,
    crewLocations,
    crewMessages,
    crewNames,
    selectedUser,
    selectedShip,
    setSelectedShip,
    setSelectedUser,
    shipInfo,
    userHealthList,
    DropDownFC,
  } = useMonitoringLogic()

  // 이 부분을 React.memo를 사용하여 최적화
  const DropDownGroupMain = React.memo(() => <DropDownFC.GroupMain />)
  DropDownGroupMain.displayName = 'DropDownGroupMain'
  const DropDownShipMain = React.memo(() => (
    <DropDownFC.ShipMain handleShipChange={setSelectedShip} />
  ))
  DropDownShipMain.displayName = 'DropDownShipMain'

  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">
        선내 위치 모니터링
      </div>
      <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
        <DropDownGroupMain />
        <DropDownShipMain />
      </div>

      <div className="relative mt-[10px] h-[92px] outline outline-1 md:h-[270px] md:w-[1100px]">
        <div
          style={{
            ...wrapperzIndex,
            zIndex: 2,
          }}
        >
          {shipInfo &&
            shipInfo.ship_drawings_url !== '' &&
            shipInfo.ship_drawings_url !== 'None' && (
              <Image
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  '/' +
                  shipInfo.ship_drawings_url
                }
                alt="선박 도면 미리보기"
                layout="fill"
                objectFit="fill"
              />
            )}
        </div>
        {crewLocations && (
          <div style={wrapperzIndex}>
            <LocationDots
              width={isMobile ? 310 : 1100}
              height={isMobile ? 92 : 270}
              dots={crewLocations.map((item) => ({
                ...item,
                x: item.x,
                y: item.y,
                name: item.user_name,
              }))}
              onSelectDot={(dot) => {
                {
                  console.log(dot)
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="mt-[32px] flex flex-col justify-between md:flex-row md:items-center">
        <div className="text-[18px] font-bold md:text-[20px]">
          모니터링 기록
        </div>
        <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
          <span className="text-[14px] md:text-[16px]">승선원 선택</span>
          <SliderDropDown
            id="monitoring_user"
            dropData={crewNames}
            fieldValue={selectedUser}
            fieldOnChange={setSelectedUser}
            placeholder="승선원 선택"
          />
        </div>
      </div>

      <div className="mt-[20px]">
        <MonitoringTab
          crewMessages={crewMessages}
          userHealthList={userHealthList}
          searchParams={pageNums}
          userIndex={Number(selectedUser?.value) ?? 0}
        />
      </div>
    </div>
  )
}

export default function MonitoringPage() {
  return (
    <Suspense fallback={null}>
      <Monitoring />
    </Suspense>
  )
}
