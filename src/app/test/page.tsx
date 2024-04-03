'use client'

import { useEffect, useState } from 'react'
import Canvas from './Canvas'
import CanvasComponent from './Canvas2'
import GoogleMapWrapper from './GoogleMapWrapper'
// import QrScanner from './QrScanner'

export default function TestPage() {
  const [ws, setWs] = useState<any>(null)

  useEffect(() => {
    const socket: any = new WebSocket('ws://localhost:8080')
    setWs(socket)

    socket.onmessage = (event: any) => {
      console.log('서버로부터 메시지 수신:', event.data)
    }

    return () => {
      socket.close()
    }
  }, [])

  const sendMessage = () => {
    if (ws) {
      ws.send('클라이언트에서 서버로 메시지')
    }
  }

  return (
    <div className="m-[30px]">
      <button onClick={sendMessage}>메시지 보내기</button>
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
