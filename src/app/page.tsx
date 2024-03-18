import { CrewFall } from '@/components/main/CrewFall'
import { CrewHealthInfo } from '@/components/main/CrewHealthInfo'
import { CrewSos } from '@/components/main/CrewSos'
import { CrewStatus } from '@/components/main/CrewStatus'

export default function Home() {
  return (
    <main className="m-auto mt-[32px] flex justify-center">
      <div className="m-[16px] grid h-screen gap-[32px] md:w-[1360px] md:grid-cols-2 ">
        <CrewStatus />
        <CrewHealthInfo />
        <CrewSos />
        <CrewFall />
      </div>
    </main>
  )
}
