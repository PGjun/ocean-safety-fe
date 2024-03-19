import { useState, useEffect } from 'react'

// 미디어 쿼리를 인자로 받아 해당 쿼리에 맞는지 여부를 반환하는 훅
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)

    // 첫 마운트 시 상태 설정
    setMatches(media.matches)

    // 이벤트 리스너 등록
    media.addEventListener('change', listener)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
