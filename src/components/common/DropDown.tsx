import { ReactNode, useEffect, useRef, useState } from 'react'
import { CommonIcon } from '../SvgIcons'
import useDropdownStore from '@/stores/dropdownStore'

const dropDataInit = [
  { value: '0', label: 'SOS' },
  { value: '1', label: '낙상감지' },
]

interface DropDataItem {
  value: string
  label: string
}
interface DropDownProps {
  type?: 'center' | 'between'
  dropData?: DropDataItem[]
  id: string
  fieldValue?: DropDataItem
  fieldOnChange?: ({ value, label }: DropDataItem) => void
  placeholder?: string
}

// Container 컴포넌트
const Container = ({ type, children }: any) => {
  // 여기서 'type'과 'children'을 사용하여 컴포넌트를 커스터마이징할 수 있습니다.
  return (
    <div className="flex w-full rounded border border-[#C4C4C4] py-[10px]">
      {children}
    </div>
  )
}

// Content 컴포넌트
const Content = ({
  type = 'center',
  dropData = dropDataInit,
  id,
  fieldValue,
  fieldOnChange,
  placeholder,
}: DropDownProps) => {
  //드롭다운 관리
  const { activeDropdown, setActiveDropdown } = useDropdownStore()

  // 드롭다운 ref
  const dropdownRef: any = useRef(null)

  // 드롭다운을 열거나 닫습니다.
  const toggleDropdown = () => {
    setActiveDropdown(activeDropdown === id ? '' : id)
  }

  // 드롭다운 외부 클릭 감지용
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown('')
      }
    }
    document.addEventListener('mouseup', handleClickOutside)
    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [setActiveDropdown])

  const handleOnClick = (dropItem: { value: string; label: string }) => {
    setActiveDropdown('') // 드롭다운을 닫습니다.
    fieldOnChange && fieldOnChange(dropItem)
  }

  return (
    <div className="relative flex-1 px-[16px]">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full text-center text-[12px] md:text-[14px]"
      >
        <div
          className={
            type === 'between'
              ? `flex w-full items-center justify-between gap-1`
              : `flex w-full items-center justify-center gap-1`
          }
        >
          <span
            className={
              fieldValue?.label
                ? ''
                : placeholder
                  ? ' text-[14px] text-[#C4C4C4]'
                  : ''
            }
          >
            {fieldValue?.label
              ? fieldValue?.label
              : placeholder
                ? placeholder
                : dropData[0].label}
          </span>
          <CommonIcon.BLACK_DROPDOWN />
        </div>
      </button>

      {activeDropdown === id && (
        <div
          className="absolute left-0 top-[35px] z-10 max-h-[300px] w-full overflow-auto rounded border bg-white py-[10px]"
          ref={dropdownRef}
        >
          {dropData.map((item) => (
            <div
              key={item.value}
              id={item.value}
              className="cursor-pointer p-[7px] text-[14px] hover:bg-[#F3F5FF]"
              onClick={() =>
                handleOnClick({ value: item.value, label: item.label })
              }
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface DropDownType {
  Container: typeof Container
  Content: typeof Content
}

// DropDown 컴포넌트
const DropDown: DropDownType = {
  Container,
  Content,
}

export default DropDown
