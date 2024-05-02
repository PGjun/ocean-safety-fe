import { useEffect, useState } from 'react'
import { fetchUserSpecificHealth } from '@/services/api/user'
import moment from 'moment'
import LineChart from './Chart'

const tabGroup = [
  {
    tabId: 'tab1',
    tabName: '전체',
  },
  {
    tabId: 'tab2',
    tabName: '심박수',
  },
  {
    tabId: 'tab3',
    tabName: '피부온도',
  },
  {
    tabId: 'tab4',
    tabName: '산소포화도',
  },
]

// 초기 차트 데이터 설정
const initialChartData = {
  labels: [], // X축 레이블
  datasets: [
    {
      label: 'Sample Dataset', // 데이터셋의 레이블
      data: [], // 실제 데이터 포인트
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
}

export const HealthChartDetailTab = ({
  userIndex,
}: {
  userIndex: number | null
}) => {
  const [activeTab, setActiveTab] = useState('tab1')

  const [chartData, setChartData] = useState(initialChartData)

  useEffect(() => {
    if (!userIndex) return
    const getUserSpecificHealthList = async () => {
      const res = await fetchUserSpecificHealth({
        user_id: userIndex,
        search_start_datetime: moment()
          .subtract(24, 'hours')
          .format('YYYY-MM-DD HH:mm:ss'),
        search_end_datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
      })

      if (res?.status === 200) {
        const resData = res.data.data
        const labels = resData.map((item: any) =>
          moment(item.health_date).format('HH:mm'),
        )
        const healthRateData = resData.map((item: any) => item.health_rate)
        const oxygenSaturationData = resData.map((item: any) =>
          Number(item.oxygen_saturation),
        )
        const temperatureData = resData.map((item: any) =>
          Number(item.temperature),
        )

        setChartData({
          labels,
          datasets: [
            {
              label: '심박수',
              data: healthRateData,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
              label: '산소포화도',
              data: oxygenSaturationData,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
              label: '피부온도',
              data: temperatureData,
              borderColor: 'rgb(255, 206, 86)',
              backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
          ],
        })
      }
    }
    getUserSpecificHealthList()
  }, [userIndex])

  const filteredChartData = () => {
    if (activeTab === 'tab1') {
      return chartData
    }
    const dataset = chartData.datasets.find(
      (dataset) =>
        dataset.label ===
        tabGroup.find((tab) => tab.tabId === activeTab)?.tabName,
    )
    return {
      labels: chartData.labels,
      datasets: dataset ? [dataset] : [],
    }
  }

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

      <div className="mt-[6px] h-[150px] border px-[5px] pb-[5px] pt-[10px] md:h-[340px] md:px-[30px] md:pt-[40px]">
        <LineChart chartData={filteredChartData()} />
      </div>
    </>
  )
}
