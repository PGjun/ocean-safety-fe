import { useEffect, useState } from 'react'
import { useUser } from './useUser'
import { useMediaQuery } from './useMediaQuery'
import { useGroupNames } from './fetch/useGroupNames'
import { useShipNames } from './fetch/useShipNames'
import { SliderDropDown } from '@/components/common/SliderDropDown'
import { ROLES } from '@/constants/roles'
import { DropItem } from '@/types/common'

export const useGroupShipDropDown = (
  type: 'default' | 'preload' = 'default',
) => {
  const isMobile = useMediaQuery('768')

  const { user, role } = useUser()
  const { groupNames, getGroupNames } = useGroupNames()
  const { shipNames, getShipNames } = useShipNames()
  const [selGroupDrop, setSelGroupDrop] = useState<DropItem | undefined>(
    undefined,
  )
  const [selShipDrop, setSelShipDrop] = useState<DropItem | undefined>(
    undefined,
  )

  // 초기 호춢
  useEffect(() => {
    getGroupNames()
    getShipNames()
  }, [getGroupNames, getShipNames])

  // 타입이 preload이면 초기값 세팅
  useEffect(() => {
    if (type !== 'preload' || !groupNames || !user) return
    setSelGroupDrop(
      groupNames.find((item) => item.value === user.group_id.toString()),
    )
  }, [groupNames, user, type])

  // 타입이 preload이면 초기값 세팅
  useEffect(() => {
    if (type !== 'preload' || !shipNames || !user) return
    setSelShipDrop(
      shipNames.find((item) => item.value === user.ship_id.toString()),
    )
  }, [shipNames, user, type])

  //그룹 선택 시 선박 목록 호출
  const handleGroup = (data: DropItem) => {
    setSelGroupDrop(data)
    getShipNames(data.value)
  }

  const renderGroupMain = () => (
    <div className={role !== ROLES.ADMIN ? 'hidden' : ''}>
      {isMobile ? null : <div>그룹 선택</div>}
      <SliderDropDown
        id="main_group_dropdown"
        dropData={groupNames}
        fieldValue={selGroupDrop}
        placeholder="그룹 선택"
        fieldOnChange={handleGroup}
      />
    </div>
  )

  const renderShipMain = () => (
    <div
      className={role !== ROLES.ADMIN && role !== ROLES.GROUP ? 'hidden' : ''}
    >
      {isMobile ? null : <div>선박 선택</div>}
      <SliderDropDown
        id="main_ship_dropdown"
        dropData={shipNames}
        fieldValue={selShipDrop}
        placeholder="선박 선택"
        fieldOnChange={setSelShipDrop}
      />
    </div>
  )

  return {
    groupId: selGroupDrop?.value,
    shipId: selShipDrop?.value,
    DropDownFC: {
      GroupMain: renderGroupMain,
      ShipMain: renderShipMain,
    },
  }
}
