import { Pagination, SearchParams } from '@/components/common/Pagination'
import { GenericTable } from '@/components/common/GenericTable'
import { PATHS } from '@/constants/paths'
import { fetchUserHealthList } from '@/services/api/user'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { UserHealthData } from '@/types/responseData'

export const HealthSearchTable = ({
  searchParams,
  query,
  setUserIndex,
  setUserName,
}: {
  searchParams: SearchParams
  query: any
  setUserIndex: (userIndex: number) => void
  setUserName: (userName: string) => void
}) => {
  const { user } = useUser()

  const [healthList, setHealthList] = useState([])

  const pageSize = '5'
  const [totalPage, setTotalPage] = useState(1)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    const fetchHealthList = async () => {
      setLoading(true)
      const res = await fetchUserHealthList({
        group_id: user?.group_id,
        ship_id: user?.ship_id,
        user_id: user?.id,
        item_count: pageSize,
        ...searchParams,
        ...query,
      })
      if (res?.status === 200) {
        setHealthList(res.data.data)
        setTotalPage(res.data.total_page)
        if (res.data.data[0]) {
          setUserIndex(res.data.data[0].user_index)
          setUserName(res.data.data[0].name)
        }
      }
      setLoading(false)
    }

    // 함수를 즉시 실행한 다음, 5초마다 반복 실행합니다.
    fetchHealthList()
    const intervalId = setInterval(fetchHealthList, 5000)

    // setInterval에 의해 설정된 타이머를 해제합니다.
    return () => clearInterval(intervalId)
  }, [pageSize, searchParams, query, user, setUserIndex, setUserName])

  return (
    <div className="flex-1">
      <GenericTable
        mobileContents={(item: UserHealthData) => (
          <>
            <div className="space-x-1">
              <span>No. {item.id}</span>
              <span>{item.name}</span>
            </div>
            <div className="space-x-1">
              <span>심박수 : {item.health_rate}</span>
              <span>혈압 : {item.blood_pressure}</span>
              <span>피부온도 : {item.temperature}</span>
              <span>산소포화도 : {item.oxygen_saturation}</span>
            </div>
            <div>기록일시 : {item.health_date}</div>
          </>
        )}
        columns={[
          { field: 'id', title: 'No', width: '1fr' },
          { field: 'name', title: '이름', width: '2fr' },
          { field: 'health_rate', title: '심박수', width: '2fr' },
          { field: 'blood_pressure', title: '혈압', width: '2fr' },
          { field: 'temperature', title: '피부온도', width: '2fr' },
          { field: 'oxygen_saturation', title: '산소포화도', width: '3fr' },
          { field: 'health_date', title: '기록 일시', width: '5fr' },
        ]}
        data={healthList}
        onRowClick={(item: UserHealthData) => {
          setUserIndex(item.user_index)
          setUserName(item.name)
        }}
      />
      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={PATHS.HEALTH_INFO}
          totalPage={totalPage}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}
