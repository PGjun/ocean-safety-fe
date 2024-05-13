import { useCallback, useState } from 'react'
import { fetchCrewMessage } from '@/services/api/user'

export const useCrewMessages = () => {
  const [crewMessages, setCrewMessages] = useState()

  const getCrewMessages = useCallback(
    async ({ ship_id, userIndex }: { ship_id: string; userIndex: string }) => {
      const res = await fetchCrewMessage({
        ship_id: Number(ship_id),
        user_index: userIndex,
        message_level_name: '일반',
      })
      setCrewMessages(res?.data.data)
    },
    [],
  )

  return { crewMessages, getCrewMessages }
}
