import { Pagination } from '@/components/common/Pagination'
import { GenericTable } from '@/components/common/GenericTable'
import { useEffect, useState } from 'react'
import { fetchWatches } from '@/services/api/user'

export const WearableList = ({ shipId }: { shipId: number | null }) => {
  const [watches, setWatches] = useState([])

  useEffect(() => {
    if (!shipId) return
    const getWatches = async () => {
      const res = await fetchWatches({ ship_id: shipId })
      setWatches(res?.data.data)
    }
    getWatches()
  }, [shipId])

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
        data={watches}
        onRowClick={(item) => {}}
      />

      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={() => {
            return '/'
          }}
        />
      </div>
    </div>
  )
}
