'use client'

import { useEffect, useState } from 'react'
import { GenericTable } from '../common/GenericTable'
import { UserEmergencyData, fetchUserEmergencyList } from '@/services/api/user'
import { useRouter } from 'next/navigation'
import { PATHS } from '@/constants/paths'

export const CrewSos = () => {
  const router = useRouter()

  const [sosList, setSosList] = useState([])
  const [sosId, setSosId] = useState<number | null>()

  const pageSize = '5'

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

      <GenericTable
        mobileContents={(item: UserEmergencyData, idx) => (
          <>
            <div>
              No. {idx + 1} &nbsp; {item.name}
            </div>
            <div>
              응급코드 : {item.emergency_code} 기록일시 : {item.sos_date}
            </div>
            <div className="inline-flex items-center gap-[4px] rounded bg-[#FFF0F0] px-[20px] py-[2px]">
              <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]" />
              {item.emergency_status_code}
            </div>
          </>
        )}
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
                  <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]" />
                  {code}
                </div>
              )
            },
          },
        ]}
        data={sosList}
        onRowClick={(item: UserEmergencyData) => {
          router.push(PATHS.SOS_DETAIL())
        }}
      />
    </div>
  )
}
