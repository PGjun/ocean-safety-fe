import { useState } from 'react'
import { CommonIcon } from '../SvgIcons'

const dropDataInit = [
  [
    { value: '0', label: '강원호' },
    { value: '1', label: '무궁화호' },
  ],
  [
    { value: '0', label: '강원호2' },
    { value: '1', label: '무궁화호2' },
  ],
  [
    { value: '0', label: '강원호3' },
    { value: '1', label: '무궁화호3' },
  ],
]

interface DropDataItem {
  value: string
  label: string
}
interface DropDownProps {
  dropData?: DropDataItem[][]
}

export const SlideDropDown = ({ dropData = dropDataInit }: DropDownProps) => {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const [openDropBox, setOpenDropBox] = useState(false)
  const [dropObj, setDropObj] = useState({ value: '', label: '' })

  const handlePrev = () => {
    setDropObj({ value: '', label: '' })
    setSelectedGroupIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : dropData.length - 1,
    )
  }

  const handleNext = () => {
    setDropObj({ value: '', label: '' })
    setSelectedGroupIndex((prevIndex) =>
      prevIndex < dropData.length - 1 ? prevIndex + 1 : 0,
    )
  }

  const handleOnClick = (e: any) => {
    setOpenDropBox(false)
    setDropObj({ value: e.target.id, label: e.target.innerText })
  }

  return (
    <div className="flex min-w-[310px] rounded border border-[#C4C4C4]">
      <button
        className=" border-r border-[#C4C4C4] px-[13px]"
        onClick={handlePrev}
      >
        <CommonIcon.SlideArrow />
      </button>
      <div className="relative flex-1">
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
      </div>

      <button
        className="border-l border-[#C4C4C4] px-[13px]"
        onClick={handleNext}
      >
        <CommonIcon.SlideArrow className="rotate-180" />
      </button>
    </div>
  )
}
