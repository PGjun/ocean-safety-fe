'use client'

import { SearchParams } from '@/components/common/Pagination'
import { useFetch } from '@/hooks/useFetch'
import { CommonIcon } from '@/icons/common'
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
    <div className="md:mx-[40px]">
      <div className="border-b text-[18px] font-bold md:border-0 md:text-[26px]">
        공지사항
      </div>
      <div className="mt-[30px] w-full rounded-xl md:border md:p-[36px] md:shadow-md">
        <div className="text-center">
          <div className="font-bold md:text-[22px]">{notice.title}</div>
          <div className="text-[#888888]">
            작성자 : {notice.publisher_name}{' '}
            <span className="text-[#c4c4c4]">/</span>{' '}
            {notice.publisher_crew_level}{' '}
            <span className="text-[#c4c4c4]">/</span> {notice.posted_date}
          </div>
        </div>
        <div className="my-[30px] h-[1px] w-full bg-[#c4c4c4]" />
        <div className="min-h-[300px]">{notice.content}</div>

        <div className="flex flex-wrap gap-3">
          {noticeFile &&
            noticeFile.map((item, idx) => {
              return (
                <div key={idx} className="flex items-center gap-3 border p-3">
                  <span>{item.notice_file_name}</span>
                  <button
                    type="button"
                    className="place-items-center"
                    onClick={() =>
                      downloadFile(item.notice_file_url, item.notice_file_name)
                    }
                  >
                    <CommonIcon.DownLoad />
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
    </div>
  )
}
