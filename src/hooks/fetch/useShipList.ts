import { useCallback } from 'react'
import { fetchShipNameList } from '@/services/api/user'
import { useUser } from '../useUser'

export const useShipList = () => {
  const { user } = useUser()

  const getShipList = useCallback(
    async ({ setShips }: { setShips: any }) => {
      if (!user) return
      const res = await fetchShipNameList({
        group_id: user?.group_id.toString(),
      })
      setShips(
        res?.data.data.map((item: any) => ({
          value: item.ship_id,
          label: item.ship_name,
        })),
      )
    },
    [user],
  ) // 의존성 배열에 user 추가

  return { getShipList }
}
