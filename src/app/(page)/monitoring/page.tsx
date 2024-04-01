'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { SosMessage } from './components/SosMessage'
import { HealthInfo } from './components/HealthInfo'
import { Pagination } from '@/components/common/Pagination'

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

      {activeTab === 'tab1' && (
        <div>
          <div className="mt-[26px] border-t border-[#888888] text-[12px] md:text-[14px]">
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 출근 완료
            </div>
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 출근 완료
            </div>
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 출근 완료
            </div>
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 출근 완료
            </div>
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 출근 완료
            </div>
          </div>
          <div className="mt-[20px] flex w-full justify-center">
            <Pagination
              path={() => {
                return '/'
              }}
            />
          </div>
        </div>
      )}
      {activeTab === 'tab2' && <SosMessage />}
      {activeTab === 'tab3' && <HealthInfo />}
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
        <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
          <span className="text-[14px] md:text-[16px]">선박 선택</span>
          <div className="flex w-full rounded border border-[#C4C4C4] md:w-[300px]">
            <button className="border-r border-[#C4C4C4] px-[13px]">{`<`}</button>
            <div className="flex-1 px-[90px] py-[10px] text-[12px] md:text-[14px]">
              강원호
            </div>
            <button className="border-l border-[#C4C4C4] px-[13px]">{`>`}</button>
          </div>
        </div>
        <div className="mt-[10px]">
          <Image
            src="/temp-ship.png"
            alt="tempship"
            width={1100}
            height={200}
            style={{ objectFit: 'fill' }}
          />
        </div>
        <div className="mt-[32px] flex flex-col justify-between md:flex-row md:items-center">
          <div className="text-[18px] font-bold md:text-[20px]">
            모니터링 기록
          </div>
          <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
            <span className="text-[14px] md:text-[16px]">승선원 선택</span>
            <div className="flex w-full rounded border border-[#C4C4C4] md:w-[300px]">
              <button className="border-r border-[#C4C4C4] px-[13px]">{`<`}</button>
              <div className="flex-1 px-[90px] py-[10px] text-[12px] md:text-[14px]">
                김김김
              </div>
              <button className="border-l border-[#C4C4C4] px-[13px]">{`>`}</button>
            </div>
          </div>
        </div>
        <div className="mt-[20px]">
          <MonitoringTab />
        </div>
      </div>
    </div>
  )
}
