// GenericTable 컴포넌트

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ReactNode } from 'react'

export interface ColProps {
  field: string
  title: string
  width?: string
  render?: (value: string) => void
}

type onRowClick = (item: any) => void

interface GenericTableProps {
  columns: ColProps[]
  data: any
  onRowClick: onRowClick
  hover?: boolean
  hideNo?: boolean
  mobileContents: (item: any, idx: number) => ReactNode
}

export const GenericTable = ({
  columns,
  data,
  onRowClick,
  hover = true,
  hideNo,
  mobileContents,
}: GenericTableProps) => {
  const isMobile = useMediaQuery('768')

  // CSS Grid 템플릿 컬럼을 동적으로 생성
  const gridTemplateColumns = columns
    .map((col) => col.width || 'auto')
    .join(' ')

  const renderHeader = () => (
    <div
      className="grid border-y border-[#c4c4c4] px-[20px] text-center"
      style={{ gridTemplateColumns }}
    >
      {columns.map((col, idx) => {
        return (
          <div key={idx} className="py-[10px] text-[14px] font-bold">
            {col.title}
          </div>
        )
      })}
    </div>
  )

  const renderRow = (item: any, idx: number) => (
    <div
      key={idx}
      className={`grid border-b px-[20px] py-[16px] text-center  ${hover && 'cursor-pointer hover:bg-slate-50'}`}
      style={{ gridTemplateColumns }}
      onClick={() => onRowClick(item)}
    >
      {columns.map((col, colIdx) => {
        if (!hideNo && colIdx === 0) return <div key={colIdx}>{idx + 1}</div>
        return (
          <div key={colIdx}>
            {col.render ? col.render(item[col.field]) : item[col.field]}
          </div>
        )
      })}
    </div>
  )

  const renderMobile = () => (
    <div className="border-t border-[#c4c4c4]">
      {data.map((item: any, idx: number) => (
        <div
          key={idx}
          className="cursor-pointer border-b p-[16px] text-[12px] hover:bg-slate-50"
          onClick={() => onRowClick(item)}
        >
          {mobileContents(item, idx)}
        </div>
      ))}
    </div>
  )

  return (
    <div>
      {isMobile ? (
        renderMobile()
      ) : (
        <>
          {renderHeader()}
          {data.map(renderRow)}
        </>
      )}
    </div>
  )
}
