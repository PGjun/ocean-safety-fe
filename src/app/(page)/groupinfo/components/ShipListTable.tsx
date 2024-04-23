import { Pagination, SearchParams } from '@/components/common/Pagination'
import { GenericTable } from '@/components/common/GenericTable'
import { PATHS } from '@/constants/paths'
import { ShipInfoParams, fetchShipList } from '@/services/api/user'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'

export const ShipListTable = ({
  query,
  searchParams,
  setShipId,
}: {
  query: any
  searchParams: SearchParams
  setShipId: (ship_id: number) => void
}) => {
  const { user } = useUser()

  const [shipList, setShipList] = useState([])

  const [totalPage, setTotlaPage] = useState(1)

  useEffect(() => {
    if (!user) return
    const getShipListData = async () => {
      const res = await fetchShipList({
        group_id: user?.group_id,
        ship_id: user?.ship_id,
        item_count: '5',
        ...searchParams,
        ...query,
      })
      if (res?.status === 200) {
        setShipList(res.data.data)
        setTotlaPage(res.data.total_page)
      }
    }

    getShipListData()
  }, [searchParams, query, user])

  return (
    <div className="flex-1">
      <GenericTable
        mobileContents={(item: ShipInfoParams, idx) => (
          <>
            <div>
              No. {idx + 1} &nbsp; 그룹명 : {item.group_name}
            </div>
            <div>
              <span>선박명 : {item.ship_name ?? ''} &nbsp;</span>
              <span>선적항(국적) : {item.nationality ?? ''} &nbsp;</span>
            </div>
            <div>선박 소유자 : {item.ship_owner ?? ''}</div>
          </>
        )}
        columns={[
          { field: 'id', title: 'No', width: '1fr' },
          { field: 'group_name', title: '그룹명', width: '2fr' },
          { field: 'ship_name', title: '선박명', width: '2fr' },
          { field: 'nationality', title: '선적항(국적)', width: '2fr' },
          {
            field: 'ship_owner',
            title: '선박 소유자',
            width: '3fr',
          },
        ]}
        data={shipList}
        onRowClick={(item: ShipInfoParams) => {
          setShipId(item.id)
        }}
      />

      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={PATHS.GROUP_INFO}
          totalPage={totalPage}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}
