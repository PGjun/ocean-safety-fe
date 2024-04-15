// GenericTable 컴포넌트

export interface ColProps {
  field: string
  title: string
  width?: string
  render?: (value: string) => void
}

interface GenericTableProps {
  columns: ColProps[]
  data: any
  onRowClick: (item: any) => void
  hideNo?: boolean
}

export const GenericTable = ({
  columns,
  data,
  onRowClick,
  hideNo,
}: GenericTableProps) => {
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
      className="grid cursor-pointer border-b px-[20px] py-[16px] text-center hover:bg-slate-50"
      style={{ gridTemplateColumns }}
      onClick={() => onRowClick(item)}
    >
      {columns.map((col, colIdx) => {
        if (!hideNo && colIdx === 0) {
          return <div key={colIdx}>{idx + 1}</div>
        } else {
          return (
            <div key={colIdx}>
              {col.render ? col.render(item[col.field]) : item[col.field]}
            </div>
          )
        }
      })}
    </div>
  )

  return (
    <div>
      {renderHeader()}
      {data.map(renderRow)}
    </div>
  )
}
