import { useState } from 'react'
import { CommonIcon } from '../SvgIcons'
import DropDown from './DropDown'
import useDropdownStore from '@/stores/dropdownStore'

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

export const SmallSlideDropDown = ({
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
