import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const data = {
  labels: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  datasets: [
    {
      label: '심박수',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '혈압',
      data: [120, 115, 100, 105, 110, 115, 120],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: '체온',
      data: [36.5, 37, 37.5, 37, 36.5, 37, 36.8],
      borderColor: 'rgb(255, 206, 86)',
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
    },
    {
      label: '산소포화도',
      data: [98, 97, 96, 99, 95, 95, 97],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
}

const options = {
  plugins: {
    legend: {
      position: 'bottom' as const, // 범례를 아래쪽에 배치
    },
  },

  scales: {
    y: {
      beginAtZero: true,
    },
    x: {
      grid: {
        display: false, // X축의 그리드 라인 제거
      },
    },
  },
  elements: {
    // line: {
    //   tension: 0.4, // 선의 곡률 조정
    // },
    point: {
      radius: 5, // 데이터 포인트의 크기 조정
    },
  },
  maintainAspectRatio: false, // 반응형 비율 유지 비활성화

  onResize: function (chart: any, size: any) {
    // 화면 크기에 따라 범례의 표시 여부를 결정합니다.
    chart.options.plugins.legend.display = size.width >= 600
    chart.update() // 차트를 업데이트하여 변경사항을 반영합니다.
  },
}

const LineChartExample = ({ chartData }: { chartData: any }) => (
  <div className="h-full w-full">
    <Line data={chartData} options={options} />
  </div>
)

export default LineChartExample
