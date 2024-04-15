'use client'

import GoogleMapWrapper from '@/components/common/GoogleMapWrapper'
import { CommonIcon } from '@/components/SvgIcons'
import { SearchParams } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { useState } from 'react'
import { Control, Controller, useForm } from 'react-hook-form'
import DropDown from '@/components/common/DropDown'
import { SearchBox } from '@/components/common/SearchBox'
import { SosListTable } from './components/SosListTable'
import { DatePickerController } from '@/components/common/DatePicker'
import { useRouter } from 'next/navigation'
import moment from 'moment'

const DropWrapper = ({
  placeholder,
  dropData,
  control,
  name,
  label,
}: {
  placeholder: string
  dropData?: { value: string; label: string }[]
  control: Control
  name: string
  label: string
}) => {
  return (
    <label
      htmlFor={name}
      className="flex flex-col rounded border border-[#DEE2E6] bg-white py-[16px]"
    >
      <div className="px-[16px] text-[14px] font-bold md:text-[12px]">
        {label}
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DropDown.Content
            fieldValue={field.value}
            fieldOnChange={field.onChange}
            id={name}
            dropData={dropData}
            placeholder={placeholder}
          />
        )}
      />
    </label>
  )
}

// 필드 설정을 포함한 배열 정의
const Searhfields = [
  {
    name: 'search_ship',
    label: '선박명',
    placeholder: '선박명을 입력해 주세요.',
    component: SearchBox,
    width: 176,
  },
  {
    name: 'search_date',
    label: '기록일',
    placeholder: 'YY.MM.DD ~ YY.MM.DD',
    component: DatePickerController,
    width: 245,
  },
  {
    name: 'search_name',
    label: '이름',
    placeholder: '이름을 입력해 주세요.',
    component: SearchBox,
    width: 166,
  },
  {
    name: 'search_code',
    label: '응급코드',
    placeholder: '==선택==',
    component: DropWrapper,
    width: 129,
    dropData: [
      { value: '0', label: 'SOS' },
      { value: '1', label: '낙상감지' },
    ],
  },
  {
    name: 'search_status',
    label: '처리현황',
    placeholder: '==선택==',
    component: DropWrapper,
    width: 129,
    dropData: [
      { value: '0', label: '처리완료' },
      { value: '1', label: '미완료' },
    ],
  },
]

export default function SosPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const searchParams = pageProps.searchParams

  const router = useRouter()

  const isMobile = useMediaQuery('768')

  const [sosId, setSosId] = useState<number | null>(null)
  const [location, setLocation] = useState<
    { lng: number; lat: number } | undefined
  >()

  const { control, handleSubmit } = useForm()

  const [query, setQuery] = useState<any>()

  interface SearchData {
    search_ship?: string
    search_name?: string
    search_start_date?: string
    search_end_date?: string
    search_code?: string | { value: string; label: string }
    search_status?: string | { value: string; label: string }
    search_date?: { start: string; end: string }
  }

  const onSubmit = (data: SearchData) => {
    const { search_date, search_code, search_status, ...rest } = data
    console.log('🚀 ~ onSubmit ~ data:', data)

    let updatedQuery: SearchData = { ...rest }

    if (typeof search_code === 'object' && search_code.label !== '') {
      updatedQuery.search_code = search_code.label
    }

    if (typeof search_status === 'object' && search_status.label !== '') {
      updatedQuery.search_status = search_status.label
    }

    if (search_date && search_date.start !== '' && search_date.end !== '') {
      updatedQuery.search_start_date = moment(search_date.start).format(
        'YYYY-MM-DD',
      )
      updatedQuery.search_end_date = moment(search_date.end).format(
        'YYYY-MM-DD',
      )
    }

    setQuery(updatedQuery)

    router.push(PATHS.SOS({ page_num: '1' }))
  }

  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">SOS 내역</div>
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
            <button className="flex items-center justify-center gap-[3px] rounded bg-[#333333] px-[28px] py-[10px] text-white">
              <CommonIcon.Search /> 검색
            </button>
          </div>
        </div>
      </form>
      <div className="mt-[20px] text-[18px]">
        검색결과 <span className="font-bold">{22}</span>건
      </div>
      <div className="flex gap-[20px]">
        <SosListTable
          searchParams={searchParams}
          sosId={sosId}
          setSosId={setSosId}
          setLocation={setLocation}
          query={query}
        />
        {!isMobile && (
          <div className="mt-[10px] flex flex-col gap-[8px]">
            <div className="h-[410px] w-[259px]">
              <GoogleMapWrapper location={location} />
            </div>

            <Link href={PATHS.SOS_DETAIL}>
              <button className="w-full rounded border border-[#888888] py-[5px] font-bold">
                상세보기
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
