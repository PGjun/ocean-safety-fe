import { useEffect, useState } from 'react'
import { useUser } from './useUser'
import { useGroupNames } from './fetch/useGroupNames'
import { useShipNames } from './fetch/useShipNames'
import { SliderDropDown } from '@/components/common/SliderDropDown'
import { ROLES } from '@/constants/roles'
import { DropItem } from '@/types/common'
import DropDown from '@/components/common/DropDown'
import { Control, Controller } from 'react-hook-form'

export const useGroupShipDropDown = (
  type: 'default' | 'preload' = 'default',
) => {
  const { user, role } = useUser()
  const { groupNames, getGroupNames } = useGroupNames()
  const { shipNames, getShipNames } = useShipNames()
  const [selectedGroup, setSelectedGroup] = useState<DropItem | undefined>(
    undefined,
  )
  const [selectedShip, setSelectedShip] = useState<DropItem | undefined>(
    undefined,
  )

  // 초기 호춢
  useEffect(() => {
    getGroupNames()
  }, [getGroupNames])

  useEffect(() => {
    getShipNames()
  }, [getShipNames])

  // 타입이 preload이면 초기값 세팅
  useEffect(() => {
    if (type === 'preload' && groupNames && user) {
      //선택된 그룹이 있으면 종료
      if (selectedGroup) return

      const foundGroup = groupNames.find(
        (item) => item.value === user.group_id.toString(),
      )
      setSelectedGroup(foundGroup)
    }
  }, [groupNames, user])

  // 타입이 preload이면 초기값 세팅
  useEffect(() => {
    if (type === 'preload' && shipNames && user) {
      const foundShip =
        shipNames.find((item) => item.value === user.ship_id.toString()) ??
        shipNames[0]

      setSelectedShip(foundShip)
    }
  }, [shipNames])

  //그룹 선택 시 선박 목록 호출
  const handleGroup = (data: DropItem) => {
    setSelectedGroup(data)
    getShipNames(data.value)
  }

  const renderGroupMain = () => (
    <div className={role !== ROLES.ADMIN ? 'hidden' : ''}>
      <span className="text-[14px] md:text-[16px]">그룹 선택</span>
      <SliderDropDown
        id="main_group_dropdown"
        dropData={groupNames}
        fieldValue={selectedGroup}
        placeholder="그룹 선택"
        fieldOnChange={handleGroup}
      />
    </div>
  )

  const renderShipMain = ({ handleShipChange }: { handleShipChange?: any }) => (
    <div
      className={role !== ROLES.ADMIN && role !== ROLES.GROUP ? 'hidden' : ''}
    >
      <span className="text-[14px] md:text-[16px]">선박 선택</span>
      <SliderDropDown
        id="main_ship_dropdown"
        dropData={shipNames}
        fieldValue={selectedShip}
        placeholder="선박 선택"
        fieldOnChange={(value) => {
          if (handleShipChange) {
            handleShipChange(value)
          }
          setSelectedShip(value)
        }}
      />
    </div>
  )

  const renderSearchGroupController = ({
    placeholder,
    control,
    name,
    label,
    setValue,
  }: {
    placeholder?: string
    control: Control
    name: string
    label?: string
    setValue: any
  }) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const fieldValue = field.value
          ? field.value
          : { value: '0', label: '전체' }

        const wrapGroupNames =
          groupNames?.length !== 0
            ? [{ value: '0', label: '전체' }, ...(groupNames || [])]
            : []
        return (
          <label
            htmlFor={name}
            className="flex flex-col rounded border border-[#DEE2E6] bg-white py-[0.7rem]"
          >
            <div className="px-[16px] text-[14px] font-bold md:text-[12px]">
              {label}
            </div>
            <div className="h-[21px]">
              <DropDown.Content
                fieldValue={fieldValue}
                fieldOnChange={(value) => {
                  handleGroup(value)
                  setValue('shipDrop', '')
                  field.onChange(value)
                }}
                id={name}
                dropData={wrapGroupNames}
                placeholder={placeholder}
                type="between"
              />
            </div>
          </label>
        )
      }}
    />
  )

  const renderSearchShipController = ({
    placeholder,
    control,
    name,
    label,
  }: {
    placeholder?: string
    control: Control
    name: string
    label?: string
  }) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const fieldValue = field.value
          ? field.value
          : role === ROLES.GROUP
            ? { value: '0', label: '전체' }
            : null

        const wrapShipNames =
          shipNames?.length !== 0
            ? [{ value: '0', label: '전체' }, ...(shipNames || [])]
            : []

        const validDropData =
          role === ROLES.ADMIN && control._getWatch('groupDrop') === undefined
            ? []
            : wrapShipNames
        return (
          <label
            htmlFor={name}
            className="flex flex-col rounded border border-[#DEE2E6] bg-white py-[0.7rem]"
          >
            <div className="px-[16px] text-[14px] font-bold md:text-[12px]">
              {label}
            </div>
            <div className="h-[21px]">
              <DropDown.Content
                fieldValue={fieldValue}
                fieldOnChange={(value) => {
                  field.onChange(value)
                }}
                id={name}
                dropData={validDropData}
                placeholder={placeholder}
                type="between"
              />
            </div>
          </label>
        )
      }}
    />
  )

  return {
    groupId: selectedGroup?.value,
    shipId: selectedShip?.value,
    groupDrop: selectedGroup,
    shipDrop: selectedShip,
    DropDownFC: {
      GroupMain: renderGroupMain,
      ShipMain: renderShipMain,
      GroupSearchController: renderSearchGroupController,
      ShipSearchController: renderSearchShipController,
    },
  }
}
