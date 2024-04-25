import { useCallback, useState } from 'react'
import { fetchCrewLocation } from '@/services/api/user'
import { useUser } from '../useUser'

export const useCrewLocation = () => {
  //   const { user } = useUser()

  const [shipId, setShipId] = useState<string>()

  const getCrewLocation = useCallback(
    async ({ setData }: { setData: any }) => {
      if (!shipId) return
      //   if (!user) return
      const res = await fetchCrewLocation({ ship_id: Number(shipId) })
      setData(res?.data.data)
    },
    [shipId],
  ) // 의존성 배열에 user 추가

  return { getCrewLocation, setShipId }
}
