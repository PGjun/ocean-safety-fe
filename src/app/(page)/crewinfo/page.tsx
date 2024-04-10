'use client'

import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CrewDetailTab } from './components/CrewDetailTab'
import { CommonIcon } from '@/components/SvgIcons'
import { User, fetchUserList } from '@/services/api/user'
import moment from 'moment'

const COLTITLES = ['No', '이름', '아이디', '구분', '가입일']

export default function CrewInfoPage() {
  const isMobile = useMediaQuery('768')

  const [userList, setUserList] = useState([])
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const fetchUserListData = async () => {
      const res = await fetchUserList(2)
      if (res?.status === 200) {
        setUserList(res.data)
        console.log('🚀 ~ fetchUserListData ~ res.data:', res.data)
      }
    }
    fetchUserListData()
  }, [])
  return (
    <div className="md:mx-[40px]">
      <div>
        <div className="text-[26px] font-bold">승선원 정보</div>
        <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
          <div className="grid gap-[8px] md:w-[650px] md:grid-cols-2">
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">이름</div>
              <input
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="이름을 입력해 주세요."
              />
            </div>
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">연락처</div>
              <input
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="연락처를 입력해 주세요."
              />
            </div>
          </div>
          <button className="flex items-center gap-[3px] rounded bg-[#333333] px-[28px] py-[10px] text-white">
            <CommonIcon.Search /> 검색
          </button>
        </div>
      </div>

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
        <table className="mt-[10px] w-full table-fixed border-collapse text-center">
          <thead>
            <tr>
              {COLTITLES.map((item, idx) => (
                <th
                  key={idx}
                  className="border-y border-[#c4c4c4] py-[10px] text-[14px] font-bold"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList
                .slice(-5)
                .reverse()
                .map((item: User, idx: number) => (
                  <tr
                    key={idx}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => {
                      return setUserId(item.id)
                    }}
                  >
                    <td className="border-b py-[16px]">{idx + 1}</td>
                    <td className="border-b py-[16px]"> {item.name ?? ''}</td>
                    <td className="border-b py-[16px]">{item.user_id ?? ''}</td>
                    <td className="border-b py-[16px]">{'관리자'}</td>
                    <td className="border-b py-[16px]">
                      {moment(item.created_at).format('YYYY-mm-DD') ?? ''}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}

      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={() => {
            return '/'
          }}
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
