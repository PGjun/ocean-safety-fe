'use client'

import { CrewHealthInfo } from '@/components/main/CrewHealthInfo'
import { CrewSosFall } from '@/components/main/CrewSosFall'
import { CrewStatus } from '@/components/main/CrewStatus'
import { useGroupShipDropDown } from '@/hooks/useGroupShipDropDown'

export default function Home() {
  const { groupId, shipId, DropDownFC } = useGroupShipDropDown('preload')

  return (
    <main className="md:mx-[40px]">
      <div className="flex flex-wrap items-center gap-[10px]">
        <DropDownFC.GroupMain />
        <DropDownFC.ShipMain />
      </div>
      <div className="mt-[10px] grid gap-[56px] md:grid-cols-2">
        <CrewStatus />
        <CrewHealthInfo groupId={groupId} shipId={shipId} />
        <CrewSosFall
          groupId={groupId}
          shipId={shipId}
          title="SOS 내역"
          type="SOS"
        />
        <CrewSosFall
          groupId={groupId}
          shipId={shipId}
          title="낙상감지 내역"
          type="낙상"
        />
      </div>
    </main>
  )
}
