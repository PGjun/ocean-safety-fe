'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Fragment, useEffect, useState } from 'react'
import { GenericTable } from './GenericTable'
import { UserEmergencyList, fetchUserEmergencyList } from '@/services/api/user'

const COLTITLES = [
  { name: 'No' },
  {
    name: '이름',
  },
  {
    name: '응급코드',
  },
  {
    name: '기록 일시',
  },
  {
    name: '처리상황',
  },
]

const SosRows = [
  { a: '1', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
  { a: '1', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
  { a: '1', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
  { a: '1', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
  { a: '1', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
]

export const CrewSos = () => {
  const isMobile = useMediaQuery('768')

  const [sosList, setSosList] = useState([])
  const [sosId, setSosId] = useState<number | null>()

  const pageSize = '10'

  useEffect(() => {
    const fetcEmergencyListData = async () => {
      const res = await fetchUserEmergencyList({
        group_id: '1',
        item_count: pageSize,
        page_num: '1',
      })
      if (res?.status === 200) {
        setSosList(res.data.data)
      }
    }

    fetcEmergencyListData()
  }, [])

  return (
    <div className="max-w-[636px]">
      <div className="text-[20px] font-bold">SOS 내역</div>
      {isMobile ? (
        <div className="border-t border-[#c4c4c4]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="border-b p-[16px] text-[12px]">
              <div>No. 1 : 이름</div>
              <div>응급코드 : SOS 기록일시 : : 2024-03-01 16:00:00</div>
              <div className="inline-flex items-center gap-[4px] rounded bg-[#FFF0F0] px-[20px] py-[2px]">
                <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]"></div>
                이상보고
              </div>
            </div>
          ))}
        </div>
      ) : (
        <GenericTable
          columns={[
            { field: 'id', title: 'No', width: '1fr' },
            { field: 'name', title: '이름', width: '1fr' },
            { field: 'emergency_code', title: '응답코드', width: '1fr' },
            { field: 'sos_date', title: '기록 일시', width: '2fr' },
            {
              field: 'emergency_status_code',
              title: '처리현황',
              width: '1fr',
              render: (code) => {
                return (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]"></div>
                    {code}
                  </div>
                )
              },
            },
          ]}
          data={sosList}
          onRowClick={(item: UserEmergencyList) => {
            setSosId(item.id)
          }}
        />
      )}
    </div>
  )
}
