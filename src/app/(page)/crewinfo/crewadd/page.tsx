'use client'

import { PATHS } from '@/constants/paths'
import Link from 'next/link'
import { useForm, Controller, Control } from 'react-hook-form'
import Image from 'next/image'
import { DatePickerSingle } from '@/components/common/DatePicker'
import { SlideDropDown } from '@/components/common/SlideDropDown'

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

const RadioField = ({ control, name, label }: Field) => {
  let value1 = ''
  let value2 = ''
  let text1 = ''
  let text2 = ''

  if (name === 'gender') {
    value1 = 'M'
    value2 = 'F'
    text1 = '남'
    text2 = '여'
  } else if (name === 'personal-info' || name === 'safety-training') {
    value1 = 'Y'
    value2 = 'N'
    text1 = 'o'
    text2 = 'x'
  }

  const common =
    'w-full rounded border py-[10px] text-center text-[14px] font-bold cursor-pointer'
  const normal = 'border-[#C4C4C4] text-[#333333]'
  const active = 'border-[#2262C6] bg-[#F3F5FF] text-[#2262C6]'
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="">
          <label className="text-[12px] font-bold">{label}</label>
          <div className="flex gap-[5px]">
            <label
              htmlFor={name + value1}
              className={`${field.value === value1 ? active : normal} ${common}`}
            >
              {text1}
            </label>
            <input
              id={name + value1}
              type="radio"
              value={field.value}
              onChange={() => field.onChange(value1)}
              checked={field.value === value1}
              className="hidden"
            />
            <label
              htmlFor={name + value2}
              className={`${field.value === value2 ? active : normal} ${common}`}
            >
              {text2}
            </label>
            <input
              id={name + value2}
              type="radio"
              value={field.value}
              onChange={() => field.onChange(value2)}
              checked={field.value === value2}
              className="hidden"
            />
          </div>
        </div>
      )}
    />
  )
}

// 필드 설정을 포함한 배열 정의
const crewInfofields = [
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'userId',
    label: '사용자 ID',
    placeholder: '사용자 ID를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'phone',
    label: '연락처',
    placeholder: '연락처를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'birth',
    label: '생년월일',
    defaultValue: '',
    component: DatePickerSingle,
  },
  {
    name: 'age',
    label: '나이',
    placeholder: '나이를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'gender',
    label: '성별',
    defaultValue: 'M',
    component: RadioField,
  },
  {
    name: 'zip-code',
    label: '우편번호',
    placeholder: '우편번호를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'road-name',
    label: '도로명 주소',
    placeholder: '도로명 주소를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'address',
    label: '상세 주소',
    placeholder: '상세 주소를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'company',
    label: '소속 업체',
    placeholder: '소속 업체를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'safety-training',
    label: '사전 예방 안전교육 이수 여부',
    defaultValue: 'Y',
    component: RadioField,
  },
  {
    name: 'safety-training-date',
    label: '마지막 이수 일자',
    defaultValue: '',
    component: DatePickerSingle,
  },
  {
    name: 'crew-level',
    label: '승선원 구분',
    placeholder: '승선원 구분을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'crew-join-date',
    label: '승선원 가입일',
    defaultValue: '',
    component: DatePickerSingle,
  },
  {
    name: 'group',
    label: '소속 그룹',
    placeholder: '소속 그룹을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'personal-info',
    label: '개인정보제공 동의 여부',
    defaultValue: 'Y',
    component: RadioField,
  },
  {
    name: 'personal-info-date',
    label: '개인정보제공 동의 일',
    defaultValue: '',
    component: DatePickerSingle,
  },
]

