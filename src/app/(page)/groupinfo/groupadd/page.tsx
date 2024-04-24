'use client'

import CanvasComponent from '@/app/test/Canvas2'
import CanvasRect from '@/app/test/CanvasRect'
import { CreateDataTable } from '@/components/common/CreateDataTable'
import { DatePickerSingleController } from '@/components/common/DatePicker'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CommonIcon } from '@/icons/common'
import { addShipParams, postAddShip } from '@/services/api/user'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
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

// 필드 설정을 포함한 배열 정의
const groupFields = [
  {
    name: 'ship_number',
    label: '선박번호',
    placeholder: '선박번호를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship_name',
    label: '선박명',
    placeholder: '선박명을 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'nationality',
    label: '선적항(국적)',
    placeholder: '선적항(국적)을 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'inter_tonnage',
    label: '국제총톤수',
    placeholder: '국제총톤수를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'weight_tonnage',
    label: '재화중량톤수',
    placeholder: '재화중량톤수를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'reg_classname',
    label: '등록선급명',
    placeholder: '등록선급명을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'launch_date',
    label: '진수일',
    placeholder: '진수일을 입력하세요',
    defaultValue: '',
    component: DatePickerSingleController,
  },
  {
    name: 'shipyard',
    label: '조선소',
    placeholder: '조선소를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship_owner',
    label: '선박소유자',
    placeholder: '선박소유자를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'business_name',
    label: '사업자명',
    placeholder: '사업자명을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship_lessee',
    label: '선박임차인',
    placeholder: '선박임차인을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'rental_period',
    label: '임차기간',
    placeholder: '임차기간을 입력하세요',
    defaultValue: '',
    component: DatePickerSingleController,
  },
]

const GroupInfoForm = ({ watch, control }: any) => {
  return (
    <div className="mt-[10px] grid gap-[16px] md:grid-cols-3 md:gap-[32px]">
      <>
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
      </>
    </div>
  )
}

const formatMacAddress = (value: string) => {
  if (!value) return value

  // 알파벳과 숫자만 허용
  const mac = value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase()

  // 각 두 자리마다 콜론(:) 추가
  const formatted = mac.split('').reduce((acc, char, idx) => {
    return acc + char + (idx % 2 === 1 && idx !== mac.length - 1 ? ':' : '')
  }, '')

  // 17자리를 초과하는 입력 제거 (XX:XX:XX:XX:XX:XX - 콜론 포함 17자)
  return formatted.length <= 17 ? formatted : formatted.slice(0, 17)
}

