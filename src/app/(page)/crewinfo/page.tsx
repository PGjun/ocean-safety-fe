'use client'

import { Pagination, SearchParams } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CrewDetailTab } from './components/CrewDetailTab'
import { fetchUserList } from '@/services/api/user'
import moment from 'moment'
import { GenericTable } from '@/components/common/GenericTable'
import { useForm } from 'react-hook-form'
import { SearchFields } from '@/types/common'
import { SearchController } from '@/components/common/SearchController'
import { GenericSearchForm } from '@/components/common/GenericSearchForm'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { UserInfoData } from '@/types/responseData'
import { ROLES } from '@/constants/roles'
import { useGroupShipDropDown } from '@/hooks/useGroupShipDropDown'

export default function CrewInfoPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const searchParams = pageProps.searchParams
  const router = useRouter()

  const { user, role } = useUser()
  const { handleSubmit, control, setValue } = useForm()
  const { DropDownFC } = useGroupShipDropDown()

  const [query, setQuery] = useState<any>()
  const [totalPage, setTotalPage] = useState(1)
  const [userList, setUserList] = useState([])
  const [userId, setUserId] = useState<number | null>(null)

  const searchFields: SearchFields = [
    {
      name: 'groupDrop',
      label: '그룹',
      placeholder: '==선택==',
      component: DropDownFC.GroupSearchController,
      setValue,
      width: 200,
    },
    {
      name: 'shipDrop',
      label: '선박',
      placeholder: '==선택==',
      component: DropDownFC.ShipSearchController,
      width: 200,
    },
    {
      name: 'search_name',
      label: '이름',
      placeholder: '이름을 입력해 주세요.',
      component: SearchController,
      width: 200,
    },
    {
      name: 'search_phone',
      label: '연락처',
      placeholder: '연락처를 입력해 주세요.',
      component: SearchController,
      width: 200,
    },
  ]

  useEffect(() => {
    if (!user) return
    const fetchUserListData = async () => {
      const res = await fetchUserList({
        ...(role !== ROLES.ADMIN && { group_id: user.group_id }),
        ...(role !== ROLES.ADMIN &&
          role !== ROLES.GROUP && { ship_id: user.ship_id }),
        item_count: '5',
        ...searchParams,
        ...query,
        noFilter: true,
      })
      if (res?.status === 200) {
        const resData = res.data.data as UserInfoData[]

        setUserList(res.data.data)
        setTotalPage(res.data.total_page)
        if (resData[0]) {
          setUserId(Number(resData[0].id))
        }
      }
    }

    fetchUserListData()
  }, [query, searchParams, user, role])

  interface SearchData {
    search_name?: string
    search_phone?: string
    groupDrop?: any
    shipDrop?: any
  }

  const onSubmit = (data: SearchData) => {
    const { groupDrop, shipDrop, ...rest } = data
    const queryData = {
      ...rest,
      ...(groupDrop &&
        groupDrop.value !== '0' && { group_id: groupDrop.value }),
      ...(shipDrop && shipDrop.value !== '0' && { ship_id: shipDrop.value }),
    }
    setQuery(queryData)

    router.push(PATHS.CREW_INFO({ page_num: '1' }))
  }

  return (
    <div className="md:mx-[40px]">
      <div className="text-[26px] font-bold">승선원 정보</div>
      <GenericSearchForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        searchFields={searchFields}
        searchParams={searchParams}
      />

      <div className="mb-[10px] mt-[40px] flex items-center justify-between">
        <div className="text-[18px] font-bold">승선원 정보</div>
        <Link href={PATHS.CREW_ADD}>
          <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
            + 추가
          </button>
        </Link>
      </div>

      <GenericTable
        mobileContents={(item: UserInfoData, idx) => (
          <>
            <div>
              No. {item.id} &nbsp; {item.name ?? ''}
            </div>
            <div>
              <span>아이디 : {item.user_id ?? ''} &nbsp;</span>
              <span>구분 : {item.crew_level}</span>
            </div>
            <div>가입일 : {item.created_at ?? ''}</div>
          </>
        )}
        columns={[
          { field: 'id', title: 'No', width: '1fr' },
          { field: 'name', title: '이름', width: '2fr' },
          { field: 'user_id', title: '아이디', width: '2fr' },
          { field: 'crew_level', title: '구분', width: '2fr' },
          {
            field: 'created_at',
            title: '가입일',
            width: '3fr',
            render: (created_at) =>
              moment(created_at).format('YYYY-MM-DD') ?? '',
          },
        ]}
        data={userList}
        onRowClick={(item: UserInfoData) => {
          setUserId(item.id)
        }}
      />

      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={PATHS.CREW_INFO}
          totalPage={totalPage}
          searchParams={searchParams}
        />
      </div>
      {userId && (
        <div className="relative">
          <div className="mt-[40px] flex items-center justify-between">
            <div className="text-[18px] font-bold">승선원 상세</div>
            <button
              onClick={() => router.push(PATHS.CREW_EDIT({ user_id: userId }))}
              className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold"
            >
              수정
            </button>
          </div>
          <CrewDetailTab userId={userId} />
        </div>
      )}
    </div>
  )
}
