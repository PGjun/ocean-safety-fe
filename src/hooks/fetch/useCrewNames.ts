import { useCallback, useState } from 'react'
import { fetchUserNameList } from '@/services/api/user'
import { useUser } from '../useUser'
import { DropItem } from '@/types/common'

export const useCrewNames = () => {
  const { user } = useUser()

  const [crewNames, setCrewNames] = useState<DropItem[]>()

  const getCrewNames = useCallback(
    async ({ ship_id }: { ship_id: string }) => {
      if (!user) return
      const res = await fetchUserNameList({
        group_id: user?.group_id,
        ship_id: Number(ship_id),
      })
      setCrewNames(
        res?.data.data.map((item: { user_index: number; name: string }) => ({
          value: item.user_index.toString(),
          label: item.name,
        })),
      )
    },
    [user],
  ) // 의존성 배열에 user 추가

  return { crewNames, getCrewNames }
}
