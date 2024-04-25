import { useCallback } from 'react'
import { fetchShipInfo } from '@/services/api/user'
import { useUser } from '../useUser'

export const useShipInfo = () => {
  const { user } = useUser()

  const getShipInfo = useCallback(
    async ({ ship_id, setData }: { ship_id: string; setData: any }) => {
      if (!user) return
      const res = await fetchShipInfo(Number(ship_id))
      setData(res?.data)
    },
    [user],
  ) // 의존성 배열에 user 추가

  return { getShipInfo }
}
