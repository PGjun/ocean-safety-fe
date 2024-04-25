import { GenericTable } from '@/components/common/GenericTable'
import { fetchWatchInfo } from '@/services/api/user'
import { useEffect, useState } from 'react'

export const WearableInfo = ({ userId }: { userId: number | null }) => {
  const [watch, setWatch] = useState([])

  useEffect(() => {
    if (!userId) return
    const getWatch = async () => {
      const res = await fetchWatchInfo({ user_id: userId })
      setWatch(res?.data.data)
    }
    getWatch()
  }, [userId])

  return (
    <div className="mt-[20px]">
      <GenericTable
        mobileContents={(item, idx) => (
          <>
            <div>
              기기명 : {item.device_id} 기종 : {item.model_name}
            </div>
            <div>
              핸드폰 번호 : {item.phone_number} 착용자 : {item.name}
              {/* <div className="inline-block rounded-full border-2 border-[#2AB0FC] px-[6px] text-[10px] font-bold text-[#2AB0FC] md:text-[12px]">
                ON
              </div> */}
            </div>
          </>
        )}
        columns={[
          { field: 'device_id', title: '기기명 (디바이스 ID)', width: '1fr' },
          { field: 'model_name', title: '기종', width: '1fr' },
          { field: 'phone_number', title: '핸드폰 번호', width: '1fr' },
          {
            field: 'name',
            title: '착용자',
            width: '1fr',
            render: (name) => {
              return (
                <div className="flex items-center justify-center gap-2">
                  {name}
                  {/* <div className="rounded-full border-2 border-[#2AB0FC] px-[6px] text-[12px] font-bold text-[#2AB0FC]">
                    ON
                  </div> */}
                </div>
              )
            },
          },
        ]}
        data={watch}
        onRowClick={(item) => {}}
      />
    </div>
  )
}
