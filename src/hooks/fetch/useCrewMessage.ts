import { useCallback, useState } from 'react'
import { fetchCrewMessage } from '@/services/api/user'

export const useCrewMessage = () => {
  const [shipId, setShipId] = useState<string>()

  const getCrewMessage = useCallback(
    async ({ setData }: { setData: any }) => {
      if (!shipId) return
      const res = await fetchCrewMessage({
        ship_id: Number(shipId),
        message_level_name: '일반',
      })
      setData(res?.data.data)
    },
    [shipId],
  )

  return { getCrewMessage, setShipId }
}
