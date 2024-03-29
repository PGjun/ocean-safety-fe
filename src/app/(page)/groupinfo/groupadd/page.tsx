'use client'

import { PATHS } from '@/constants/paths'
import Image from 'next/image'
import Link from 'next/link'
import { Control, Controller, useForm } from 'react-hook-form'

interface Field {
  control: Control<any>
  name: string
  label: string
  currentValue?: string
  defaultValue?: string
  placeholder?: string
}

// 기본 필드와 커스텀 필드 컴포넌트 정의
const Field = ({ control, name, label, placeholder }: Field) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <input
          {...field}
          value={field.value || ''}
          onChange={(e) => field.onChange(e.target.value)}
          id={name}
          type="text"
          className="block w-full rounded border border-[#C4C4C4] px-[15px] py-[10px] text-[14px]"
          placeholder={placeholder}
        />
      </div>
    )}
  />
)

// 필드 설정을 포함한 배열 정의
const groupFields = [
  {
    name: 'ship-number',
    label: '선박번호',
    placeholder: '선박번호를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship-name',
    label: '선박명',
    placeholder: '선박명을 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'port-of-loading',
    label: '선적항(국적)',
    placeholder: '선적항(국적)을 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'inter-gross-ton',
    label: '국제총톤수',
    defaultValue: '국제총톤수를 입력하세요.',
    component: Field,
  },
  {
    name: 'dead-weight-ton',
    label: '재화중량톤수',
    placeholder: '재화중량톤수를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'reg-class-name',
    label: '등록선급명',
    placeholder: '등록선급명을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'launch-date',
    label: '진수일',
    placeholder: '진수일을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'dockyard',
    label: '조선소',
    placeholder: '조선소를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship-owner',
    label: '선박소유자',
    placeholder: '선박소유자를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'business-name',
    label: '사업자명',
    placeholder: '사업자명을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship-lessee',
    label: '선박임차인',
    placeholder: '선박임차인을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'rental-period',
    label: '임차기간',
    placeholder: '임차기간을 입력하세요',
    defaultValue: '',
    component: Field,
  },
]

const GroupInfoForm = () => {
  // useForm에서 defaultValues를 동적으로 생성
  const defaultValues = groupFields.reduce(
    (acc: { [key: string]: any }, field) => {
      acc[field.name] = field.defaultValue
      return acc
    },
    {},
  )

  const { control, handleSubmit, watch } = useForm({ defaultValues })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[10px] grid gap-[16px] md:grid-cols-3 md:gap-[32px]"
    >
      {groupFields.map((field, index) => {
        const currentValue = watch(field.name)
        return (
          <field.component
            key={index}
            control={control}
            currentValue={currentValue}
            {...field}
          />
        )
      })}
    </form>
  )
}

const ShipDrawing = () => {
  return (
    <div>
      <div className="text-[18px] font-bold">선박 도면</div>
      <div className="mt-[10px] flex w-full justify-between rounded py-[7px] pl-[16px] pr-[6px] text-[14px] outline-dotted outline-[2px] outline-[#C4C4C4]">
        <input
          type="text"
          className="flex-1 bg-white"
          placeholder="선박 도면을 등록해 주세요."
          disabled
        />
        <button className="rounded border border-[#C4C4C4] px-[12px] py-[2px] text-[12px]">
          파일 업로드
        </button>
      </div>

      <div className="mt-[20px] text-[12px] font-bold md:text-[14px]">
        선박 도면 미리보기
      </div>
      <div className="mt-[5px] rounded bg-[#F3F2F8] p-[20px] md:p-[40px]">
        <Image
          src="/temp-ship.png"
          alt="tempship"
          width={1100}
          height={200}
          style={{ objectFit: 'fill' }}
        />
      </div>
    </div>
  )
}

export default function GroupAdd() {
  return (
    <div className="mt-[10px] justify-center last:flex md:mx-[40px]">
      <div className="w-[310px] md:w-[1100px]">
        <div className="text-[22px] font-bold">그룹(선박) 추가</div>
        <GroupInfoForm />
        <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
        <ShipDrawing />
        <div className="mb-[150px] mt-[30px] flex justify-center gap-[5px] md:mb-[100px] md:mt-[60px]">
          <Link href={PATHS.GROUP_INFO}>
            <button className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]">
              취소
            </button>
          </Link>
          <button className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]">
            추가
          </button>
        </div>
      </div>
    </div>
  )
}
