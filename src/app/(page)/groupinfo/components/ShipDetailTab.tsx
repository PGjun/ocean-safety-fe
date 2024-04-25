import { useState } from 'react'
import { ShipDetail } from './ShipDetail'
import { WearableList } from './WearableList'

const tabGroup = [
  {
    tabId: 'tab1',
    tabName: '선박 정보',
  },
  {
    tabId: 'tab2',
    tabName: '웨어러블 기기',
  },
]

export const ShipDetailTab = ({ shipId }: { shipId: number | null }) => {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <>
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

        {activeTab === 'tab1' && <ShipDetail shipId={shipId} />}
        {activeTab === 'tab2' && <WearableList shipId={shipId} />}
      </>
    </>
  )
}
