'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { UserHealth, fetchUserHealthList } from '@/services/api/user'
import { Fragment, useEffect, useState } from 'react'

const COLTITLES = [
  'No',
  '이름',
  '아이디',
  '심박수',
  '혈압',
  '체온',
  '산소포화도',
  '기록 일시',
]

const HealthRows = [
  {
    a: '1',
    b: '이름',
    c: '81',
    d: '120 / 80',
    e: '36.8',
    f: '0',
    g: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: '81',
    d: '120 / 80',
    e: '36.8',
    f: '0',
    g: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: '81',
    d: '120 / 80',
    e: '36.8',
    f: '0',
    g: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: '81',
    d: '120 / 80',
    e: '36.8',
    f: '0',
    g: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: '81',
    d: '120 / 80',
    e: '36.8',
    f: '0',
    g: '2024-03-01 16:00:00',
  },
]

export const CrewHealthInfo = () => {
  const isMobile = useMediaQuery('768')

  const [healthList, setHealthList] = useState([])
  const [shipId, setShipId] = useState<number | null>(null)

  useEffect(() => {
    const fetchHealthList = async () => {
      const res = await fetchUserHealthList(2)
      if (res?.status === 200) {
        setHealthList(res.data)
        console.log(res.data)
      }
    }
    fetchHealthList()
  }, [])
  return (
    <div>
      <div className="text-[20px] font-bold">승선원 건강정보</div>

      {isMobile ? (
        <div className="border-t border-[#c4c4c4]">
          {healthList &&
            healthList
              .slice(-20)
              .reverse()
              .map((item: UserHealth, idx) => (
                <div key={idx} className="border-b p-[16px] text-[12px]">
                  <div>
                    No. {idx + 1} 이름 : {item.name}
                  </div>
                  <div>
                    심박수 : {item.health_rate} 혈압 : {item.blood_pressure}{' '}
                    체온 : {item.temperature} 산소포화도 :{' '}
                    {item.oxygen_saturation}
                  </div>
                  <div>기록일시 : {item.health_date}</div>
                </div>
              ))}
        </div>
      ) : (
        <table className="mt-[10px] w-full table-fixed border-collapse text-center">
          <thead>
            <tr>
              {COLTITLES.map((item, idx) => (
                <th
                  key={idx}
                  className="border-y border-[#c4c4c4] py-[10px] text-[14px] font-bold"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {healthList &&
              healthList
                .slice(-20)
                .reverse()
                .map((item: UserHealth, idx) => (
                  <tr
                    key={idx}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => {
                      return setShipId(item.id)
                    }}
                  >
                    <td className="border-b py-[16px]">{idx + 1}</td>
                    <td className="border-b py-[16px]">{item.name}</td>
                    <td className="border-b py-[16px]">{item.user_id ?? ''}</td>
                    <td className="border-b py-[16px]">
                      {item.health_rate ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.blood_pressure ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.temperature ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.oxygen_saturation ?? ''}
                    </td>
                    <td className="overflow-hidden whitespace-nowrap border-b py-[16px]">
                      {item.health_date ?? ''}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
