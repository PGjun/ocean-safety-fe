'use client'

import { useEffect, useState } from 'react'
import Canvas from './Canvas'
import CanvasComponent from './Canvas2'
import GoogleMapWrapper from '../../components/common/GoogleMapWrapper'
import { Location, fetchUserLocationList } from '@/services/api/user'
// import QrScanner from './QrScanner'

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
  const [shipId, setShipId] = useState<number | null>(null)

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

  // const [ws, setWs] = useState<any>(null)

  // useEffect(() => {
  //   const socket: any = new WebSocket('ws://localhost:8080')
  //   setWs(socket)

  //   socket.onmessage = (event: any) => {
  //     console.log('서버로부터 메시지 수신:', event.data)
  //   }

  //   return () => {
  //     socket.close()
  //   }
  // }, [])

  // const sendMessage = () => {
  //   if (ws) {
  //     ws.send('클라이언트에서 서버로 메시지')
  //   }
  // }

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
                .map((item: Location, idx) => (
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
      {/* <button onClick={sendMessage}>메시지 보내기</button> */}
      <div className="mt-[50px]">
        <GoogleMapWrapper />
      </div>
      <div className="mt-[50px]">
        <Canvas />
      </div>
      {/* <div className="mt-[50px] w-[190px]">
        <div>
          <QrScanner />
        </div>
      </div> */}
      <div className="mt-[50px]">
        <CanvasComponent />
      </div>
    </div>
  )
}
