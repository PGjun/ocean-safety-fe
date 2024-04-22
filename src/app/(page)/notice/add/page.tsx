'use client'
import { FileUpload } from '@/components/common/FileUpload'
import { PATHS } from '@/constants/paths'
import { useUser } from '@/hooks/useUser'
import { postAddNotice } from '@/services/api/user'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface NoticeValue {
  title: string
  content: string
}

export default function NoticeAddPage() {
  const { register, handleSubmit } = useForm<NoticeValue>()
  const { user } = useUser()
  const router = useRouter()

  const [files, setFiles] = useState<File[]>([])

  const onSubmit = async (data: NoticeValue) => {
    if (!user) return
    const res = await postAddNotice({
      group_id: 1,
      user_id: user.id,
      title: data.title,
      content: data.content,
      upload_files: files,
    })

    if (res?.status === 200) {
      alert('작성 완료')
      router.push(PATHS.NOTICE())
    }
  }

  return (
    <div>
      <div className="text-[20px] font-bold">공지 작성</div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[30px]">
        <div className="flex flex-col">
          <label htmlFor="">제목</label>
          <input type="text" {...register('title')} className="border" />
        </div>
        <div className="mt-[20px] flex flex-col">
          <label htmlFor="">내용</label>
          <textarea
            id=""
            rows={10}
            className="w-full resize-none border"
            {...register('content')}
          ></textarea>
        </div>

        <div className="mt-[20px]">
          <FileUpload multiple={true} files={files} setFiles={setFiles} />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded border border-[#888888] px-3"
          >
            완료
          </button>
        </div>
      </form>
    </div>
  )
}
