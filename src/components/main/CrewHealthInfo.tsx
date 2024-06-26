'use client'

import { fetchUserHealthList } from '@/services/api/user'
import { useEffect, useState } from 'react'
import { GenericTable } from '../common/GenericTable'
import { UserHealthData } from '@/types/responseData'

export const CrewHealthInfo = ({
  groupId,
  shipId,
}: {
  groupId?: string
  shipId?: string
}) => {
  const [healthList, setHealthList] = useState([])

  useEffect(() => {
    if (!groupId || !shipId) return
    const fetchHealthList = async () => {
      const res = await fetchUserHealthList({
        group_id: groupId,
        ship_id: shipId,
        page_num: '1',
        item_count: '5',
        noFilter: !!shipId,
      })

      if (res?.status === 200) {
        setHealthList(res.data.data)
      }
    }

    fetchHealthList()
  }, [groupId, shipId])
  return (
    <div>
      <div className="text-[20px] font-bold">승선원 건강정보</div>

      <GenericTable
        mobileContents={(item: UserHealthData) => (
          <>
            <div>
              No. {item.id} &nbsp; {item.name}
            </div>
            <div>
              심박수 : {item.health_rate} 피부온도 : {item.temperature}{' '}
              산소포화도 : {item.oxygen_saturation}
            </div>
            <div>기록일시 : {item.health_date}</div>
          </>
        )}
        columns={[
          { field: 'id', title: 'No', width: '2fr' },
          { field: 'name', title: '이름', width: '2fr' },
          { field: 'health_rate', title: '심박수', width: '2fr' },
          { field: 'temperature', title: '피부온도', width: '2fr' },
          { field: 'oxygen_saturation', title: '산소포화도', width: '3fr' },
          { field: 'health_date', title: '기록 일시', width: '5fr' },
        ]}
        hover={false}
        data={healthList}
        onRowClick={(item: UserHealthData) => {
          // setShipId(item.id)
        }}
      />
    </div>
  )
}
