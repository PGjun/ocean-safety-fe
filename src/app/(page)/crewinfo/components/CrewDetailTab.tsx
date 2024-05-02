import { useState } from 'react'
import { CrewInfo } from './CrewInfo'
import { WearableInfo } from './WearableInfo'
import { GroupInfo } from './GroupInfo'
import { UserOwnEmergencyList } from '@/components/common/UserOwnEmergencyList'

const tabGroup = [
  {
    tabId: 'tab1',
    tabName: '승선원내역',
  },
  {
    tabId: 'tab2',
    tabName: '웨어러블 정보',
  },
  {
    tabId: 'tab3',
    tabName: '소속 그룹 정보',
  },
  {
    tabId: 'tab4',
    tabName: 'SOS 내역',
  },
]

export const CrewDetailTab = ({ userId }: { userId: number | null }) => {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <>
      <div className="mt-[10px] flex gap-1 overflow-x-auto whitespace-nowrap border-b-[2px] border-[#2262C6] font-bold">
        {tabGroup.map((tab, idx) => {
          const Default = 'bg-[#F3F5FF] text-[#2262C6]'
          const Active = 'bg-[#2262C6] text-white'
          return (
            <button
              key={idx}
              className={`${activeTab === tab.tabId ? Active : Default} cursor-pointer rounded-t-[8px] px-[26px] py-[10px]`}
              onClick={() => setActiveTab(tab.tabId)}
            >
              {tab.tabName}
            </button>
          )
        })}
      </div>

      {activeTab === 'tab1' && <CrewInfo userId={userId} />}
      {activeTab === 'tab2' && <WearableInfo userId={userId} />}
      {activeTab === 'tab3' && <GroupInfo userId={userId} />}
      {activeTab === 'tab4' && <UserOwnEmergencyList userId={userId} />}
    </>
  )
}
