import { useCallback, useEffect, useState } from 'react'
import { fetchShipNameList } from '@/services/api/user'
import { useUser } from '../useUser'
import { DropItem } from '@/types/common'

//이건 독립적으로 사용되야 함 user가 매 요청마다 호출되니 때문
export const useShipNames = () => {
  const { user } = useUser()
  const [shipNames, setShipNames] = useState<DropItem[]>()
  const [preGroupId, setPreGroupId] = useState('')

  const getShipNames = useCallback(
    async (groupId?: string) => {
      //user값이 없으면 종료
      if (!user) return
      //group_id값이 있으면 preGroupId값에 업데이트
      if (groupId) {
        setPreGroupId(groupId)
      }
      //전달 받은 groupId가 없고 이전 호출에 저장된 preGroupId가 있으면 종료
      //전달 받은 groupId가 있으면 실행됨
      if (!groupId && preGroupId) {
        return
      }
      const res = await fetchShipNameList({
        group_id: groupId ? groupId : user.group_id.toString(),
      })
      const resData = res?.data.data.map(
        (item: { ship_id: number; ship_name: string }) => ({
          value: item.ship_id.toString(),
          label: item.ship_name,
        }),
      )
      setShipNames(resData)
    },
    [user],
  )

  return { shipNames, getShipNames }
}
