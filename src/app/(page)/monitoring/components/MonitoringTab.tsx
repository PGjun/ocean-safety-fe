import { Pagination } from '@/components/common/Pagination'
import { Fragment, useState } from 'react'
import { SosMessage } from './SosMessage'
import { HealthInfo } from './HealthInfo'
import { UserOwnEmergencyList } from '@/components/common/UserOwnEmergencyList'

const tabGroup = [
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

export const MonitoringTab = ({
  userHealthList,
  searchParams,
  userIndex,
}: {
  userHealthList: any
  searchParams: any
  userIndex: number | null
}) => {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <>
      <div className="mt-[10px] flex gap-1 overflow-x-auto whitespace-nowrap border-b-[2px] border-[#2262C6] font-bold">
        {tabGroup.map((tab, idx) => {
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
          <div className="mt-[20px] border-t border-[#c4c4c4] text-[14px] md:text-[16px]">
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 위치 lng : 112.13 lat : 122.35
            </div>
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 위치 lng : 112.13 lat : 122.35
            </div>
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 위치 lng : 112.13 lat : 122.35
            </div>
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 위치 lng : 112.13 lat : 122.35
            </div>
            <div className="border-b px-[8px] py-[10px]">
              [ 16:00:00 ] 위치 lng : 112.13 lat : 122.35
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
      {activeTab === 'tab2' && <UserOwnEmergencyList userId={userIndex} />}
      {activeTab === 'tab3' && (
        <HealthInfo
          userHealthList={userHealthList}
          searchParams={searchParams}
        />
      )}
    </>
  )
}
