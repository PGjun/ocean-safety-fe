'use client'

import { Pagination, SearchParams } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { CrewDetailTab } from './components/CrewDetailTab'
import { CommonIcon } from '@/components/SvgIcons'
import { User, fetchUserList } from '@/services/api/user'
import moment from 'moment'
import { GenericTable } from '@/components/main/GenericTable'
import { useForm } from 'react-hook-form'

export default function CrewInfoPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const searchParams = pageProps.searchParams

  const isMobile = useMediaQuery('768')

  const [userList, setUserList] = useState([])
  const [userId, setUserId] = useState<number | null>(null)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalPage, setTotalPage] = useState(1)

  const { register, handleSubmit } = useForm()

  interface SearchData {
    search_name?: string
    search_phone?: string
  }

  const fetchUserListData = useCallback(
    async (searchData?: SearchData) => {
      const res = await fetchUserList({
        group_id: 1,
        ship_id: 2,
        page_num: page,
        item_count: pageSize,
        ...searchData,
      })
      if (res?.status === 200) {
        setUserList(res.data.data)
        setTotalPage(res.data.total_page)
      }
    },
    [page, pageSize],
  ) // fetchUserListData 함수 내에서 사용되는 상태를 의존성 배열에 추가

  useEffect(() => {
    fetchUserListData()
  }, [fetchUserListData])

  const onSubmit = (data: SearchData) => {
    setPage(1)
    fetchUserListData(data)
  }

  return (
    <div className="md:mx-[40px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[26px] font-bold">승선원 정보</div>
        <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
          <div className="grid gap-[8px] md:w-[650px] md:grid-cols-2">
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">이름</div>
              <input
                {...register('search_name')}
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="이름을 입력해 주세요."
              />
            </div>
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">연락처</div>
              <input
                {...register('search_phone')}
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="연락처를 입력해 주세요."
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-[3px] rounded bg-[#333333] px-[28px] py-[10px] text-white"
          >
            <CommonIcon.Search /> 검색
          </button>
        </div>
      </form>

      <div className="mt-[40px] flex items-center justify-between">
        <div className="text-[18px] font-bold">승선원 정보</div>
        <Link href={PATHS.CREW_ADD}>
          <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
            + 추가
          </button>
        </Link>
      </div>

      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {userList &&
            userList.map((item: User, idx) => (
              <div key={idx} className="border-b p-[16px] text-[12px]">
                <div>{`No. ${idx + 1} : ${item.name ?? ''}`}</div>
                <div>
                  <span>{`아이디 : ${item.user_id ?? ''} `}</span>
                  <span>{`구분 : 관리자 `}</span>
                  <span>{`가입일 : ${moment(item.created_at).format('YYYY-mm-DD') ?? ''}`}</span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <GenericTable
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
          data={userList.slice(-5)}
          onRowClick={(item: User) => {
            setUserId(item.id)
          }}
        />
      )}

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
