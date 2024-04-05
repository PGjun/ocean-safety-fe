import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Fragment } from 'react'

// data 객체의 타입을 유동적으로 정의
type DataItem = {
  [key: string]: string // 모든 키는 string 타입의 값을 가진다.
}

// DataTable 컴포넌트의 props 타입 정의
interface DataTableProps {
  header: string[]
  data: DataItem[]
}

export const DataTable = ({ header, data }: DataTableProps) => {
  const dataCount = Object.keys(data[0]).length
  const headerCols = `grid-cols-[repeat(${dataCount},auto)]`

  const isMobile = useMediaQuery('768')
  return (
    <>
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {data.map((item, idx) => (
            <div key={idx} className="border-b p-[16px] text-[12px]">
              <div>{`No. ${item.a} : ${item.b}`}</div>
              <div>
                <span>{`아이디 : ${item.c} `}</span>
                <span>{`구분 : ${item.d} `}</span>
                <span>{`가입일 : ${item.e}`}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`mt-[10px] grid ${headerCols} border-t border-[#c4c4c4] text-center`}
        >
          {header.map((headerName, idx) => {
            return (
              <div key={idx}>
                <div className="border-b border-[#c4c4c4] py-[10px] text-[14px] font-bold">
                  {headerName}
                </div>
              </div>
            )
          })}
          {data.map((item, idx) => (
            <Fragment key={idx}>
              {Object.keys(item).map((key) => (
                <div className="border-b py-[16px]" key={key}>
                  {item[key]}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      )}
    </>
  )
}
