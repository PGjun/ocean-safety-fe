'use client'

import { PATHS } from '@/constants/paths'
import Link from 'next/link'
import { useForm, Controller, Control } from 'react-hook-form'
import { DatePickerSingleController } from '@/components/common/DatePicker'
import DropDown from '@/components/common/DropDown'
import { useEffect, useState } from 'react'
import {
  fetchCompanyList,
  fetchCrewLevel,
  fetchShipNameList,
  postUser,
} from '@/services/api/user'
import moment from 'moment'
import { useUser } from '@/hooks/useUser'
import { SliderDropDown } from '@/components/common/SliderDropDown'
import { useRouter } from 'next/navigation'

interface Field {
  control: Control<any>
  name: string
  label: string
  currentValue?: string
  defaultValue?: string
  placeholder?: string
  maxLength?: number
  dropDatas?: { crewLevels?: []; companies?: [] }
}

const formatPhoneNumber = (value: string) => {
  if (!value) return value

  // 숫자만 추출
  const phoneNumber = value.replace(/[^\d]/g, '')

  // 숫자 길이에 따라 포맷 조정
  if (phoneNumber.length < 4) return phoneNumber
  if (phoneNumber.length < 8)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`
}

const PhoneController = ({ control, name, label, placeholder }: Field) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <input
          {...field}
          value={formatPhoneNumber(field.value)}
          onChange={(e) => {
            // 입력값이 11자리를 초과하지 않도록 조정
            const formatted = formatPhoneNumber(e.target.value)
            if (formatted.replace(/[^0-9]/g, '').length <= 11) {
              field.onChange(formatted)
            }
          }}
          id={name}
          type="text"
          className="block w-full rounded border border-[#C4C4C4] px-[15px] py-[10px] text-[14px]"
          placeholder={placeholder}
        />
      </div>
    )}
  />
)

const NumberFieldController = ({
  control,
  name,
  label,
  placeholder,
  maxLength,
}: Field) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <input
          {...field}
          value={field.value || ''}
          onChange={(e) => {
            if (!maxLength) return
            const newValue = e.target.value.replace(/\D/g, '') // 숫자만 허용
            if (newValue !== field.value && newValue.length <= maxLength) {
              // 길이 제한 검사
              field.onChange(newValue)
            }
          }}
          id={name}
          maxLength={maxLength}
          type="number"
          className="block w-full rounded border border-[#C4C4C4] px-[15px] py-[10px] text-[14px]"
          placeholder={placeholder}
        />
      </div>
    )}
  />
)

const CompanyDropController = ({
  control,
  name,
  label,
  dropDatas,
  placeholder,
}: Field) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <div className="block w-full rounded border border-[#C4C4C4] py-[10px] text-[14px]">
          <DropDown.Content
            fieldValue={field.value}
            fieldOnChange={field.onChange}
            id={name}
            dropData={dropDatas?.companies}
            placeholder={placeholder}
            type="between"
          />
        </div>
      </div>
    )}
  />
)

const CrewLevelDropController = ({
  control,
  name,
  label,
  dropDatas,
  placeholder,
}: Field) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <div className="block w-full rounded border border-[#C4C4C4] py-[10px] text-[14px]">
          <DropDown.Content
            fieldValue={field.value}
            fieldOnChange={field.onChange}
            id={name}
            dropData={dropDatas?.crewLevels}
            placeholder={placeholder}
            type="between"
          />
        </div>
      </div>
    )}
  />
)

const FieldController = ({ control, name, label, placeholder }: Field) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
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

const RadioFieldController = ({ control, name, label }: Field) => {
  let value1 = ''
  let value2 = ''
  let text1 = ''
  let text2 = ''

  if (name === 'gender') {
    value1 = '남'
    value2 = '여'
    text1 = '남'
    text2 = '여'
  } else if (name === 'personal_agreement' || name === 'safety_training') {
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
const crewInfoInit = [
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력하세요.',
    defaultValue: '',
    component: FieldController,
  },
  {
    name: 'user_id',
    label: '사용자 ID',
    placeholder: '사용자 ID를 입력하세요.',
    defaultValue: '',
    component: FieldController,
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요.',
    defaultValue: '',
    component: FieldController,
  },
  {
    name: 'phone',
    label: '연락처',
    placeholder: '연락처를 입력하세요.',
    defaultValue: '',
    component: PhoneController,
  },
  {
    name: 'birth',
    label: '생년월일',
    placeholder: '날짜 선택',
    defaultValue: '',
    component: DatePickerSingleController,
  },
  {
    name: 'age',
    label: '나이',
    placeholder: '나이를 입력하세요',
    defaultValue: '',
    maxLength: 3,
    component: NumberFieldController,
  },
  {
    name: 'gender',
    label: '성별',
    defaultValue: '남',
    component: RadioFieldController,
  },
  {
    name: 'zipcode',
    label: '우편번호',
    placeholder: '우편번호를 입력하세요',
    defaultValue: '',
    maxLength: 10,
    component: NumberFieldController,
  },
  {
    name: 'roadname',
    label: '도로명 주소',
    placeholder: '도로명 주소를 입력하세요',
    defaultValue: '',
    component: FieldController,
  },
  {
    name: 'address',
    label: '상세 주소',
    placeholder: '상세 주소를 입력하세요',
    defaultValue: '',
    component: FieldController,
  },
  {
    name: 'company_id',
    label: '소속 업체',
    placeholder: '소속 업체를 입력하세요',
    defaultValue: '',
    component: CompanyDropController,
  },
  {
    name: 'safety_training',
    label: '사전 예방 안전교육 이수 여부',
    defaultValue: 'Y',
    component: RadioFieldController,
  },
  {
    name: 'safety_training_date',
    label: '마지막 이수 일자',
    placeholder: '날짜 선택',
    defaultValue: '',
    component: DatePickerSingleController,
  },
  {
    name: 'crewlevel',
    label: '승선원 구분',
    placeholder: '승선원 구분을 입력하세요',
    defaultValue: '',
    component: CrewLevelDropController,
  },
  {
    name: 'join_date',
    label: '승선원 가입일',
    placeholder: '날짜 선택',
    defaultValue: '',
    component: DatePickerSingleController,
  },
  // {
  //   name: 'group',
  //   label: '소속 그룹',
  //   placeholder: '소속 그룹을 입력하세요',
  //   defaultValue: '',
  //   component: Field,
  // },
  {
    name: 'personal_agreement',
    label: '개인정보제공 동의 여부',
    defaultValue: 'Y',
    component: RadioFieldController,
  },
  {
    name: 'personal_agreement_date',
    label: '개인정보제공 동의 일',
    placeholder: '날짜 선택',
    defaultValue: '',
    component: DatePickerSingleController,
  },
]

const CrewInfoForm = ({
  control,
  dropDatas,
}: {
  control: Control<any>
  dropDatas?: { crewLevels?: []; companies?: [] }
}) => {
  return (
    <div className="mt-[10px] grid gap-[16px] md:mx-[10px] md:grid-cols-3 md:gap-[32px]">
      {crewInfoInit.map((fields, index) => {
        return (
          <fields.component
            dropDatas={dropDatas}
            key={index}
            control={control}
            {...fields}
          />
        )
      })}
    </div>
  )
}

const GroupDropBoxs = ({
  control,
  ships,
}: {
  control: Control<any>
  ships: any
}) => {
  if (!ships) return
  return (
    <>
      <div className="mt-[32px] font-bold">소속 그룹</div>
      <div className="mt-[15px] flex flex-col items-start gap-5 md:mx-[10px] md:flex-row md:items-center">
        {/* <div>
          <div className="text-[14px] md:text-[16px]">그룹 선택</div>
          <Controller
            name="crew_add_ship_group"
            control={control}
            render={({ field }) => {
              const dropData = [
                [
                  { value: '0', label: '유에스티1' },
                  { value: '1', label: '유에스티11' },
                ],
                [
                  { value: '2', label: '유에스티2' },
                  { value: '3', label: '유에스티22' },
                ],
              ]

              return (
                <SlideDropDown
                  id="crew_add_ship_group"
                  fieldValue={field.value}
                  fieldOnChange={field.onChange}
                  dropData={dropData}
                />
              )
            }}
          />
        </div> */}
        <div>
          <div className="text-[14px] md:text-[16px]">선박 선택</div>
          <Controller
            name="ship_id"
            control={control}
            defaultValue={ships[0]}
            render={({ field }) => {
              return (
                <SliderDropDown
                  id="ship_id"
                  fieldValue={field.value}
                  fieldOnChange={field.onChange}
                  dropData={ships}
                />
              )
            }}
          />
        </div>
      </div>
    </>
  )
}

export default function CrewAdd() {
  const router = useRouter()
  const { user } = useUser()
  // useForm에서 defaultValues를 동적으로 생성
  const defaultValues1 = crewInfoInit.reduce(
    (acc: { [key: string]: any }, field) => {
      acc[field.name] = field.defaultValue
      return acc
    },
    {},
  )

  const [crewLevels, setCrewLevels] = useState()
  const [companies, setCompanies] = useState()
  const [ships, setShips] = useState()

  useEffect(() => {
    if (!user) return
    const getCrewLevel = async () => {
      const res = await fetchCrewLevel()
      setCrewLevels(
        res?.data.data.map((item: any) => ({
          value: item.id,
          label: item.crew_level,
        })),
      )
    }
    const getCompanyList = async () => {
      const res = await fetchCompanyList()
      setCompanies(
        res?.data.data.map((item: any) => ({
          value: item.id,
          label: item.company_name,
        })),
      )
    }
    const getShipList = async () => {
      const res = await fetchShipNameList({
        group_id: user?.group_id.toString(),
      })
      setShips(
        res?.data.data.map((item: any) => ({
          value: item.ship_id,
          label: item.ship_name,
        })),
      )
    }
    getCrewLevel()
    getCompanyList()
    getShipList()
  }, [user])

  const { control, handleSubmit } = useForm({
    defaultValues: { ...defaultValues1 },
  })

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      age: parseInt(data.age, 10), // 나이를 숫자로 변환
      zipcode: parseInt(data.zipcode, 10), // 우편번호를 숫자로 변환
      birth: moment(data.birth).format('YYYY-MM-DD'), // 날짜를 문자열로 포맷
      join_date: moment(data.join_date).format('YYYY-MM-DD'), // 날짜를 문자열로 포맷
      company_id: data.company_id.value, // company_id에서 value 추출
      crewlevel: data.crewlevel.value, // crewlevel에서 value 추출
      ship_id: data.ship_id.value, // ship_id에서 value 추출
      personal_agreement: data.personal_agreement === 'Y', // 'Y'이면 true, 아니면 false
      safety_training: data.safety_training === 'Y', // 'Y'이면 true, 아니면 false
    }
    // personal_agreement가 false이면 관련 날짜 제거
    if (!formattedData.personal_agreement) {
      delete formattedData.personal_agreement_date
    } else {
      formattedData.personal_agreement_date = moment(
        data.personal_agreement_date,
      ).format('YYYY-MM-DD')
    }

    // safety_training가 false이면 관련 날짜 제거
    if (!formattedData.safety_training) {
      delete formattedData.safety_training_date
    } else {
      formattedData.safety_training_date = moment(
        data.safety_training_date,
      ).format('YYYY-MM-DD')
    }

    const res = await postUser(formattedData)
    if (res?.status === 200) {
      alert('유저 생성 성공!')
      router.push(PATHS.CREW_INFO())
    }

    console.log('!!!!!!!!!!!!!!!!', formattedData)
  }
  return (
    <div className="md:mx-[40px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[22px] font-bold">승선원 추가</div>
        <div className="mt-[20px] font-bold">승선원 내역</div>
        <CrewInfoForm control={control} dropDatas={{ crewLevels, companies }} />
        <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
        <GroupDropBoxs control={control} ships={ships} />
        <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
          <Link href={PATHS.CREW_INFO()}>
            <button className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]">
              취소
            </button>
          </Link>
          <button className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]">
            추가
          </button>
        </div>
      </form>
    </div>
  )
}
