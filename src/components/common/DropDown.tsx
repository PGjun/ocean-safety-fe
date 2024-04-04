import { ReactNode, useState } from 'react'
import { CommonIcon } from '../SvgIcons'

const dropDataInit = [
  { value: '0', label: 'SOS' },
  { value: '1', label: '낙상감지' },
]

interface DropDataItem {
  value: string
  label: string
}
interface DropDownProps {
  dropData?: DropDataItem[]
}

// Container 컴포넌트
const Container = ({ type, children }: any) => {
  // 여기서 'type'과 'children'을 사용하여 컴포넌트를 커스터마이징할 수 있습니다.
  return (
    <div className="flex w-full rounded border border-[#C4C4C4]">
      {children}
    </div>
  )
}

// Content 컴포넌트
const Content = ({ dropData = dropDataInit }: DropDownProps) => {
  const [openDropBox, setOpenDropBox] = useState(false)
  const [dropObj, setDropObj] = useState({ value: '', label: '' })

  const handleOnClick = (e: any) => {
    setOpenDropBox(false)
    setDropObj({ value: e.target.id, label: e.target.innerText })
  }

  return (
    <div className="relative flex-1">
      <button
        onClick={() => setOpenDropBox(!openDropBox)}
        className="w-full px-[16px] py-[10px] text-center text-[12px] md:text-[14px]"
      >
        <div className="flex w-full items-center justify-between gap-1">
          {dropObj.value !== '' ? dropObj.label : dropData[0].label}
          <CommonIcon.BLACK_DROPDOWN />
        </div>
      </button>

      {openDropBox && (
        <div className="absolute top-[42px] z-10 w-full rounded border bg-white py-[10px]">
          {dropData.map((ship) => (
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
