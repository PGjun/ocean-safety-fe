'use client'

import { CommonIcon } from '@/components/SvgIcons'
import { SearchBox } from '@/components/common/SearchBox'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useForm } from 'react-hook-form'
import { HealthSearchTable } from './components/HealthSearchTable'

// 필드 설정을 포함한 배열 정의
const Searhfields = [
  {
    name: 'ship',
    label: '선박명',
    placeholder: '선박명을 입력해 주세요.',
    component: SearchBox,
    width: 176,
  },
  {
    name: 'reg-date',
    label: '기록일',
    placeholder: 'YY.MM.DD ~ YY.MM.DD',
    component: SearchBox,
    width: 245,
  },
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력해 주세요.',
    component: SearchBox,
    width: 166,
  },
]

export default function HealthInfoPage() {
  const isMobile = useMediaQuery('768')
  const { control, handleSubmit } = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">건강정보 기록</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
          <div className="grid gap-[8px] md:grid-cols-[repeat(6,auto)]">
            {Searhfields.map((field, index) => {
              return (
                <div
                  key={index}
                  className="w-full"
                  style={{ width: isMobile ? '100%' : field.width }}
                >
                  <field.component control={control} {...field} />
                </div>
              )
            })}
            <button className="flex items-center justify-center gap-[8px] rounded bg-[#333333] px-[28px] py-[10px] text-[16px] text-white md:text-[18px]">
              <CommonIcon.Search /> 검색
            </button>
          </div>
        </div>
      </form>
      <div className="mt-[20px] flex items-end justify-between">
        <div>
          검색결과
          <span className="text-[18px] font-bold leading-[18px]">{` 22`}</span>
          건
        </div>
        <div className="rounded border border-[#888888] px-[12px] py-[8px] text-[12px] font-bold leading-[14.32px] md:px-[16px] md:text-[12px] md:leading-[16.71px]">
          SOS 설정
        </div>
      </div>
      <div className="flex gap-[20px]">
        <HealthSearchTable />
      </div>
    </div>
  )
}
