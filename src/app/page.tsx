import { CrewFall } from '@/components/main/CrewFall'
import { CrewHealthInfo } from '@/components/main/CrewHealthInfo'
import { CrewSos } from '@/components/main/CrewSos'
import { CrewStatus } from '@/components/main/CrewStatus'

export default function Home() {
  return (
    <main className="m-auto mb-[100px] mt-[32px] flex justify-center md:mx-[40px]">
      <div className="grid w-[310px] gap-[32px] md:w-[1360px] md:grid-cols-2">
        <CrewStatus />
        <CrewHealthInfo />
        <CrewSos />
        <CrewFall />
      </div>
    </main>
  )
}
