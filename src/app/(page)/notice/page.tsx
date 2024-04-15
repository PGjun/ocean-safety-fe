'use client'

import { CommonIcon } from '@/components/SvgIcons'
import { Pagination, SearchParams } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { fetchNoticeList } from '@/services/api/user'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface NoticeList {
  id: number
  title: string
  content: string
  posted_date: string
  publisher_crew_level: string
  publisher_name: string
  publisher_user_id: string
}

export default function NoticePage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const pageSize = '10'

  const [noticeList, setNoticeList] = useState([])
  const [totalPage, setTotlaPage] = useState(1)

  const searchParams = pageProps.searchParams
  useEffect(() => {
    const getNoticeListData = async () => {
      const res = await fetchNoticeList({
        group_id: '1',
        item_count: pageSize,
        ...searchParams,
      })
      if (res?.status === 200) {
        setNoticeList(res.data.data)
        setTotlaPage(res.data.total_page)
      }
    }

    getNoticeListData()
  }, [searchParams])

  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">공지사항</div>
      <div className="mt-[30px] border-t-[2px] border-[#888888]">
        {noticeList.map((item: NoticeList, idx) => {
          return (
            <div
              key={idx}
              className="group cursor-pointer border-b border-[#E9ECEF] p-[20px] hover:bg-[#F8F9FA]"
            >
              <div className="flex gap-[10px] text-[20px] leading-[24px] ">
                <div className="group-hover:font-bold">
                  <div className="inline-block">
                    <div className="mr-3 inline-block group-hover:font-normal">
                      {idx + 1}
                    </div>
                    {item.title.slice(0, 27)}
                    <span className="ml-1 inline-block">
                      <CommonIcon.ATTACH_FILE />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-[9.5px] leading-[19.2px] text-[#666666]">
                {item.publisher_crew_level}
                <span className="px-[12px] text-[#DDDDDD]">/</span>
                {moment(item.posted_date).format('yyyy.MM.DD HH:mm')}
              </div>
            </div>
          )
        })}
        <div className="mt-[32px] flex justify-end">
          <Link href={PATHS.SOS_SETTINGS}>
            <button className="rounded border border-[#C4C4C4] px-[28px] py-[13.5px] text-[14px] font-bold md:leading-[16.71px]">
              새 글쓰기
            </button>
          </Link>
        </div>
        <div className="mt-[32px] flex w-full justify-center">
          <Pagination
            path={PATHS.NOTICE}
            totalPage={totalPage}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  )
}
