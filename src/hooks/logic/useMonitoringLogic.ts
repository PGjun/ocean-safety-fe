import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useShipNames } from '../fetch/useShipNames'
import { useShipInfo } from '../fetch/useShipInfo'
import { useUser } from '../useUser'
import { useUserHealthList } from '../fetch/useUserHealthList'
import { useCrewLocations } from '../fetch/useCrewLocations'
import { useMediaQuery } from '../useMediaQuery'
import { DropItem } from '@/types/common'
import { useCrewNames } from '../fetch/useCrewNames'
import { useCrewMessages } from '../fetch/useCrewMessages'

export const useMonitoringLogic = () => {
  //선택한 선박 - 선박정보, 승선원이름목록,일반메시지 업데이트
  const [selectedShip, setSelectedShip] = useState<DropItem>()
  //선택한 승선원 - 응급메시지, 건강정보 업데이트
  const [selectedUser, setSelectedUser] = useState<DropItem>()
  //page_num 업데이트
  const searchParams = useSearchParams()
  const s_page_num = searchParams.get('s_page_num')
  const h_page_num = searchParams.get('h_page_num')
  const pageNums = { s_page_num, h_page_num }

  const { user } = useUser()
  const isMobile = useMediaQuery('768')

  // 호출 훅
  // const { shipNames, getShipNames } = useShipNames()
  const { crewNames, getCrewNames } = useCrewNames()
  const { shipInfo, getShipInfo } = useShipInfo()
  const { crewLocations, getCrewLocations } = useCrewLocations()
  const { crewMessages, getCrewMessages } = useCrewMessages()
  const { userHealthList, getUserHealthList } = useUserHealthList()

  // 첫 랜더링 시 선박이름 목록 업데이트 (user 의존)
  // useEffect(() => {
  //   getShipNames()
  // }, [getShipNames])

  // // 첫 랜더링 시 선박 선택 업데이트 (user 의존)
  // useEffect(() => {
  //   // user에서 ship_id로 shipDrops 목록을 필터링
  //   if (!user || !shipNames) return

  //   const foundShip = shipNames.find((s) => s.value === user.ship_id.toString())

  //   setSelectedShip(foundShip)
  // }, [user, shipNames])

  // 첫 랜더링 시 승선원 선택 업데이트 (ship_id 의존)
  useEffect(() => {
    if (!crewNames) return

    setSelectedUser(crewNames[0])
  }, [crewNames])

  // 선박 선택 상태변경 시 1. 승선원이름 목록 2. 선박정보 3. 승선원들 위치 4. 일반메시지 전체 업데이트 (selectedShip 의존)
  useEffect(() => {
    if (!selectedShip) return

    const ship_id = selectedShip.value

    getCrewNames({ ship_id })
    getShipInfo({ ship_id })
  }, [selectedShip, getCrewNames, getShipInfo])

  // 3초 주기로 위치, 메시지 업데이트
  useEffect(() => {
    if (!selectedShip) return
    const ship_id = selectedShip.value

    getCrewLocations({ ship_id })
    getCrewMessages({ ship_id })

    const interval = setInterval(() => {
      getCrewLocations({ ship_id })
      getCrewMessages({ ship_id })
    }, 3000)

    return () => clearInterval(interval)
  }, [getCrewMessages, getCrewLocations, selectedShip])

  // 건강정보 1. 선택 선박 2. 선택유저 3. 페이지 변경 시 업데이트
  useEffect(() => {
    if (!selectedShip || !selectedUser || !h_page_num) return

    const shipId = selectedShip.value
    const userIndex = selectedUser.value

    getUserHealthList({ pageNum: h_page_num, shipId, userIndex })
  }, [h_page_num, selectedShip, selectedUser, getUserHealthList])

  return {
    pageNums,
    isMobile,
    // shipNames,
    crewNames,
    shipInfo,
    crewLocations,
    selectedShip,
    selectedUser,
    userHealthList,
    crewMessages,
    handleShipChange: setSelectedShip,
    handleUserChange: setSelectedUser,
  }
}
