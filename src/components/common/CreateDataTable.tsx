import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CommonIcon } from '@/icons/common'

export interface ColProps {
  field: string
  title: string
  width?: string
  render?: (value: string, fn: any, idx: any, col: any) => any
}

type onRowClick = (item: any) => void

interface GenericTableProps {
  columns: ColProps[]
  onRowClick?: onRowClick
  hover?: boolean
  handleData?: any
  rowDatas?: any
}

export const CreateDataTable = ({
  columns,
  hover = true,
  handleData = (data: any) => {},
  rowDatas,
}: GenericTableProps) => {
  const isMobile = useMediaQuery('768')
  const [data, setData] = useState(rowDatas ? rowDatas : Array(5).fill({})) // 초기 데이터 상태, 5개의 빈 객체로 시작

  const onChangeData = (data: any) => {
    setData(data)
    handleData(data)
  }

  // CSS Grid 템플릿 컬럼을 동적으로 생성
  const gridTemplateColumns = columns
    .map((col) => col.width || 'auto')
    .join(' ')

  const handleInputChange = (value: any, rowIdx: any, field: any) => {
    const newData = data.map((item: any, idx: any) =>
      idx === rowIdx ? { ...item, [field]: value } : item,
    )
    onChangeData(newData)
  }

  const addRow = () => {
    setData([...data, {}]) // 새 행 추가
  }

  const removeRow = (rowIdx: any) => {
    if (data.length > 0)
      onChangeData(data.filter((_: any, idx: any) => idx !== rowIdx)) // 행 삭제
  }

  const renderRow = (item: any, idx: number) => (
    <div
      key={idx}
      className={`grid gap-3 px-[20px] py-[16px] text-center ${hover && ' hover:bg-slate-50'}`}
      style={{ gridTemplateColumns }}
    >
      {columns.map((col, colIdx) => {
        if (colIdx === 0) return <div key={idx}>{idx + 1}</div>
        if (col.render)
          return (
            <div key={'col' + colIdx}>
              {col.render(item[col.field], handleInputChange, idx, col)}
            </div>
          )
        return (
          <input
            key={'col' + colIdx}
            type="text"
            value={item[col.field] || ''}
            placeholder={col.title}
            onChange={(e) => handleInputChange(e.target.value, idx, col.field)}
            className="w-full rounded border p-[4px]"
          />
        )
      })}
    </div>
  )

  const renderMobile = (item: any, idx: number) => (
    <div key={idx} className="border-b p-[16px] text-[12px] hover:bg-slate-50">
      {columns.map((col, colIdx) => {
        // if (colIdx === 0) return <div key={idx}>{idx + 1}</div>
        return (
          <div key={'col' + colIdx} className="mb-[5px] flex items-center">
            <label htmlFor="" className="w-[60px]">
              {col.title}
            </label>
            {colIdx === 0 ? (
              <div>{idx + 1}</div>
            ) : (
              <input
                type="text"
                value={item[col.field] || ''}
                onChange={(e) =>
                  handleInputChange(e.target.value, idx, col.field)
                }
                className="flex-1 border p-[4px]"
              />
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-bold">웨어러블</div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={addRow}
            className="mt-[10px] flex h-[30px] w-[30px] items-center justify-center rounded-md border border-[#888888] hover:bg-gray-50"
          >
            <CommonIcon.Plus />
          </button>
          <button
            type="button"
            onClick={() => removeRow(data.length - 1)}
            className="mt-[10px] flex h-[30px] w-[30px] items-center justify-center rounded-md border border-[#888888] hover:bg-gray-50"
          >
            <CommonIcon.Minus />
          </button>
        </div>
      </div>
      <div className="mt-[10px]">
        {isMobile ? (
          <div className="border-t border-[#c4c4c4]">
            {data.map(renderMobile)}
          </div>
        ) : (
          <>
            <div
              className="grid border-y border-[#c4c4c4] px-[20px] text-center"
              style={{ gridTemplateColumns: `${gridTemplateColumns}` }}
            >
              {columns.map((col, idx) => (
                <div key={idx} className="py-[10px] text-[14px] font-bold">
                  {col.title}
                </div>
              ))}
            </div>
            {data.map(renderRow)}
          </>
        )}
      </div>
    </div>
  )
}
