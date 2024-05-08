import { fetchRestrictAreas } from '@/services/api/user'
import { useCallback, useState } from 'react'

export const useRestrictAreas = () => {
  const [restricts, setRestricts] = useState<{ [key: string]: any }[]>()

  const getRestrictAreas = useCallback(
    async ({ ship_id }: { ship_id: number }) => {
      const res = await fetchRestrictAreas({ ship_id: Number(ship_id) })
      setRestricts(res?.data.data)
    },
    [],
  )

  return { restricts, getRestrictAreas }
}
