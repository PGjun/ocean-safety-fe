'use client'

import { useRouter } from 'next/navigation'
import { Arrow } from '../SvgIcons'
import { useEffect } from 'react'

export const MultiPagination = ({
  path,
  totalPage = 1,
  page_num = '1',
  searchParams,
  pageName,
}: {
  path: (params: { [key: string]: string }) => string
  totalPage?: number
  page_num: string
  searchParams: any
  pageName: 's_page_num' | 'h_page_num'
}) => {
  const router = useRouter()

  //todo 페이지 새로고침 임시처리
  useEffect(() => {
    router.push(path({ ...searchParams, [pageName]: '1' }))
  }, [totalPage])

  const selected = `rounded-lg bg-[#F3F5FF] font-bold text-[#2262C6] text-[10px] md:text-[16px]`
  const hover = `hover:font-bold hover:text-[#2262C6] text-[10px] md:text-[16px]`
  const btnSize = `h-[20px] md:h-[40px] w-[20px] md:w-[40px]`

  const page = parseInt(page_num)
  // 전체 페이지 수 계산
  const total = Math.floor(totalPage)

  const handlePageClick = (number: number) => {
    const nextPage = number.toString()
    router.push(path({ ...searchParams, [pageName]: nextPage }))
  }

  // 페이지네이션 로직
  const renderPagination = () => {
    let items = []

    if (total <= 5) {
      // 전체 페이지 수가 5 이하인 경우 모든 페이지 번호를 표시합니다.
      for (let number = 1; number <= total; number++) {
        items.push(
          <button
            key={number}
            className={`${number === page ? selected : hover} ${btnSize}`}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </button>,
        )
      }
    } else {
      let leftSide = Math.max(1, page - 2) // 시작 페이지는 항상 1 이상
      let rightSide = Math.min(total, page + 2) // 끝 페이지는 항상 total 이하

      // 현재 페이지가 1, 2, 3인 경우
      if (page <= 4) {
        rightSide = 5 // 1부터 5까지 보여줍니다.
      }
      // 현재 페이지가 마지막 3개인 경우
      else if (page > total - 4) {
        leftSide = total - 4 // 마지막 5개를 보여줍니다.
      }

      // 앞에 '...'를 추가할 필요가 있는지 결정합니다.
      if (leftSide > 1) {
        items.push(
          <button
            key="1"
            className={`${hover} ${btnSize}`}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>,
        )
        // '...' 추가
        if (leftSide > 2) {
          items.push(<span key="left-ellipsis">...</span>)
        }
      }

      // 현재 페이지 범위의 페이지 버튼들
      for (let number = leftSide; number <= rightSide; number++) {
        items.push(
          <button
            key={number}
            className={`${number === page ? selected : hover} ${btnSize}`}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </button>,
        )
      }

      // 뒤에 '...'를 추가할 필요가 있는지 결정합니다.
      if (rightSide < total) {
        // '...' 추가
        if (rightSide < total - 1) {
          items.push(<span key="right-ellipsis">...</span>)
        }
        items.push(
          <button
            key={total}
            className={`${hover} ${btnSize}`}
            onClick={() => handlePageClick(total)}
          >
            {total}
          </button>,
        )
      }
    }
    return items
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handlePageClick(page - 1)}
        disabled={page === 1}
        className={`${page === 1 ? 'text-#A3A3A3' : 'text-#333333'} flex items-center gap-3 text-[10px] md:text-[16px]`}
      >
        <Arrow color={page === 1 ? '#A3A3A3' : '#333333'} />
        <span className={page === 1 ? 'text-[#A3A3A3]' : 'text-[#333333]'}>
          이전
        </span>
      </button>
      {renderPagination()}
      <button
        onClick={() => handlePageClick(page + 1)}
        disabled={page === total}
        className={`${page === total ? 'text-#A3A3A3' : 'text-#333333'} flex items-center gap-3 text-[10px] md:text-[16px]`}
      >
        <span className={page === total ? 'text-[#A3A3A3]' : 'text-[#333333]'}>
          다음
        </span>
        <Arrow color={page === total ? '#A3A3A3' : '#333333'} rotate />
      </button>
    </div>
  )
}
