'use client'

import { SearchParams } from '@/components/common/Pagination'
import { useFetch } from '@/hooks/useFetch'
import { fetchSpecificNotice } from '@/services/api/user'
import { PageProps } from '@/types/common'
import { downloadFile } from '@/utils/downloadFile'

export default function NoticeDetailPage(pageProps: PageProps<SearchParams>) {
  const noticeId = pageProps.searchParams.notice_id

  type NoticeDetail = {
    id: number
    title: string
    content: string
    posted_date: string
    publisher_crew_level: string
    publisher_user_id: string
    publisher_name: string
  }[]

  interface NoticeDatas {
    data: NoticeDetail
    file_data: {
      id: number
      notice_file_name: string
      notice_file_url: string
    }[]
  }

  const { data } = useFetch<NoticeDatas, string>({
    apiFn: fetchSpecificNotice,
    params: noticeId as string,
    defVal: {
      data: [
        {
          id: 0,
          title: '',
          content: '',
          posted_date: '',
          publisher_crew_level: '',
          publisher_user_id: '',
          publisher_name: '',
        },
      ],
    },
  })

  const notice = data.data[0]
  const noticeFile = data.file_data && data.file_data

  return (
    <div>
      <div>제목 : {notice.title}</div>
      <div>내용 : {notice.content}</div>
      <div>날짜 : {notice.posted_date}</div>
      <div>구분 : {notice.publisher_crew_level}</div>
      <div>아이디 : {notice.publisher_user_id}</div>
      <div>이름 : {notice.publisher_name}</div>
      <div>
        {noticeFile &&
          noticeFile.map((item, idx) => {
            return (
              <div key={idx}>
                {item.notice_file_name}
                <button
                  type="button"
                  className="border border-[#888888] px-3"
                  onClick={() =>
                    downloadFile(item.notice_file_url, item.notice_file_name)
                  }
                >
                  다운로드
                </button>
                {/* <a
                  href={
                    process.env.NEXT_PUBLIC_API_URL + '/' + item.notice_file_url
                  }
                  className="underline"
                  download={true}
                >
                  {item.notice_file_name}
                </a> */}
              </div>
            )
          })}
      </div>
    </div>
  )
}
