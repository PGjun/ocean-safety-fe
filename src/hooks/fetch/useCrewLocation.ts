import { useCallback, useState } from 'react'
import { fetchCrewLocation } from '@/services/api/user'

export const useCrewLocation = () => {
  const [shipId, setShipId] = useState<string>()

  const getCrewLocation = useCallback(
    async ({ setData }: { setData: any }) => {
      if (!shipId) return
      const res = await fetchCrewLocation({ ship_id: Number(shipId) })
      setData(res?.data.data)
    },
    [shipId],
  )

  return { getCrewLocation, setShipId }
}
