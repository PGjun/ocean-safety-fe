'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SliderDropDown } from '@/components/common/SliderDropDown'
import { useShipList } from '@/hooks/fetch/useShipList'
import { useUserList } from '@/hooks/fetch/useUserList'
import { MonitoringTab } from './components/MonitoringTab'
import { useShipInfo } from '@/hooks/fetch/useShipInfo'
import { useUser } from '@/hooks/useUser'
import { DropItem, PageProps } from '@/types/common'
import { useUserHealthList } from '@/hooks/fetch/useUserHealthList'
import { useCrewLocation } from '@/hooks/fetch/useCrewLocation'
import CrewLocationDots from '@/components/common/CrewLocationDots'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function MonitoringPage(
  pageProps: PageProps<{ s_page_num: string; h_page_num: string }>,
) {
  const searchParams = pageProps.searchParams
  const { user } = useUser()
  const isMobile = useMediaQuery('768')

  const [ships, setShips] = useState<DropItem[]>([])
  const [users, setUsers] = useState()
  const [shipInfo, setShipInfo] = useState<any>()
  const [userHealthList, setUserHealthList] = useState<any>()
  const [crewLocations, setCrewLocations] = useState<any>()

  const { getShipList } = useShipList()
  const { getUserList } = useUserList()
  const { getShipInfo } = useShipInfo()
  const { getUserHealthList } = useUserHealthList()
  const { getCrewLocation, setShipId } = useCrewLocation()

  const [selecetdShip, setSelectedShip] = useState<DropItem>()
  const [selecetdUser, setSelectedUser] = useState<DropItem>()

  const handleShipChange = (dropItem: DropItem) => {
    setSelectedShip(dropItem)
  }
  const handleUserChange = (dropItem: DropItem) => {
    setSelectedUser(dropItem)
  }

  // 선박리스트 업데이트
  useEffect(() => {
    getShipList({ setShips })
  }, [getShipList])

  // useUser에서 가져온 ship_id로 ships안에 유저의 선박을 찾아서 selectedShip 업데이트
  useEffect(() => {
    if (!user || !ships) return
    const currentShip = ships.find((item: any) => item.value === user?.ship_id)
    setSelectedShip(currentShip)
  }, [user, ships])

  // setSelectedUser를 업데이트 해서 초기화
  useEffect(() => {
    if (!users) return
    setSelectedUser(users[0])
  }, [users])

  // 선택된 선박이 있으면 유저리스트와 선박상세정보를 업데이트
  useEffect(() => {
    if (!selecetdShip) return
    const shipId = selecetdShip?.value
    getUserList({ ship_id: shipId, setUsers })
    getShipInfo({ ship_id: shipId, setData: setShipInfo })
  }, [selecetdShip, getUserList, getShipInfo])

  useEffect(() => {
    if (!selecetdShip) return
    setShipId(selecetdShip.value)

    getCrewLocation({ setData: setCrewLocations })

    const interval = setInterval(() => {
      getCrewLocation({
        setData: setCrewLocations,
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [getCrewLocation, setShipId, selecetdShip])

  // 유저 건강정보 업데이트
  useEffect(() => {
    if (!selecetdUser || !selecetdShip) return
    const shipId = selecetdShip?.value
    const userIndex = selecetdUser?.value
    getUserHealthList({
      shipId: shipId,
      setData: setUserHealthList,
      pageNum: searchParams.h_page_num,
      userIndex: userIndex,
    })
  }, [getUserHealthList, selecetdUser, selecetdShip, searchParams])

  // 유저 응급메시지 업데이트
  // useEffect(() => {
  //   if (!selecetdUser || !selecetdShip) return
  //   const shipId = selecetdShip?.value
  //   const userIndex = selecetdUser?.value
  //   getUserHealthList({
  //     shipId: shipId,
  //     setData: setUserHealthList,
  //     pageNum: searchParams.h_page_num,
  //     userIndex: userIndex,
  //   })
  // }, [getUserHealthList, selecetdUser, selecetdShip, searchParams])

  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">
        선내 위치 모니터링
      </div>
      <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
        <span className="text-[14px] md:text-[16px]">선박 선택</span>
        <SliderDropDown
          id="monitoring_ship"
          dropData={ships}
          fieldValue={selecetdShip}
          fieldOnChange={handleShipChange}
          placeholder="선박 선택"
        />
      </div>
      <div className="mt-[10px]">
        <div className="relative h-[92px] md:h-[248px]">
          {/* {shipInfo &&
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
            )} */}
          {crewLocations && (
            <div className="relative h-[92px] md:h-[248px]">
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                }}
              >
                <CrewLocationDots
                  width={isMobile ? 270 : 1100}
                  height={isMobile ? 92 : 248}
                  dots={crewLocations}
                  onSelectDot={(dot) => {
                    {
                      console.log(dot)
                    }
                  }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
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
            </div>
          )}
        </div>
      </div>
      <div className="mt-[32px] flex flex-col justify-between md:flex-row md:items-center">
        <div className="text-[18px] font-bold md:text-[20px]">
          모니터링 기록
        </div>
        <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
          <span className="text-[14px] md:text-[16px]">승선원 선택</span>
          <SliderDropDown
            id="monitoring_user"
            dropData={users}
            fieldValue={selecetdUser}
            fieldOnChange={handleUserChange}
            placeholder="승선원 선택"
          />
        </div>
      </div>
      {/* 클릭 에러방지 */}
      {!userHealthList ? (
        <div className="fixed left-0 top-0 z-50 h-full w-full" />
      ) : null}
      <div className="mt-[20px]">
        <MonitoringTab
          userHealthList={userHealthList}
          searchParams={searchParams}
          userIndex={Number(selecetdUser?.value) ?? 0}
        />
      </div>
    </div>
  )
}
