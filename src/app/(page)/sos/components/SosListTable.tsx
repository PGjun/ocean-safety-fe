import { Pagination, SearchParams } from '@/components/common/Pagination'
import { GenericTable } from '@/components/common/GenericTable'
import { PATHS } from '@/constants/paths'
import { UserEmergencyData, fetchUserEmergencyList } from '@/services/api/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const SosListTable = ({
  searchParams,
  setSosData,
  setLocation,
  query,
}: {
  searchParams: SearchParams
  setSosData: (data: UserEmergencyData) => void
  setLocation: ({ lng, lat }: { lng: number; lat: number }) => void
  query: any
}) => {
  const [sosList, setSosList] = useState([])

  const pageSize = '5'
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
      <GenericTable
        mobileContents={(item: UserEmergencyData, idx) => (
          <Link key={idx} href={PATHS.SOS_DETAIL()}>
            <div className="space-x-1">
              <span>No. {item.id}</span>
              <span>이름 : {item.name}</span>
              <span>아이디 : {item.user_id}</span>
            </div>
            <div className="space-x-1">
              <span>좌표X : {item.longitude.toFixed(3)} </span>
              <span>좌표Y : {item.latitude.toFixed(3)} </span>
              {/* <span>응급코드 : {item.emergency_code}</span> */}
            </div>
            <div>비상연락처 : {item.phone}</div>
            <div>기록일시 : {item.sos_date}</div>
            <div className="inline-flex items-center gap-[4px] rounded bg-[#FFF0F0] px-[20px] py-[2px]">
              <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]" />
              {item.emergency_status_code}
            </div>
          </Link>
        )}
        columns={[
          { field: 'id', title: 'No', width: '40px' },
          { field: 'name', title: '이름', width: '2fr' },
          { field: 'user_id', title: '아이디', width: '2fr' },
          {
            field: 'longitude',
            title: 'X좌표',
            width: '2fr',
            render: (x) => {
              return parseFloat(x).toFixed(3)
            },
          },
          {
            field: 'latitude',
            title: 'Y좌표',
            width: '2fr',
            render: (y) => {
              return parseFloat(y).toFixed(3)
            },
          },
          // { field: 'emergency_code', title: '응급코드', width: '60px' },
          { field: 'phone', title: '비상연락처', width: '3fr' },
          { field: 'sos_date', title: '기록 일시', width: '4fr' },
          {
            field: 'emergency_status_code',
            title: '처리현황',
            width: '2fr',
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
          setSosData(item)
          setLocation({ lng: item.longitude, lat: item.latitude })
        }}
      />
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
