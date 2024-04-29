'use client'

import { useEffect, useState } from 'react'
import { GenericTable } from './GenericTable'
import { fetchUserOwnEmergencyList } from '@/services/api/user'
import { useRouter } from 'next/navigation'
import { PATHS } from '@/constants/paths'
import { useUser } from '@/hooks/useUser'
import { UserEmergencyData } from '@/types/responseData'
import { SosStatus } from './SosStatus'

export const UserOwnEmergencyList = ({ userId }: { userId: number | null }) => {
  const { user } = useUser()

  const router = useRouter()

  const [sosList, setSosList] = useState([])

  useEffect(() => {
    if (!user || !userId) return
    const fetchOwnEmergencyList = async () => {
      const res = await fetchUserOwnEmergencyList({
        user_index: userId,
        item_count: '5',
        page_num: '1',
      })
      if (res?.status === 200) {
        setSosList(res.data.data)
      }
    }

    fetchOwnEmergencyList()
  }, [user, userId])

  return (
    <div className="mt-[20px]">
      <GenericTable
        mobileContents={(item: UserEmergencyData, idx) => (
          <>
            <div>
              No. {item.id} &nbsp; {item.name}
            </div>
            <div>
              응급코드 : {item.emergency_code} 기록일시 : {item.sos_date}
            </div>
            <SosStatus status={item.emergency_status_code} />
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
            render: (status) => {
              return <SosStatus status={status} />
            },
          },
        ]}
        data={sosList}
        onRowClick={(item: UserEmergencyData) => {
          router.push(PATHS.SOS_DETAIL({ sos_id: item.id.toString() }))
        }}
      />
    </div>
  )
}
