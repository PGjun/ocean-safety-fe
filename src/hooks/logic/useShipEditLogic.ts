import { ShipForm } from '@/app/(page)/groupinfo/shipedit/page'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useShipInfo } from '../fetch/useShipInfo'
import { useEffect, useState } from 'react'
import { useBeacons } from '../fetch/useBeacons'
import { useRestrictAreas } from '../fetch/useRestrictAreas'
import moment from 'moment'
import { editShip } from '@/services/api/user'

const fieldValues: ShipForm = {
  ship_number: '',
  ship_name: '',
  nationality: '',
  inter_tonnage: '',
  weight_tonnage: '',
  reg_classname: '',
  launch_date: '',
  shipyard: '',
  ship_owner: '',
  business_name: '',
  ship_lessee: '',
  rental_period: '',
}

export const useShipEditLogic = ({ shipId }: { shipId: number }) => {
  const router = useRouter()
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: fieldValues,
  })
  const { shipInfo, getShipInfo } = useShipInfo()
  const { beacons, getBeacons } = useBeacons()
  const { restricts, getRestrictAreas } = useRestrictAreas()
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

  //* API 호출
  useEffect(() => {
    if (!shipId) return
    getShipInfo({ ship_id: shipId.toString() })
    getBeacons({ ship_id: shipId })
    getRestrictAreas({ ship_id: shipId })
  }, [getShipInfo, getBeacons, getRestrictAreas, shipId])

  //* 비콘, 제한구역 초기화
  useEffect(() => {
    if (!beacons || !restricts) return
    setDots(
      (beacons as any).map(({ id, ship_id, name, ...rest }: any) => ({
        ...rest,
        beacon_name: name,
      })),
    )
    setRects(
      (restricts as any).map(({ id, ship_id, ...rest }: any) => ({
        ...rest,
      })),
    )
  }, [beacons, restricts])

  //* 선박 정보 초기화
  useEffect(() => {
    if (!shipInfo) return

    Object.keys(fieldValues).forEach((key) => {
      setValue(key, (shipInfo as any)[key] || fieldValues[key])
    })
  }, [shipInfo, setValue])

  //* 선박 수정
  const onSubmit = async (data: any) => {
    //* dots 배열 검사
    const invalidDots = dots.some((dot) => !dot.beacon_name || !dot.mac_address)
    if (invalidDots) {
      alert(
        '모든 비콘에 대한 정보가 필요합니다. 비콘 이름과 MAC 주소를 확인하세요.',
      )
      return
    }

    //* rects 배열 검사
    const invalidRects = rects.some((rect) => !rect.area_name)
    if (invalidRects) {
      alert(
        '모든 제한구역에 대한 정보가 필요합니다. 제한구역 이름을 확인하세요.',
      )
      return
    }

    //* 데이터 조합
    const newData = {
      ...data,
      beacons: JSON.stringify(dots),
      restrict_areas: JSON.stringify(rects),
      // watches: JSON.stringify(validWearables),
    }

    // 필드 이름 리스트
    const integerFields = ['ship_number', 'inter_tonnage', 'weight_tonnage']
    const dateFields = ['launch_date', 'rental_period']

    //* 필드 타입 업데이트
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

    //* 파일이 존재하면 파일 필드 추가
    if (file) {
      updateData.ship_drawing_img = file
      updateData.ship_drawing_img_name = file.name
      updateData.delete_ship_drawing = true
    } else {
      updateData.delete_ship_drawing = false
    }

    const res = await editShip({ data: updateData, shipId: shipId })
    if (res?.status) {
      alert('수정 완료')
      router.back()
    }
  }

  return {
    onSubmit,
    handleSubmit,
    control,
    router,
    shipDrawingProps: {
      file,
      setFile,
      dots,
      setDots,
      rects,
      setRects,
      shipDrawingsUrl: shipInfo?.ship_drawings_url,
    },
  }
}
