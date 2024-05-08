export const formatPhoneNumber = (value: string) => {
  if (!value) return value

  // 숫자만 추출
  const phoneNumber = value.replace(/[^\d]/g, '')

  // 숫자 길이에 따라 포맷 조정
  if (phoneNumber.length < 4) return phoneNumber
  if (phoneNumber.length < 8)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`
}
