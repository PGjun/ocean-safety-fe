import { fetchBeacons } from '@/services/api/user'
import { useCallback, useState } from 'react'

export const useBeacons = () => {
  const [beacons, setBeacons] = useState<{ [key: string]: any }[]>()

  const getBeacons = useCallback(async ({ ship_id }: { ship_id: number }) => {
    const res = await fetchBeacons({ ship_id: Number(ship_id) })
    setBeacons(res?.data.data)
  }, [])

  return { beacons, getBeacons }
}
