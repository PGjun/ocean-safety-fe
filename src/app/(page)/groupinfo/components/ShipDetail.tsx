import { useEffect, useState } from 'react'
import { fetchShipInfo } from '@/services/api/user'
import Image from 'next/image'

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

  useEffect(() => {
    const fetchShipDetail = async () => {
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
      }
    }
    fetchShipDetail()
  }, [shipId])

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
      <div className="mt-[50px] text-[18px] font-bold">선박 도면</div>

      <div className="mt-[10px]">
        <Image
          src="/temp-ship.png"
          alt="tempship"
          width={1100}
          height={200}
          style={{ objectFit: 'fill' }}
        />
      </div>
    </>
  )
}
