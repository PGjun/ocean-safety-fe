import { useCallback } from 'react'
import { fetchUserNameList } from '@/services/api/user'
import { useUser } from '../useUser'

export const useUserList = () => {
  const { user } = useUser()

  const getUserList = useCallback(
    async ({ ship_id, setUsers }: { ship_id: string; setUsers: any }) => {
      if (!user) return
      const res = await fetchUserNameList({
        group_id: user?.group_id,
        ship_id: Number(ship_id),
      })
      setUsers(
        res?.data.data.map((item: any) => ({
          value: item.user_index,
          label: item.name,
        })),
      )
    },
    [user],
  ) // 의존성 배열에 user 추가

  return { getUserList }
}
