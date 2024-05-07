import { useCallback, useState } from 'react'
import { fetchShipNameList } from '@/services/api/user'
import { useUser } from '../useUser'
import { DropItem } from '@/types/common'

export const useShipNames = () => {
  const { user } = useUser()
  const [shipNames, setShipNames] = useState<DropItem[]>()

  //todo group_id가 선택되어야만 호출 할 수 있게 변경 필요, user 제거
  const getShipNames = useCallback(
    async (group_id?: string) => {
      if (!user) return
      const res = await fetchShipNameList({
        group_id: group_id ? group_id : user?.group_id.toString(),
      })

      setShipNames(
        res?.data.data.map((item: { ship_id: number; ship_name: string }) => ({
          value: item.ship_id.toString(),
          label: item.ship_name,
        })),
      )
    },
    [user],
  )

  return { shipNames, getShipNames }
}