'use client'

import { useEffect, useState } from 'react'
import GoogleMapWrapper from '../../components/common/GoogleMapWrapper'
import { fetchUserLocationList } from '@/services/api/user'
import { LocationData } from '@/types/responseData'

const COLTITLES = [
  'No',
  '이름',
  '아이디',
  'Mac address',
  'rssi 값',
  '스캔 타임',
]

export default function TestPage() {
  const [locationList, setLocationList] = useState([])

  useEffect(() => {
    const fetchLocationList = async () => {
      const res = await fetchUserLocationList(2)
      if (res?.status === 200) {
        setLocationList(res.data)
        console.log(res.data)
      }
    }
    fetchLocationList()
  }, [])

  return (
    <div className="m-[30px]">
      <div>
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
            {locationList &&
              locationList
                .slice(-20)
                .reverse()
                .map((item: LocationData, idx) => (
                  <tr key={idx} className="cursor-pointer hover:bg-slate-50">
                    <td className="border-b py-[16px]">{idx + 1}</td>
                    <td className="border-b py-[16px]">{item.name}</td>
                    <td className="border-b py-[16px]">{item.user_id ?? ''}</td>
                    <td className="border-b py-[16px]">
                      {item.beacon_uuid ?? ''}
                    </td>
                    <td className="border-b py-[16px]">{item.rssi ?? ''}</td>
                    <td className="border-b py-[16px]">
                      {item.scan_time ?? ''}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="mt-[50px]">
        <GoogleMapWrapper />
      </div>
    </div>
  )
}
