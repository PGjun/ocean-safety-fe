/**
 * 객체의 키-값 쌍을 FormData 객체에 추가하는 함수
 * @param params - 키-값 쌍을 포함한 객체
 * @param excludeKeys - FormData에 추가하지 않을 키 목록
 * @returns 데이터가 추가된 FormData 객체
 */
export const convertFormData = ({
  params,
  excludeKeys = [],
}: {
  params: { [key: string]: any }
  excludeKeys: string[]
}): FormData => {
  const formData = new FormData()

  // 객체의 각 키-값 쌍을 순회하며 FormData에 추가
  Object.entries(params).forEach(([key, value]) => {
    // 제외할 키 목록에 없고, 값이 undefined가 아닌 경우만 추가
    if (value !== undefined && !excludeKeys.includes(key)) {
      formData.append(key, value)
    }
  })

  return formData
}
