import { useCallback, useState } from 'react'
import { fetchUserHealthList } from '@/services/api/user'
import { useUser } from '../useUser'

interface UserHealthList {
  shipId: string
  userIndex: string
  pageNum: string
}

export const useUserHealthList = () => {
  const { user } = useUser()
  const [userHealthList, setUserHealthList] = useState()

  const getUserHealthList = useCallback(
    async ({ shipId, userIndex, pageNum }: UserHealthList) => {
      if (!user) return
      const res = await fetchUserHealthList({
        group_id: user?.group_id.toString(),
        ship_id: shipId,
        user_id: userIndex,
        item_count: '5',
        page_num: pageNum,
        noFilter: true,
      })
      setUserHealthList(res?.data)
    },
    [user],
  ) // 의존성 배열에 user 추가

  return { userHealthList, getUserHealthList }
}
