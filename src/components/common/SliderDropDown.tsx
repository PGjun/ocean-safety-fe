import { useEffect, useState } from 'react'
import { CommonIcon } from '../SvgIcons'
import DropDown from './DropDown'

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

const initData = [{ value: '0', label: '선택' }]

export const SliderDropDownSm = ({
  dropData = initData,
  id,
  fieldValue,
  fieldOnChange,
}: DropProps) => {
  // 초기 인덱스 설정
  const initIdx = dropData.findIndex((item) => item.value === fieldValue?.value)
  const [arrIdx, setArrIdx] = useState(initIdx)

  // fieldValue 변경에 따라 arrIdx 업데이트
  useEffect(() => {
    const newIdx = dropData.findIndex(
      (item) => item.value === fieldValue?.value,
    )
    setArrIdx(newIdx !== -1 ? newIdx : 0)
  }, [fieldValue, dropData])

  // 이전 인덱스로 업데이트
  const handlePrev = () => {
    const newIdx = arrIdx > 0 ? arrIdx - 1 : dropData.length - 1
    setArrIdx(newIdx)
    fieldOnChange && fieldOnChange(dropData[newIdx])
  }

  // 다음 인덱스로 업데이트
  const handleNext = () => {
    const newIdx = arrIdx < dropData.length - 1 ? arrIdx + 1 : 0
    setArrIdx(newIdx)
    fieldOnChange && fieldOnChange(dropData[newIdx])
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

export const SliderDropDown = ({
  dropData = initData,
  id,
  fieldValue,
  fieldOnChange,
}: DropProps) => {
  // 초기 인덱스 설정
  const initIdx = dropData.findIndex((item) => item.value === fieldValue?.value)
  const [arrIdx, setArrIdx] = useState(initIdx)

  // fieldValue 변경에 따라 arrIdx 업데이트
  useEffect(() => {
    const newIdx = dropData.findIndex(
      (item) => item.value === fieldValue?.value,
    )
    setArrIdx(newIdx !== -1 ? newIdx : 0)
  }, [fieldValue, dropData])

  // 이전 인덱스로 업데이트
  const handlePrev = () => {
    const newIdx = arrIdx > 0 ? arrIdx - 1 : dropData.length - 1
    setArrIdx(newIdx)
    fieldOnChange && fieldOnChange(dropData[newIdx])
  }

  // 다음 인덱스로 업데이트
  const handleNext = () => {
    const newIdx = arrIdx < dropData.length - 1 ? arrIdx + 1 : 0
    setArrIdx(newIdx)
    fieldOnChange && fieldOnChange(dropData[newIdx])
  }
  return (
    <div className="flex min-w-[310px] rounded border border-[#C4C4C4] ">
      <button
        type="button"
        className=" border-r border-[#C4C4C4] px-[13px]"
        onClick={handlePrev}
      >
        <CommonIcon.SlideArrow />
      </button>
      <div className="w-full py-[10px]">
        <DropDown.Content
          id={id}
          dropData={dropData}
          fieldValue={fieldValue}
          fieldOnChange={fieldOnChange}
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

//? 컨트롤러 필요하면 사용
//   export const DropDownController = ({
//     dropId,
//     control,
//     name,
//     dropData,
//   }: {
//     dropId: string
//     control: any
//     name: string
//     dropData: DropItem[]
//   }) => {
//     return (
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => {
//           return (
//             <SmallSlideDropDown
//               id={dropId}
//               fieldValue={field.value}
//               fieldOnChange={field.onChange}
//               dropData={dropData}
//             />
//           )
//         }}
//       />
//     )
//   }
