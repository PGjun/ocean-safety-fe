import { useCallback, useState } from 'react'
import { fetchShipInfo } from '@/services/api/user'
import { useUser } from '../useUser'
import { ShipInfoData } from '@/types/responseData'

export const useShipInfo = () => {
  const { user } = useUser()

  const [shipInfo, setShipInfo] = useState<ShipInfoData>()

  const getShipInfo = useCallback(
    async ({ ship_id }: { ship_id: string }) => {
      if (!user) return
      const res = await fetchShipInfo(Number(ship_id))
      setShipInfo(res?.data)
    },
    [user],
  ) // 의존성 배열에 user 추가

  return { shipInfo, getShipInfo }
}
