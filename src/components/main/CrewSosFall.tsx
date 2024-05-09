'use client'

import { useEffect, useState } from 'react'
import { GenericTable } from '../common/GenericTable'
import { fetchUserEmergencyList } from '@/services/api/user'
import { useRouter } from 'next/navigation'
import { PATHS } from '@/constants/paths'
import { useUser } from '@/hooks/useUser'
import { UserEmergencyData } from '@/types/responseData'
import { SosStatus } from '../common/SosStatus'
import { getRowNum } from '@/utils/getRowNum'

export const CrewSosFall = ({
  title,
  type,
  groupId,
  shipId,
}: {
  title: string
  type: 'SOS' | '낙상'
  groupId?: string
  shipId?: string
}) => {
  const { user } = useUser()

  const router = useRouter()

  const [sosList, setSosList] = useState([])
  const [numOfItems, setNumOfItems] = useState(0)

  useEffect(() => {
    if (!groupId || !shipId) return

    const fetcEmergencyListData = async () => {
      const res = await fetchUserEmergencyList({
        group_id: groupId,
        ship_id: shipId,
        item_count: '5',
        page_num: '1',
        search_code: type,
        noFilter: !!shipId,
      })
      if (res?.status === 200) {
        setSosList(res.data.data)
        setNumOfItems(res.data.num_of_items)
      }
    }

    fetcEmergencyListData()
  }, [groupId, shipId, user, type])

  return (
    <div className="max-w-[636px]">
      <div className="text-[20px] font-bold">{title}</div>

      <GenericTable
        mobileContents={(item: UserEmergencyData, idx) => {
          const number = getRowNum(numOfItems, 1, idx)
          return (
            <>
              <div>
                No. {number} &nbsp; {item.name}
              </div>
              <div>
                응급코드 : {item.emergency_code} 기록일시 : {item.sos_date}
              </div>
              <SosStatus status={item.emergency_status_code} />
            </>
          )
        }}
        columns={[
          {
            field: 'no',
            title: 'No',
            width: '1fr',
            render: (_, idx) => {
              const number = getRowNum(numOfItems, 1, idx)

              return <div>{number > 0 && number}</div>
            },
          },
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
