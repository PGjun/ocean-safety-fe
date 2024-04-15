import { CrewFall } from '@/components/main/CrewFall'
import { CrewHealthInfo } from '@/components/main/CrewHealthInfo'
import { CrewSos } from '@/components/main/CrewSos'
import { CrewStatus } from '@/components/main/CrewStatus'

export default function Home() {
  return (
    <main className="grid gap-[56px] md:mx-[40px] md:grid-cols-2">
      <CrewStatus />
      <CrewHealthInfo />
      <CrewSos />
      <CrewFall />
    </main>
  )
}
