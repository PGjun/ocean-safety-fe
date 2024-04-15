export const getQueryString = (params: { [key: string]: any }) => {
  const searchParams = new URLSearchParams()

  // params 객체의 모든 키와 값을 URLSearchParams에 추가
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      // undefined 값은 추가하지 않음
      searchParams.append(key, value.toString())
    }
  })

  return searchParams
}
