import { useCallback, useState } from 'react'
import { fetchCrewMessage } from '@/services/api/user'

export const useCrewMessages = () => {
  const [crewMessages, setCrewMessages] = useState()

  const getCrewMessages = useCallback(
    async ({ ship_id }: { ship_id: string }) => {
      const res = await fetchCrewMessage({
        ship_id: Number(ship_id),
        message_level_name: '일반',
      })
      setCrewMessages(res?.data.data)
    },
    [],
  )

  return { crewMessages, getCrewMessages }
}
