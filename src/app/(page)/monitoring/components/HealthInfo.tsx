import { GenericTable } from '@/components/common/GenericTable'
import { MultiPagination } from '@/components/common/MultiPagination'
import { PATHS } from '@/constants/paths'
import { UserHealthData } from '@/types/responseData'

export const HealthInfo = ({
  userHealthList,
  searchParams,
}: {
  userHealthList: any
  searchParams: any
}) => {
  return (
    <div className="mt-[20px] ">
      <GenericTable
        mobileContents={(item: UserHealthData, idx) => (
          <>
            <div className="space-x-1">
              <span>No. {item.id}</span>
              <span>{item.name}</span>
            </div>
            <div className="space-x-1">
              <span>심박수 : {item.health_rate}</span>
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
          { field: 'temperature', title: '피부온도', width: '2fr' },
          { field: 'oxygen_saturation', title: '산소포화도', width: '3fr' },
          { field: 'health_date', title: '기록 일시', width: '5fr' },
        ]}
        data={userHealthList.data}
        hover={false}
        onRowClick={(item: UserHealthData) => {}}
      />
      <div className="mt-[20px] flex w-full justify-center">
        <MultiPagination
          pageName="h_page_num"
          totalPage={userHealthList.total_page}
          page_num={searchParams.h_page_num}
          searchParams={searchParams}
          path={PATHS.MONITORING}
        />
      </div>
    </div>
  )
}
