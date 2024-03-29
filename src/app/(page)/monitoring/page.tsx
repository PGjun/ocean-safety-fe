'use client'

import { Fragment, useState } from 'react'

const TabGroup = [
  {
    tabId: 'tab1',
    tabName: '일반메시지',
  },
  {
    tabId: 'tab2',
    tabName: '응급메시지',
  },
  {
    tabId: 'tab3',
    tabName: '건강정보',
  },
]

const MonitoringTab = () => {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <>
      <div className="mt-[10px] flex gap-1 overflow-x-auto whitespace-nowrap border-b-[2px] border-[#2262C6] font-bold">
        {TabGroup.map((tab, idx) => {
          const Default = 'bg-[#F3F5FF] text-[#2262C6]'
          const Active = 'bg-[#2262C6] text-white'
          return (
            <Fragment key={idx}>
              <button
                key={idx}
                className={`${activeTab === tab.tabId ? Active : Default} cursor-pointer rounded-t-[8px] px-[26px] py-[10px]`}
                onClick={() => setActiveTab(tab.tabId)}
              >
                {tab.tabName}
              </button>
            </Fragment>
          )
        })}
      </div>

      {activeTab === 'tab1' && <div>일반메시지</div>}
      {activeTab === 'tab2' && <div>응급메시지</div>}
      {activeTab === 'tab3' && <div>건강정보</div>}
    </>
  )
}

export default function MonitoringPage() {
  return (
    <div className="mb-[100px] mt-[32px] flex justify-center md:mx-[40px]">
      <div className="w-[310px] gap-[32px] md:w-[1100px]">
        <div className="text-[22px] font-bold md:text-[26px]">
          선내 위치 모니터링
        </div>
        <div className="mt-[32px] text-[18px] font-bold md:text-[20px]">
          모니터링 기록
        </div>
        <div className="mt-[20px]">
          <MonitoringTab />
        </div>
      </div>
    </div>
  )
}
