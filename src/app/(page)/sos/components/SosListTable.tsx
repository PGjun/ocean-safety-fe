import { Pagination, SearchParams } from '@/components/common/Pagination'
import { GenericTable } from '@/components/common/GenericTable'
import { PATHS } from '@/constants/paths'
import { fetchUserEmergencyList } from '@/services/api/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { UserEmergencyData } from '@/types/responseData'
import { SosStatus } from '@/components/common/SosStatus'

export const SosListTable = ({
  searchParams,
  setSosData,
  setLocation,
  setNumOfItems,
  query,
  type,
}: {
  searchParams: SearchParams
  setSosData: (data: UserEmergencyData) => void
  setLocation: ({ lng, lat }: { lng: number; lat: number }) => void
  setNumOfItems: any
  query: any
  type: 'SOS' | '낙상'
}) => {
  const { user } = useUser()

  const [sosList, setSosList] = useState([])

  const [totalPage, setTotalPage] = useState(1)

  const [loading, setLoading] = useState(false)

  //todo 임시 처리 sosData 초기화
  useEffect(() => {
    if (!user) return
    const fetcEmergencyListData = async () => {
      setLoading(true)
      const res = await fetchUserEmergencyList({
        group_id: user?.group_id,
        ship_id: user?.ship_id,
        item_count: '5',
        search_code: type,
        ...searchParams,
        ...query,
      })
      if (res?.status === 200) {
        setSosList(res.data.data)
        setTotalPage(res.data.total_page)
        setNumOfItems(res.data.num_of_items)
        if (res.data.data[0]) {
          setSosData(res.data.data[0])
          setLocation({
            lng: res.data.data[0].longitude,
            lat: res.data.data[0].latitude,
          })
        }
      }
      setLoading(false)
    }

    fetcEmergencyListData()
  }, [searchParams, query, user])

  return (
    <div className="flex-1">
      <GenericTable
        loading={loading}
        mobileContents={(item: UserEmergencyData, idx) => (
          <Link
            key={idx}
            href={type === 'SOS' ? PATHS.SOS_DETAIL() : PATHS.FALL_DETAIL()}
          >
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
            <SosStatus status={item.emergency_status_code} />
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
            render: (status) => {
              return <SosStatus status={status} />
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
          path={type === 'SOS' ? PATHS.SOS : PATHS.FALL}
          totalPage={totalPage}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}
