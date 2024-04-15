import { Pagination, SearchParams } from '@/components/common/Pagination'
import { GenericTable } from '@/components/main/GenericTable'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ShipInfoParams, fetchShipList } from '@/services/api/user'
import { useEffect, useState } from 'react'

export const ShipListTable = ({
  searchParams,
  setShipId,
}: {
  searchParams: SearchParams
  setShipId: (ship_id: number) => void
}) => {
  const isMobile = useMediaQuery('768')

  const [shipList, setShipList] = useState([])

  const pageSize = '5'
  const [totalPage, setTotlaPage] = useState(1)

  useEffect(() => {
    const getShipListData = async () => {
      const res = await fetchShipList({
        group_id: '1',
        item_count: pageSize,
        ...searchParams,
      })
      if (res?.status === 200) {
        setShipList(res.data.data)
        setTotlaPage(res.data.total_page)
      }
    }

    getShipListData()
  }, [searchParams])

  return (
    <div className="flex-1">
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {shipList &&
            shipList.map((item: ShipInfoParams, idx) => (
              <div
                key={idx}
                className="cursor-pointer border-b p-[16px] text-[12px] hover:bg-slate-50"
                onClick={() => {
                  return setShipId(item.id)
                }}
              >
                <div>{`No. ${idx + 1} : ${item.group_name}`}</div>
                <div>
                  <span>{`아이디 : ${item.ship_name ?? ''} `}</span>
                  <span>{`구분 : ${item.nationality ?? ''} `}</span>
                  <span>{`가입일 : ${item.ship_owner ?? ''}`}</span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <GenericTable
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
      )}

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
