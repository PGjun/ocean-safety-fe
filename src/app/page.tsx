'use client'

import { CrewFall } from '@/components/main/CrewFall'
import { CrewHealthInfo } from '@/components/main/CrewHealthInfo'
import { CrewSos } from '@/components/main/CrewSos'
import { CrewStatus } from '@/components/main/CrewStatus'
import { useState } from 'react'

export default function Home() {
  const [selectedDrop, setSelectedDrop] = useState<{
    value: string
    label: string
  } | null>(null)
  return (
    <main className="grid gap-[56px] md:mx-[40px] md:grid-cols-2">
      <CrewStatus
        selectedDrop={selectedDrop}
        setSelectedDrop={setSelectedDrop}
      />
      <CrewHealthInfo selectedShipId={selectedDrop?.value} />
      <CrewSos title="SOS 내역" type="SOS" />
      <CrewSos title="낙상감지 내역" type="낙상" />
    </main>
  )
}
