'use client'

import { Pagination, SearchParams } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CrewDetailTab } from './components/CrewDetailTab'
import { User, fetchUserList } from '@/services/api/user'
import moment from 'moment'
import { GenericTable } from '@/components/common/GenericTable'
import { useForm } from 'react-hook-form'
import { SearchFields } from '@/types/common'
import { SearchController } from '@/components/common/SearchController'
import { GenericSearchForm } from '@/components/common/GenericSearchForm'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

const searchFields: SearchFields = [
  {
    name: 'search_name',
    label: '이름',
    placeholder: '이름을 입력해 주세요.',
    component: SearchController,
    width: 312,
  },
  {
    name: 'search_phone',
    label: '연락처',
    placeholder: '연락처를 입력해 주세요.',
    component: SearchController,
    width: 312,
  },
]

export default function CrewInfoPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const { user } = useUser()

  const router = useRouter()

  const searchParams = pageProps.searchParams
  const { handleSubmit, control } = useForm()
  const [query, setQuery] = useState<any>()

  const [totalPage, setTotalPage] = useState(1)

  const [userList, setUserList] = useState([])
  const [userId, setUserId] = useState<number | null>(null)

  interface SearchData {
    search_name?: string
    search_phone?: string
  }

  useEffect(() => {
    if (!user) return
    const fetchUserListData = async () => {
      const res = await fetchUserList({
        group_id: user.group_id,
        ship_id: user.ship_id,
        item_count: '5',
        ...searchParams,
        ...query,
      })
      if (res?.status === 200) {
        setUserList(res.data.data)
        setTotalPage(res.data.total_page)
      }
    }

    fetchUserListData()
  }, [query, searchParams, user])

  const onSubmit = (data: SearchData) => {
    setQuery(data)

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
        mobileContents={(item: User, idx) => (
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
              moment(created_at).format('YYYY-mm-DD') ?? '',
          },
        ]}
        data={userList}
        onRowClick={(item: User) => {
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
            <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
              변경
            </button>
          </div>
          <CrewDetailTab userId={userId} />
        </div>
      )}
    </div>
  )
}
