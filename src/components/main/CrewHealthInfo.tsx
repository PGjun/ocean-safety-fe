'use client'

import { UserHealth, fetchUserHealthList } from '@/services/api/user'
import { useEffect, useState } from 'react'
import { GenericTable } from '../common/GenericTable'
import { useUser } from '@/hooks/useUser'

export const CrewHealthInfo = () => {
  const { user } = useUser()

  const [healthList, setHealthList] = useState([])
  const [shipId, setShipId] = useState<number | null>(null)

  useEffect(() => {
    if (!user) return
    const fetchHealthList = async () => {
      const res = await fetchUserHealthList({
        group_id: user?.group_id.toString(),
        ship_id: user?.ship_id.toString(),
        user_id: user?.id.toString(),
        page_num: '1',
        item_count: '5',
      })
      if (res?.status === 200) {
        setHealthList(res.data.data)
      }
    }
    fetchHealthList()
  }, [user])
  return (
    <div>
      <div className="text-[20px] font-bold">승선원 건강정보</div>

      <GenericTable
        mobileContents={(item: UserHealth, idx) => (
          <>
            <div>
              No. {item.id} &nbsp; {item.name}
            </div>
            <div>
              심박수 : {item.health_rate} 혈압 : {item.blood_pressure} 체온 :{' '}
              {item.temperature} 산소포화도 : {item.oxygen_saturation}
            </div>
            <div>기록일시 : {item.health_date}</div>
          </>
        )}
        columns={[
          { field: 'id', title: 'No', width: '2fr' },
          { field: 'name', title: '이름', width: '2fr' },
          { field: 'health_rate', title: '심박수', width: '2fr' },
          { field: 'blood_pressure', title: '혈압', width: '2fr' },
          { field: 'temperature', title: '체온', width: '2fr' },
          { field: 'oxygen_saturation', title: '산소포화도', width: '3fr' },
          { field: 'health_date', title: '기록 일시', width: '5fr' },
        ]}
        hover={false}
        data={healthList}
        onRowClick={(item: UserHealth) => {
          setShipId(item.id)
        }}
      />
    </div>
  )
}

// <div className="mt-[10px] w-full">
// <div className="grid grid-cols-[1fr_2fr_repeat(3,2fr)_3fr_4fr] border-y border-[#c4c4c4] px-[20px] text-center">
//   {[
//     'No',
//     '이름',
//     '심박수',
//     '혈압',
//     '체온',
//     '산소포화도',
//     '기록 일시',
//   ].map((item, idx) => (
//     <div key={idx} className=" py-[10px] text-[14px] font-bold">
//       {item}
//     </div>
//   ))}
// </div>
// <div>
//   {healthList &&
//     healthList
//       .slice(-5)
//       .reverse()
//       .map((item: UserHealth, idx) => (
//         <div
//           key={idx}
//           className="grid cursor-pointer grid-cols-[1fr_2fr_repeat(3,2fr)_3fr_4fr] border-b px-[20px] text-center hover:bg-slate-50"
//           onClick={() => setShipId(item.id)}
//         >
//           <div className="py-[16px]">{idx + 1}</div>
//           <div className="py-[16px]">{item.name}</div>
//           <div className="py-[16px]">{item.health_rate ?? ''}</div>
//           <div className="py-[16px]">{item.blood_pressure ?? ''}</div>
//           <div className="py-[16px]">{item.temperature ?? ''}</div>
//           <div className="py-[16px]">
//             {item.oxygen_saturation ?? ''}
//           </div>
//           <div className="py-[16px]">{item.health_date ?? ''}</div>
//         </div>
//       ))}
// </div>
// </div>
