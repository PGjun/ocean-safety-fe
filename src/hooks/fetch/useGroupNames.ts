import { useCallback, useState } from 'react'
import { DropItem } from '@/types/common'
import { fetchGroupNameList } from '@/services/api/user'

export const useGroupNames = () => {
  const [groupNames, setGroupNames] = useState<DropItem[]>()

  const getGroupNames = useCallback(async () => {
    const res = await fetchGroupNameList()

    setGroupNames(
      res?.data.data.map((item: { id: number; group_name: string }) => ({
        value: item.id.toString(),
        label: item.group_name,
      })),
    )
  }, [])

  return { groupNames, getGroupNames }
}
