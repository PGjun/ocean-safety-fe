import { ShipForm } from '@/app/(page)/groupinfo/shipedit/page'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useShipInfo } from '../fetch/useShipInfo'
import { useEffect, useState } from 'react'
import { useBeacons } from '../fetch/useBeacons'
import { useRestrictAreas } from '../fetch/useRestrictAreas'
import moment from 'moment'
import { editShip, fetchWatches } from '@/services/api/user'

export const shipForm: ShipForm = {
  ship_number: '',
  ship_name: '',
  ship_real_width: '',
  ship_real_height: '',
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
    defaultValues: shipForm,
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
  const [wearables, setWearables] = useState()

  //* API 호출
  useEffect(() => {
    if (!shipId) return
    getShipInfo({ ship_id: shipId.toString() })
    getBeacons({ ship_id: shipId })
    getRestrictAreas({ ship_id: shipId })
  }, [getShipInfo, shipId])

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

    Object.keys(shipForm).forEach((key) => {
      setValue(key, (shipInfo as any)[key] || shipForm[key])
    })
  }, [shipInfo, setValue])

  //* 워치 정보 업데이트
  const handleWearables = (data: any) => {
    const newDate = data.map(
      ({ device_id, phone_number, model_name }: any) => ({
        device_id: device_id,
        phone_number: phone_number,
        model_name: model_name,
      }),
    )

    setWearables(newDate)
  }

  //* 워치 정보 초기화
  useEffect(() => {
    if (!shipId) return
    const getWatches = async () => {
      const res = await fetchWatches({ ship_id: shipId })
      handleWearables(res?.data.data)
    }
    getWatches()
  }, [shipId])

  //! 선박 수정
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

    //* 웨어러블 검사
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

    //* 데이터 조합
    const newData = {
      ...data,
      beacons: JSON.stringify(dots),
      restrict_areas: JSON.stringify(rects),
      watches: JSON.stringify(validWearables),
    }

    // 필드 이름 리스트
    const integerFields = [
      'ship_number',
      'inter_tonnage',
      'weight_tonnage',
      'ship_real_width',
      'ship_real_height ',
    ]
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
    wearableProps: {
      wearables,
      handleWearables,
    },
  }
}
