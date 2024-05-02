import { CSSProperties, useEffect, useState } from 'react'
import { fetchRestrictAreas, fetchShipInfo } from '@/services/api/user'
import Image from 'next/image'
import RestrictRects from '@/components/common/RestrictAreaRects'
import { useBeacons } from '@/hooks/fetch/useBeacons'
import LocationDots from '@/components/common/LocationDots'

const wrapperStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
}

const shipDetails = [
  { name: 'ship_number', title: '선박번호', content: '191-' },
  { name: 'ship_name', title: '선박명', content: '한국호' },
  { name: 'nationality', title: '선적항(국적)', content: '제주(대한민국)' },
  { name: 'inter_tonnage', title: '국제총톤수', content: '28,827.00' },
  { name: 'weight_tonnage', title: '재화중량톤수', content: '38.985.00' },
  { name: 'reg_classname', title: '등록선급명', content: '등록선급명' },
  { name: 'launch_date', title: '진수일', content: '2012-11-23' },
  { name: 'shipyard', title: '조선소', content: 'Hyundai Mipo' },
  { name: 'ship_owner', title: '선박소유자', content: '해운㈜' },
  { name: 'business_name', title: '사업자명', content: '해운㈜' },
  { name: 'ship_lessee', title: '선박임차인', content: '-' },
  { name: 'rental_period', title: '임차기간', content: '-' },
]

export const ShipDetail = ({ shipId }: { shipId: number | null }) => {
  const [detail, setDetail] = useState([{ name: '', title: '', content: '' }])
  const [restricts, setRestricts] = useState([
    {
      id: 0,
      ship_id: 0,
      area_name: '',
      location_start_x: 0,
      location_start_y: 0,
      location_end_x: 0,
      location_end_y: 0,
    },
  ])
  const [shipImg, setShipImg] = useState('')

  const [loading, setLoading] = useState(true)

  const { beacons, getBeacons } = useBeacons()

  useEffect(() => {
    if (!shipId) return
    getBeacons({ ship_id: shipId })
  }, [shipId, getBeacons])

  useEffect(() => {
    const getShipInfo = async () => {
      setLoading(true)
      if (shipId === null) return

      const res = await fetchShipInfo(shipId)

      if (res?.status === 200) {
        const updatedShipDetails = shipDetails.map((item) => {
          const apiValue = res.data[item.name] // title에 해당하는 API 응답 데이터를 찾음
          return {
            ...item,
            content: apiValue ? apiValue : item.content, // API 응답에 해당 데이터가 있다면 업데이트, 없으면 기존 값 유지
          }
        })
        setDetail(updatedShipDetails)
        setShipImg(res.data.ship_drawings_url)
        setLoading(false)
      }
    }

    const getRestrictAreas = async () => {
      if (shipId === null) return
      const res = await fetchRestrictAreas({ ship_id: shipId })
      if (res?.status === 200) {
        setRestricts(res.data.data)
      }
    }
    getShipInfo()
    getRestrictAreas()
  }, [shipId])

  if (loading) return null
  return (
    <>
      <div className="md:grid md:grid-cols-3 md:gap-x-[32px] md:gap-y-[16px]">
        {detail &&
          detail.map((item, idx) => {
            return (
              <div key={idx}>
                <div className="mt-[12px] text-[12px] font-bold">
                  {item.title}
                </div>
                <div className="rounded bg-[#F8F9FA] p-[8px] text-[14px]">
                  {item.content}
                </div>
              </div>
            )
          })}
      </div>
      <div className="mt-[50px] text-[18px] font-bold">비콘 위치</div>

      <div className="mt-[5px] rounded bg-[#F3F2F8]">
        <div className="relative h-[92px] md:h-[270px] md:w-[1100px]">
          {beacons && (
            <>
              <div
                style={{
                  ...wrapperStyles,
                  zIndex: 2,
                }}
              >
                <LocationDots
                  width={1100}
                  height={270}
                  dots={beacons.map((item) => ({
                    ...item,
                    x: item.location_y,
                    y: item.location_x,
                    name: item.name,
                  }))}
                  onSelectDot={() => {}}
                />
              </div>
              <div style={wrapperStyles}>
                {shipImg && shipImg !== 'None' && (
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + '/' + shipImg}
                    alt="선박 도면 미리보기"
                    layout="fill"
                    objectFit="fill"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-[50px] text-[18px] font-bold">제한구역</div>
      <div className="mt-[5px] rounded bg-[#F3F2F8]">
        <div className="relative h-[92px] md:h-[270px] md:w-[1100px]">
          {restricts && (
            <>
              <div
                style={{
                  ...wrapperStyles,
                  zIndex: 2,
                }}
              >
                <RestrictRects
                  width={1100}
                  height={270}
                  rects={restricts.map((item) => ({
                    ...item,
                    x1: item.location_start_x,
                    x2: item.location_end_x,
                    y1: item.location_start_y,
                    y2: item.location_end_y,
                  }))}
                />
              </div>
              <div style={wrapperStyles}>
                {shipImg && shipImg !== 'None' && (
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + '/' + shipImg}
                    alt="선박 도면 미리보기"
                    layout="fill"
                    objectFit="fill"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
