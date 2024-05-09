import { useCallback, useState } from 'react'
import { fetchShipInfo } from '@/services/api/user'
import { ShipInfoData } from '@/types/responseData'

export const useShipInfo = () => {
  const [shipInfo, setShipInfo] = useState<ShipInfoData>()

  const getShipInfo = useCallback(async ({ ship_id }: { ship_id: string }) => {
    const res = await fetchShipInfo(Number(ship_id))
    setShipInfo(res?.data)
  }, []) // 의존성 배열에 user 추가

  return { shipInfo, getShipInfo }
}