const CrewInfoForm = () => {
  // useForm에서 defaultValues를 동적으로 생성
  const defaultValues = crewInfofields.reduce(
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
      {crewInfofields.map((field, index) => {
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

// 필드 설정을 포함한 배열 정의
const wearableFields = [
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'userId',
    label: '사용자 ID',
    placeholder: '사용자 ID를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'phone',
    label: '연락처',
    placeholder: '연락처를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'birth',
    label: '생년월일',
    defaultValue: '',
    component: DatePickerSingle,
  },
  {
    name: 'age',
    label: '나이',
    placeholder: '나이를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'gender',
    label: '성별',
    defaultValue: 'M',
    component: RadioField,
  },
  {
    name: 'zip-code',
    label: '우편번호',
    placeholder: '우편번호를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'road-name',
    label: '도로명 주소',
    placeholder: '도로명 주소를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'address',
    label: '상세 주소',
    placeholder: '상세 주소를 입력하세요',
    defaultValue: '',
    component: Field,
  },
]

const WearableForm = () => {
  // useForm에서 defaultValues를 동적으로 생성
  const defaultValues = wearableFields.reduce(
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
      {wearableFields.map((field, index) => {
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

const AreaSettings = () => {
  return (
    <div className="mt-[10px]">
      <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
        <span className="text-[14px] md:text-[16px]">선박 선택</span>
        <SlideDropDown />
      </div>
      <div className="mt-[10px]">
        <Image
          src="/temp-ship.png"
          alt="tempship"
          width={1100}
          height={200}
          style={{ objectFit: 'fill' }}
        />
      </div>
      <div className="mt-[30px] flex flex-col gap-2">
        <span className="text-[14px] md:text-[16px]">선택 영역</span>
        <div className="flex gap-2">
          <div className="flex items-center gap-[12px] rounded border border-[#C4C4C4] px-[16px] py-[10px]">
            <div className="text-[12px] md:text-[14px]">비콘 RSSI 값 2</div>
            <div className="relative h-[10px] w-[10px]">
              <div className="absolute top-[4px] h-[1px] w-full rotate-45 rounded bg-[#888888]"></div>
              <div className="absolute top-[4px] h-[1px] w-full -rotate-45 rounded bg-[#888888]"></div>
            </div>
          </div>
          <div className="flex items-center gap-[12px] rounded border border-[#C4C4C4] px-[16px] py-[10px]">
            <div className="text-[12px] md:text-[14px]">비콘 RSSI 값 2</div>
            <div className="relative h-[10px] w-[10px]">
              <div className="absolute top-[4px] h-[1px] w-full rotate-45 rounded bg-[#888888]"></div>
              <div className="absolute top-[4px] h-[1px] w-full -rotate-45 rounded bg-[#888888]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[32px] font-bold">소속 그룹</div>
      <div className="mt-[15px] text-[14px]">그룹 선택</div>
      <div className="mt-[5px]">
        <SlideDropDown
          dropData={[
            [{ value: '0', label: '유에스티21' }],
            [{ value: '1', label: '유에스티32' }],
          ]}
        />
      </div>
    </div>
  )
}

export default function CrewAdd() {
  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold">승선원 추가</div>
      <div className="mt-[20px] font-bold">승선원 내역</div>
      <CrewInfoForm />
      <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
      <div className="mt-[20px] font-bold">웨어러블 정보</div>
      <WearableForm />
      <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
      <div className="mt-[20px] font-bold">제한 구역 설정</div>
      <AreaSettings />
      <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
        <Link href={PATHS.CREW_INFO}>
          <button className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]">
            취소
          </button>
        </Link>
        <button className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]">
          추가
        </button>
      </div>
    </div>
  )
}

{
  /* <div className="mt-[32px] flex items-center justify-center">
  <div className="w-[310px] md:mx-[40px] md:min-w-[1100px]">
    <div className="text-[26px] font-bold">승선원 추가</div>
    <div className="mt-[15px] flex h-[580px] items-center justify-center bg-[#F3F5FF]">
      <div className="flex flex-col items-center gap-[30px] text-center">
        <div className="h-[190px] w-[190px] border-[6px] border-[#2262C6] bg-white"></div>
        <div className="max-w-[270px] text-[18px] font-bold leading-[21.6qpx] text-[#2262C6] md:max-w-[340px]">
          {`웨어러블 정보를 입력하기 위해 갤럭시
         워치로 QR코드를 인식해주세요.`}
        </div>
      </div>
    </div>
    <div className="mt-[10px] flex justify-end">
      <button className="rounded border border-[#888888] px-[28px] py-[10px] text-[14px] font-bold md:text-[18px]">
        건너뛰기
      </button>
      []
    </div>
  </div>
</div> */
}
