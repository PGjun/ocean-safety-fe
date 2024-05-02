import { useCallback, useState } from 'react'
import { fetchCrewLocation } from '@/services/api/user'

export const useCrewLocations = () => {
  const [crewLocations, setCrewLocations] = useState<{ [key: string]: any }[]>()

  const getCrewLocations = useCallback(
    async ({ ship_id }: { ship_id: string }) => {
      const res = await fetchCrewLocation({ ship_id: Number(ship_id) })
      setCrewLocations(res?.data.data)
    },
    [],
  )

  return { crewLocations, getCrewLocations }
}
