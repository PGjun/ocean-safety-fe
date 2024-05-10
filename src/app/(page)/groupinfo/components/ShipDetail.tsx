import { useEffect, useState } from 'react'
import { fetchRestrictAreas, fetchShipInfo } from '@/services/api/user'
import { useBeacons } from '@/hooks/fetch/useBeacons'
import { ShipDrawing } from '../../../../components/common/ShipDrawing'

const shipDetails = [
  { name: 'ship_number', title: '선박번호', content: '' },
  { name: 'ship_name', title: '선박명', content: '' },
  { name: 'ship_real_width', title: '선박실제너비', content: '' },
  { name: 'ship_real_height', title: '선박실제높이', content: '' },
  { name: 'nationality', title: '선적항(국적)', content: '' },
  { name: 'inter_tonnage', title: '국제총톤수', content: '' },
  { name: 'weight_tonnage', title: '재화중량톤수', content: '' },
  { name: 'reg_classname', title: '등록선급명', content: '' },
  { name: 'launch_date', title: '진수일', content: '' },
  { name: 'shipyard', title: '조선소', content: '' },
  { name: 'ship_owner', title: '선박소유자', content: '' },
  { name: 'business_name', title: '사업자명', content: '' },
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
          detail.map(({ title, content }, idx) => {
            return (
              <div key={idx}>
                <div className="mt-[12px] text-[12px] font-bold">{title}</div>
                <div className="rounded bg-[#F8F9FA] p-[8px] text-[14px]">
                  {content}
                </div>
              </div>
            )
          })}
      </div>
      {beacons && restricts && (
        <ShipDrawing
          dots={beacons.map(({ name, ...rest }) => ({
            ...rest,
            beacon_name: name,
            location_x: rest.location_x,
            location_y: rest.location_y,
          }))}
          rects={restricts}
          shipDrawingsUrl={shipImg}
          readOnly
        />
      )}
    </>
  )
}
