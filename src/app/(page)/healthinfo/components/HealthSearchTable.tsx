import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { UserHealth, fetchUserHealthList } from '@/services/api/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const COLTITLES = [
  'No',
  '이름',
  '아이디',
  '심박수',
  '혈압',
  '체온',
  '산소포화도',
  '기록 일시',
]

export const HealthSearchTable = () => {
  const isMobile = useMediaQuery('768')

  const [healthList, setHealthList] = useState([])
  const [shipId, setShipId] = useState<number | null>(null)

  useEffect(() => {
    const fetchHealthList = async () => {
      const res = await fetchUserHealthList(2)
      if (res?.status === 200) {
        setHealthList(res.data)
        console.log(res.data)
      }
    }

    // 함수를 즉시 실행한 다음, 5초마다 반복 실행합니다.
    fetchHealthList()
    const intervalId = setInterval(fetchHealthList, 5000)

    // 컴포넌트가 언마운트될 때 실행될 클린업 함수입니다.
    // setInterval에 의해 설정된 타이머를 해제합니다.
    return () => clearInterval(intervalId)
  }, [])
  return (
    <div className="flex-1">
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {healthList &&
            healthList
              .slice(-20)
              .reverse()
              .map((item: UserHealth, idx) => (
                <Link key={idx} href={PATHS.SOS_DETAIL}>
                  <div className="border-b p-[8px] text-[12px]">
                    <div>
                      No. {idx + 1} 이름 : {item.name}
                    </div>
                    <div>
                      심박수 : {item.health_rate} 혈압 : {item.blood_pressure}{' '}
                      체온 : {item.temperature} 산소포화도 :{' '}
                      {item.oxygen_saturation}
                    </div>
                    <div>기록일시 : {item.health_date}</div>
                  </div>
                </Link>
              ))}
        </div>
      ) : (
        <table className="mt-[10px] w-full table-fixed border-collapse text-center">
          <thead>
            <tr>
              {COLTITLES.map((item, idx) => (
                <th
                  key={idx}
                  className="border-y border-[#c4c4c4] py-[10px] text-[14px] font-bold"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {healthList &&
              healthList
                .slice(-20)
                .reverse()
                .map((item: UserHealth, idx) => (
                  <tr
                    key={idx}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => {
                      return setShipId(item.id)
                    }}
                  >
                    <td className="border-b py-[16px]">{idx + 1}</td>
                    <td className="border-b py-[16px]">{item.name}</td>
                    <td className="border-b py-[16px]">{item.user_id ?? ''}</td>
                    <td className="border-b py-[16px]">
                      {item.health_rate ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.blood_pressure ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.temperature ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.oxygen_saturation ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.health_date ?? ''}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={() => {
            return '/'
          }}
        />
      </div>
    </div>
  )
}
