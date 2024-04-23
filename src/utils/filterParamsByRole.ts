import { roles } from '@/constants/roles'
import { getSession } from 'next-auth/react'

// 파라미터 필터 함수 정의
export const filterParamsByRole = async ({ params }: { params: any }) => {
  //getSession으로 유저정보를 가져와서 권한 필터링
  const session: any = await getSession()
  if (!session?.user) return params // 세션 또는 사용자 정보가 없으면 기본 파라미터 반환

  const role = roles[session.user.crew_level]
  console.log('🚀 ~ filterParamsByRole ~ role:', role)
  const newParams = { ...params }

  // 'C' 또는 'D' 권한이 아닌 경우 ship_id 제거
  if (role !== 'C' && role !== 'D') {
    delete newParams.ship_id
  }
  // 'D' 권한이 아닌 경우 user_id 제거
  if (role !== 'D') {
    delete newParams.user_id
  }
  return newParams
}
