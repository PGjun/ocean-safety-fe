import { ChangeEvent, useRef } from 'react'

interface FileUploadProps {
  multiple: boolean
  files: File[]
  setFiles: (files: File[]) => void
}

export const FileUpload = ({ multiple, files, setFiles }: FileUploadProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    if (files.length > 3) {
      alert('최대 3개의 파일만 업로드 가능합니다.')
      return // 함수 종료, 파일 선택 취소
    }
    if (files.length > 0) {
      const filteredFiles = files.filter(
        (file) => file.type === 'image/png' || file.type === 'image/jpeg',
      )
      if (filteredFiles.length !== files.length) {
        alert('PNG, JPG, JPEG 파일만 업로드 가능합니다.')
      }
      setFiles(filteredFiles)
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="rounded border border-[#C4C4C4] px-[12px] py-[2px] text-[12px]"
      >
        파일 업로드
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        multiple={multiple}
        className="hidden"
      />
      <div>
        {files &&
          files.map((item, idx) => {
            return <div key={idx}>{item.name}</div>
          })}
      </div>
    </div>
  )
}
