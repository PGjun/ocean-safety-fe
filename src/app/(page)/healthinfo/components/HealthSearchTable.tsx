import { Pagination, SearchParams } from '@/components/common/Pagination'
import { GenericTable } from '@/components/main/GenericTable'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { UserHealth, fetchUserHealthList } from '@/services/api/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const HealthSearchTable = ({
  searchParams,
  query,
  setUserIndex,
}: {
  searchParams: SearchParams
  query: any
  setUserIndex: (useIndex: number) => void
}) => {
  const isMobile = useMediaQuery('768')

  const [healthList, setHealthList] = useState([])

  const pageSize = '5'
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    const fetchHealthList = async () => {
      const res = await fetchUserHealthList({
        group_id: '1',
        item_count: pageSize,
        ...searchParams,
        ...query,
      })
      if (res?.status === 200) {
        setHealthList(res.data.data)
        setTotalPage(res.data.total_page)
      }
    }

    // 함수를 즉시 실행한 다음, 5초마다 반복 실행합니다.
    fetchHealthList()
    const intervalId = setInterval(fetchHealthList, 5000)

    // setInterval에 의해 설정된 타이머를 해제합니다.
    return () => clearInterval(intervalId)
  }, [pageSize, searchParams, query])

  return (
    <div className="flex-1">
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {healthList &&
            healthList.map((item: UserHealth, idx) => (
              <Link key={idx} href={PATHS.SOS_DETAIL}>
                <div className="border-b p-[8px] text-[12px]">
                  <div>{`No. ${idx + 1} 이름 : ${item.name}`}</div>
                  <div>
                    {`심박수 : ${item.health_rate} 혈압 : ${item.blood_pressure}`}
                  </div>
                  <div>
                    {`체온 : ${item.temperature} 산소포화도 : ${item.oxygen_saturation}`}
                  </div>
                  <div>{`기록일시 : ${item.health_date}`}</div>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <GenericTable
          columns={[
            { field: 'id', title: 'No', width: '1fr' },
            { field: 'name', title: '이름', width: '2fr' },
            { field: 'health_rate', title: '심박수', width: '2fr' },
            { field: 'blood_pressure', title: '혈압', width: '2fr' },
            { field: 'temperature', title: '체온', width: '2fr' },
            { field: 'oxygen_saturation', title: '산소포화도', width: '3fr' },
            { field: 'health_date', title: '기록 일시', width: '5fr' },
          ]}
          data={healthList}
          onRowClick={(item: UserHealth) => {
            setUserIndex(item.user_index)
          }}
        />
      )}
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
