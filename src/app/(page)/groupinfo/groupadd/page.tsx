'use client'

import { CreateDataTable } from '@/components/common/CreateDataTable'
import { PATHS } from '@/constants/paths'
import { postAddShip } from '@/services/api/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ShipDrawing } from './components/ShipDrawing'
import { ShipAddForm, groupFields } from './components/ShipAddForm'
import { useUser } from '@/hooks/useUser'
import moment from 'moment'

export default function GroupAddPage() {
  // useForm에서 defaultValues(초기값)를 동적으로 생성
  const defaultValues = groupFields.reduce(
    (acc: { [key: string]: any }, field) => {
      acc[field.name] = field.defaultValue
      return acc
    },
    {},
  )

  const router = useRouter()
  const { user } = useUser()
  const { control, handleSubmit } = useForm({ defaultValues })

  const [file, setFile] = useState<File | null>(null)
  const [dots, setDots] = useState<
    {
      location_x: number
      location_y: number
      beacon_name: string
      mac_address: string
    }[]
  >([])
  const [rects, setRects] = useState<
    {
      location_start_x: number
      location_start_y: number
      location_end_x: number
      location_end_y: number
      area_name: string
    }[]
  >([])
  const [wearables, setWearables] = useState([])

  const handleWearables = (data: any) => {
    data.map((item: any) => ({
      device_id: item.device_id,
      phone_number: item.phone_number,
      model_name: item.model_name,
    }))

    setWearables(data)
  }

  const onSubmit = async (data: any) => {
    function validateAndFilterWearables(wearables: any) {
      const requiredFields = ['device_id', 'phone_number', 'model_name']

      // 필수 필드 중 하나라도 부분적으로 입력된 경우 검사
      const hasIncompleteEntry = wearables.some((wearable: any) => {
        if (Object.keys(wearable).length === 0) {
          return false // 완전히 빈 객체는 건너뜀
        }

        const hasAnyField = requiredFields.some((field) => wearable[field])
        const hasAllFields = requiredFields.every((field) => wearable[field])

        return hasAnyField && !hasAllFields // 하나라도 있고 전부 채워지지 않은 경우 true
      })

      if (hasIncompleteEntry) {
        return false // 부분적으로 입력된 웨어러블이 있으면 빈 배열 반환
      }

      // 모든 필드가 채워진 웨어러블만 필터링
      return wearables.filter((wearable: any) => {
        return requiredFields.every((field) => wearable[field]) // 모든 필드가 채워져 있어야 함
      })
    }

    const validWearables = validateAndFilterWearables(wearables)

    if (!validWearables) {
      alert('입력중인 웨어러블 정보를 전부 입력해주세요.')
      return
    }

    // dots 배열 검사
    const invalidDots = dots.some((dot) => !dot.beacon_name || !dot.mac_address)
    if (invalidDots) {
      alert(
        '모든 비콘에 대한 정보가 필요합니다. 비콘 이름과 MAC 주소를 확인하세요.',
      )
      return
    }

    // rects 배열 검사
    const invalidRects = rects.some((rect) => !rect.area_name)
    if (invalidRects) {
      alert(
        '모든 제한구역에 대한 정보가 필요합니다. 제한구역 이름을 확인하세요.',
      )
      return
    }

    if (!user) return
    const newData = {
      ...data,
      beacons: JSON.stringify(dots),
      restrict_areas: JSON.stringify(rects),
      watches: JSON.stringify(validWearables),
      group_id: user.id,
    }

    // 필드 이름 리스트
    const integerFields = ['ship_number', 'inter_tonnage', 'weight_tonnage']
    const dateFields = ['launch_date', 'rental_period']

    // 필드 타입 업데이트
    const updateData = Object.entries(newData).reduce(
      (acc: any, [key, value]: any) => {
        // 숫자 필드 처리
        if (integerFields.includes(key)) {
          acc[key] = parseInt(value)
        }
        // 날짜 필드 처리
        else if (dateFields.includes(key)) {
          acc[key] = moment(value).format('YYYY-MM-DD')
        }
        // 기타 필드 처리
        else {
          acc[key] = value
        }
        return acc
      },
      {},
    )

    // 파일이 존재하면 파일 필드 추가
    if (file) {
      updateData.ship_drawing_img = file
      updateData.ship_drawing_img_name = file.name
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
      <ShipAddForm control={control} />
      <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
      <ShipDrawing
        file={file}
        setFile={setFile}
        dots={dots}
        rects={rects}
        setDots={setDots}
        setRects={setRects}
      />
      <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
      <CreateDataTable
        columns={[
          { field: 'no', title: 'No', width: '50px' },
          { field: 'device_id', title: '기기명 (디바이스 ID)', width: '1fr' },
          { field: 'model_name', title: '기종', width: '1fr' },
          {
            field: 'phone_number',
            title: '폰번호',
            width: '1fr',
            render: (value, handleInputChange, idx, col) => {
              return (
                <input
                  value={formatPhoneNumber(value) || ''}
                  placeholder={col.title}
                  onChange={(e) => {
                    // 입력값이 11자리를 초과하지 않도록 조정
                    const formatted = formatPhoneNumber(e.target.value)
                    if (formatted.replace(/[^0-9]/g, '').length <= 11) {
                      handleInputChange(formatted, idx, col.field)
                    }
                  }}
                  className="w-full rounded border p-[4px]"
                />
              )
            },
          },
        ]}
        handleData={handleWearables}
      />
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