const DotInputComponent = ({ dots, setDots }: any) => {
  // 레이블 변경 핸들러
  const handleNameChange = (index: number, name: string) => {
    const newDots = [...dots]
    newDots[index] = { ...newDots[index], name }
    setDots(newDots)
  }
  const handleMcAdressChange = (index: number, mac_address: string) => {
    const formattedMac = formatMacAddress(mac_address)
    const newDots = [...dots]
    newDots[index] = { ...newDots[index], mac_address: formattedMac }
    setDots(newDots)
  }
  // 도트 삭제 핸들러
  const handleRemoveDot = (index: number) => {
    const newDots = dots.filter((_: any, i: any) => i !== index)
    setDots(newDots)
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {dots.map((dot: any, index: any) => (
        <div
          key={index}
          className="flex w-full items-center gap-2 rounded border border-[#C4C4C4]"
        >
          <div className="h-full w-[60px] place-content-center bg-[#F3F5FF] text-center text-[20px] font-bold leading-[16px] text-[#2262C6] md:w-[50px]">
            {index + 1}
          </div>
          <input
            className="min-w-0 flex-grow border-r outline-none"
            type="text"
            placeholder="비콘 이름"
            value={dot.name || ''}
            onChange={(e) => handleNameChange(index, e.target.value)}
          />
          <input
            className="min-w-0 flex-grow outline-none"
            type="text"
            placeholder="Mac Address"
            value={dot.mac_address || ''}
            onChange={(e) => handleMcAdressChange(index, e.target.value)}
          />
          <div className="px-[18px] py-[15px] text-[20px] leading-[16px]">
            <button type="button" onClick={() => handleRemoveDot(index)}>
              <CommonIcon.Xmark />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const ShipDrawing = ({
  file,
  setFile,
}: {
  file: File | null
  setFile: (file: File) => void
}) => {
  const isMobile = useMediaQuery('768')

  // const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [dots, setDots] = useState<
    {
      x: number
      y: number
    }[]
  >([])

  // const [rectangles, setRectangles] = useState<
  //   { x1: number; y1: number; x2: number; y2: number }[]
  // >([])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    console.log(file)
    if (file) {
      // 파일이 선택되었을 때만 타입 검사 진행
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        setFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        alert('PNG, JPG, JPEG 파일만 업로드 가능합니다.')
      }
    }
  }

  const onDotsChange = (dots: any) => {
    setDots(dots)
  }

  useEffect(() => {
    // 결과 객체를 생성하는 함수
    function formatData(dots: any) {
      // 결과 객체 초기화
      const result: any = {
        ship_id: 0, // 이 예제에서 ship_id는 0으로 설정
        mac_address_list: [],
        location_x_list: [],
        location_y_list: [],
        beacon_name_list: [],
      }

      // 배열의 각 요소에 대해 필요한 속성 추출
      dots.forEach((dot: any) => {
        result.mac_address_list.push(dot.mac_address)
        result.location_x_list.push(dot.x)
        result.location_y_list.push(dot.y)
        result.beacon_name_list.push(dot.name)
      })

      return result
    }

    const formattedData = formatData(dots)
    console.log(dots)
    console.log(formattedData)
  }, [dots])

  return (
    <div>
      <div className="text-[18px] font-bold">선박 도면</div>
      <div className="mt-[10px] flex w-full justify-between rounded py-[7px] pl-[16px] pr-[6px] text-[14px] outline-dotted outline-[2px] outline-[#C4C4C4]">
        <input
          type="text"
          className="flex-1 bg-white"
          placeholder="선박 도면을 등록해 주세요."
          value={file ? file.name : ''}
          disabled
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="rounded border border-[#C4C4C4] px-[12px] py-[2px] text-[12px]"
        >
          파일 업로드
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png, image/jpeg" // PNG, JPG, JPEG만 선택 가능
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="mt-[20px] text-[12px] font-bold md:text-[14px]">
        선박 도면 미리보기
      </div>
      <div className="mt-[5px] rounded bg-[#F3F2F8] p-[20px] md:p-[40px]">
        <div className="relative h-[92px] md:h-[248px]">
          {preview && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                }}
              >
                <CanvasComponent
                  width={isMobile ? 270 : 1020}
                  height={isMobile ? 92 : 248}
                  dots={dots}
                  onDotsChange={onDotsChange}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image
                  src={preview}
                  alt="선박 도면 미리보기"
                  layout="fill"
                  objectFit="fill"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mb-[5px] mt-[10px]">선택 영역</div>
      <>{dots && <DotInputComponent dots={dots} setDots={setDots} />}</>
    </div>
  )
}

export default function GroupAddPage() {
  const router = useRouter()
  // useForm에서 defaultValues를 동적으로 생성
  const defaultValues = groupFields.reduce(
    (acc: { [key: string]: any }, field) => {
      acc[field.name] = field.defaultValue
      return acc
    },
    {},
  )

  const [file, setFile] = useState<File | null>(null)

  const { control, handleSubmit, watch } = useForm({ defaultValues })

  const onSubmit = async (data: any) => {
    const addData = { ...data, group_id: 1 }

    // 숫자로 변환하고 싶은 필드 이름들
    const integerFields = ['ship_number', 'inter_tonnage', 'weight_tonnage']

    // 특정 필드들에 대해서만 parseInt를 적용
    const parseIntData: addShipParams = Object.entries(addData).reduce(
      (acc: any, [key, value]: any) => {
        if (integerFields.includes(key)) {
          acc[key] = parseInt(value)
        } else {
          acc[key] = value
        }
        return acc
      },
      {},
    )

    let updateData = parseIntData

    //파일이 존재하면 파일 필드 추가
    if (file) {
      updateData = {
        ...parseIntData,
        ship_drawing_img: file,
        ship_drawing_img_name: file.name,
      }
    }

    const res = await postAddShip(updateData)
    if (res?.status === 201) {
      alert('생성 완료')
      router.push(PATHS.GROUP_INFO())
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:mx-[40px]">
      <div className="text-[22px] font-bold">그룹(선박) 추가</div>
      <GroupInfoForm
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
        watch={watch}
      />
      <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
      <ShipDrawing file={file} setFile={setFile} />
      <div className="my-[20px]">
        <CreateDataTable
          columns={[
            { field: 'no', title: 'No', width: '50px' },
            { field: '1', title: '기기명 (디바이스 ID)', width: '1fr' },
            { field: '2', title: '기종', width: '1fr' },
            { field: '3', title: '등록 일시', width: '1fr' },
          ]}
        />
      </div>
      <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
        <Link href={PATHS.GROUP_INFO()}>
          <button className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]">
            취소
          </button>
        </Link>
        <button
          type="submit"
          className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]"
        >
          추가
        </button>
      </div>
    </form>
  )
}
