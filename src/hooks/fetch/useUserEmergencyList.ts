import { useCallback } from 'react'
import { fetchUserHealthList } from '@/services/api/user'
import { useUser } from '../useUser'

interface UserEmergencyList {
  setData: any
  shipId: string
  userIndex: string
  pageNum: string
}

export const useUserEmergencyList = () => {
  const { user } = useUser()

  const getUserHealthList = useCallback(
    async ({ setData, shipId, userIndex, pageNum }: UserEmergencyList) => {
      if (!user) return
      const res = await fetchUserHealthList({
        group_id: user?.group_id.toString(),
        ship_id: shipId,
        user_id: userIndex,
        item_count: '5',
        page_num: pageNum,
        noFilter: true,
      })
      setData(res?.data)
    },
    [user],
  ) // 의존성 배열에 user 추가

  return { getUserHealthList }
}
