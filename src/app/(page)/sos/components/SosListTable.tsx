import { Pagination, SearchParams } from '@/components/common/Pagination'
import { GenericTable } from '@/components/main/GenericTable'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { UserEmergencyList, fetchUserEmergencyList } from '@/services/api/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const SosListTable = ({
  searchParams,
  sosId,
  setSosId,
  setLocation,
  query,
}: {
  searchParams: SearchParams
  sosId: number | null
  setSosId: (sos_id: number) => void
  setLocation: ({ lng, lat }: { lng: number; lat: number }) => void
  query: any
}) => {
  const isMobile = useMediaQuery('768')

  const [sosList, setSosList] = useState([])

  const pageSize = '10'
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    const fetcEmergencyListData = async () => {
      const res = await fetchUserEmergencyList({
        group_id: '1',
        item_count: pageSize,
        ...searchParams,
        ...query,
      })
      if (res?.status === 200) {
        setSosList(res.data.data)
        setTotalPage(res.data.total_page)
      }
    }

    fetcEmergencyListData()
  }, [pageSize, searchParams, query])

  return (
    <div className="flex-1">
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {sosList.map((item: UserEmergencyList, idx) => (
            <Link key={idx} href={PATHS.SOS_DETAIL}>
              <div className="border-b p-[8px] text-[12px]">
                <div>
                  No. {idx + 1} 이름 : {item.name} 아이디 : {item.user_id}
                </div>
                <div>
                  좌표X : {item.longitude} 좌표Y : {item.latitude} 응급코드 :{' '}
                  {item.emergency_code}
                </div>
                <div>
                  비상연락처 : {item.phone} 기록일시 : {item.sos_date}
                </div>
                <div className="inline-flex items-center gap-[4px] rounded bg-[#FFF0F0] px-[20px] py-[2px]">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]"></div>
                  {item.emergency_status_code}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <GenericTable
          columns={[
            { field: 'id', title: 'No', width: '40px' },
            { field: 'name', title: '이름', width: '50px' },
            { field: 'user_id', title: '아이디', width: '70px' },
            {
              field: 'longitude',
              title: 'X좌표',
              width: '80px',
              render: (x) => {
                return parseFloat(x).toFixed(2)
              },
            },
            {
              field: 'latitude',
              title: 'Y좌표',
              width: '80px',
              render: (y) => {
                return parseFloat(y).toFixed(2)
              },
            },
            { field: 'emergency_code', title: '응답코드', width: '60px' },
            { field: 'phone', title: '비상연락처', width: '140px' },
            { field: 'sos_date', title: '기록 일시', width: '180px' },
            {
              field: 'emergency_status_code',
              title: '처리현황',
              width: '80px',
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
            setLocation({ lng: item.longitude, lat: item.latitude })
          }}
        />
      )}
      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={PATHS.SOS}
          totalPage={totalPage}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}
