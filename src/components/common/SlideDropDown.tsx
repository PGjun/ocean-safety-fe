import { useEffect, useState } from 'react'
import { CommonIcon } from '../SvgIcons'
import DropDown from './DropDown'
import useDropdownStore from '@/stores/dropdownStore'
import { Controller } from 'react-hook-form'

const dropDataInit = [[{ value: '0', label: '선택' }]]

interface DropDataItem {
  value: string
  label: string
}
interface DropDownProps {
  dropData?: DropDataItem[][]
  id: string
  fieldValue?: DropDataItem
  fieldOnChange?: ({ value, label }: DropDataItem) => void
}

export const SlideDropDown = ({
  dropData = dropDataInit,
  id,
  fieldValue,
  fieldOnChange,
}: DropDownProps) => {
  const groupIndex = dropData.findIndex((group) =>
    group.some((item) => item.value === fieldValue?.value),
  )

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(
    groupIndex !== -1 ? groupIndex : 0,
  )
  const { setSelectedValue } = useDropdownStore()

  const handlePrev = () => {
    setSelectedGroupIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : dropData.length - 1,
    )
    setSelectedValue(id, { value: '', label: '' })
    fieldOnChange && fieldOnChange({ value: '', label: '' })
  }

  const handleNext = () => {
    setSelectedGroupIndex((prevIndex) =>
      prevIndex < dropData.length - 1 ? prevIndex + 1 : 0,
    )
    setSelectedValue(id, { value: '', label: '' })
    fieldOnChange && fieldOnChange({ value: '', label: '' })
  }

  // const handleOnClick = (e: any) => {
  //   setOpenDropBox(false)
  //   setDropObj({ value: e.target.id, label: e.target.innerText })
  // }

  return (
    <div className="flex min-w-[310px] rounded border border-[#C4C4C4] ">
      <button
        type="button"
        className=" border-r border-[#C4C4C4] px-[13px]"
        onClick={handlePrev}
      >
        <CommonIcon.SlideArrow />
      </button>
      {/* <div className="relative flex-1">
        <button
          onClick={() => setOpenDropBox(!openDropBox)}
          className="w-full py-[10px] text-center text-[12px] md:text-[14px]"
        >
          <div className="flex w-full items-center justify-center gap-1">
            {dropObj.value !== ''
              ? dropObj.label
              : dropData[selectedGroupIndex][0].label}
            <CommonIcon.DropDownArrow />
          </div>
        </button>

        {openDropBox && (
          <div className="absolute top-[42px] w-full rounded border bg-white py-[10px]">
            {dropData[selectedGroupIndex].map((ship) => (
              <div
                key={ship.value}
                id={ship.value}
                className="cursor-pointer p-[7px] text-[14px] hover:bg-[#F3F5FF]"
                onClick={(e) => handleOnClick(e)}
              >
                {ship.label}
              </div>
            ))}
          </div>
        )}
      </div> */}
      <div className="w-full py-[10px]">
        <DropDown.Content
          id={id}
          dropData={dropData[selectedGroupIndex]}
          fieldValue={fieldValue}
          fieldOnChange={fieldOnChange}
          type="center"
        />
      </div>
      <button
        type="button"
        className="border-l border-[#C4C4C4] px-[13px]"
        onClick={handleNext}
      >
        <CommonIcon.SlideArrow className="rotate-180" />
      </button>
    </div>
  )
}
interface DropItem {
  value: string
  label: string
}
interface DropProps {
  dropData?: DropItem[]
  id: string
  fieldValue?: DropItem
  fieldOnChange?: ({ value, label }: DropItem) => void
}

const dropDataInit2 = [{ value: '0', label: '선택' }]

export const SmallSlideDropDown = ({
  dropData = dropDataInit2,
  id,
  fieldValue,
  fieldOnChange,
}: DropProps) => {
  // 초기 인덱스 설정
  const initialIndex = dropData.findIndex(
    (item) => item.value === fieldValue?.value,
  )
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)

  // fieldValue 변경에 따라 selectedIndex 업데이트
  useEffect(() => {
    const newIndex = dropData.findIndex(
      (item) => item.value === fieldValue?.value,
    )
    setSelectedIndex(newIndex !== -1 ? newIndex : 0)
  }, [fieldValue, dropData])

  const handlePrev = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : dropData.length - 1
    setSelectedIndex(newIndex) // 이전 인덱스로 업데이트
    fieldOnChange && fieldOnChange(dropData[newIndex]) // 변경된 값으로 fieldOnChange 호출
  }

  const handleNext = () => {
    const newIndex = selectedIndex < dropData.length - 1 ? selectedIndex + 1 : 0
    setSelectedIndex(newIndex) // 다음 인덱스로 업데이트
    fieldOnChange && fieldOnChange(dropData[newIndex]) // 변경된 값으로 fieldOnChange 호출
  }
  return (
    <div className="flex w-full min-w-[234px] rounded border border-[#C4C4C4] font-normal md:max-w-[234px]">
      <button
        type="button"
        className=" border-r border-[#C4C4C4] px-[13px]"
        onClick={handlePrev}
      >
        <CommonIcon.SlideArrow />
      </button>
      <div className="w-full py-[7px]">
        <DropDown.Content
          id={id}
          dropData={dropData}
          fieldValue={fieldValue}
          fieldOnChange={fieldOnChange}
          type="center"
        />
      </div>
      <button
        type="button"
        className="border-l border-[#C4C4C4] px-[13px]"
        onClick={handleNext}
      >
        <CommonIcon.SlideArrow className="rotate-180" />
      </button>
    </div>
  )
}

export const DropDownController = ({
  dropId,
  control,
  name,
  dropData,
}: {
  dropId: string
  control: any
  name: string
  dropData: DropItem[]
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <SmallSlideDropDown
            id={dropId}
            fieldValue={field.value}
            fieldOnChange={field.onChange}
            dropData={dropData}
          />
        )
      }}
    />
  )
}
