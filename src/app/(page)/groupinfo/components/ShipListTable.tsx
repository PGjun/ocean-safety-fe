import { Pagination, SearchParams } from '@/components/common/Pagination'
import { GenericTable } from '@/components/common/GenericTable'
import { PATHS } from '@/constants/paths'
import { fetchShipList } from '@/services/api/user'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { ShipInfoData } from '@/types/responseData'
import { ROLES } from '@/constants/roles'
import { getRowNum } from '@/utils/getRowNum'

export const ShipListTable = ({
  query,
  searchParams,
  setShipId,
}: {
  query: any
  searchParams: SearchParams
  setShipId: (ship_id: number) => void
}) => {
  const { user, role } = useUser()

  const [shipList, setShipList] = useState([])
  const [totalPage, setTotlaPage] = useState(1)
  const [numOfItems, setNumOfItems] = useState(0)

  useEffect(() => {
    if (!user) return
    const getShipListData = async () => {
      const res = await fetchShipList({
        ...(role !== ROLES.ADMIN && { group_id: user.group_id }),
        ...(role !== ROLES.ADMIN &&
          role !== ROLES.GROUP && { ship_id: user.ship_id }),
        item_count: '5',
        ...searchParams,
        ...query,
      })
      if (res?.status === 200) {
        setShipList(res.data.data)
        setTotlaPage(res.data.total_page)
        setNumOfItems(res.data.num_of_items)
        if (res.data.data[0]) {
          setShipId(res.data.data[0].id)
        }
      }
    }

    getShipListData()
  }, [searchParams, query, user, role, setShipId])

  return (
    <div className="flex-1">
      <GenericTable
        mobileContents={(item: ShipInfoData, idx) => {
          const number = getRowNum(
            numOfItems,
            Number(searchParams.page_num),
            idx,
          )
          return (
            <>
              <div>
                No. {number} &nbsp; 그룹명 : {item.group_name}
              </div>
              <div>
                <span>선박명 : {item.ship_name ?? ''} &nbsp;</span>
                <span>선적항(국적) : {item.nationality ?? ''} &nbsp;</span>
              </div>
              <div>선박 소유자 : {item.ship_owner ?? ''}</div>
            </>
          )
        }}
        columns={[
          {
            field: 'no',
            title: 'No',
            width: '1fr',
            render: (_, idx) => {
              const number = getRowNum(
                numOfItems,
                Number(searchParams.page_num),
                idx,
              )

              return <div>{number > 0 && number}</div>
            },
          },
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
        onRowClick={(item: ShipInfoData) => {
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
