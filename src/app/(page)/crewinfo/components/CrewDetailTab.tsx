import { useState } from 'react'
import { CrewDetail } from './CrewDetail'
import { WearableInfo } from './WearableInfo'
import { AreaSettings } from './AreaSettings'
import { GroupInfo } from './GroupInfo'
import { SosInfo } from './SosInfo'
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
  // {
  //   tabId: 'tab3',
  //   tabName: '제한구역 설정',
  // },
  {
    tabId: 'tab4',
    tabName: '소속 그룹 정보',
  },
  {
    tabId: 'tab5',
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

      {activeTab === 'tab1' && <CrewDetail userId={userId} />}
      {activeTab === 'tab2' && <WearableInfo userId={userId} />}
      {/* {activeTab === 'tab3' && <AreaSettings />} */}
      {activeTab === 'tab4' && <GroupInfo />}
      {activeTab === 'tab5' && <UserOwnEmergencyList userId={userId} />}
    </>
  )
}
