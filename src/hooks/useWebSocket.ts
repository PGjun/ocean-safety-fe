import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import useModalStore from '@/stores/modalStore'

export interface sosData {
  sos_id: number
  message: string
  emergency_code_name: string
}

const useWebSocket = () => {
  const [sendMessage, setSendMessage] = useState<(type: string) => void>(
    () => () => {},
  )

  useEffect(() => {
    const socket = io('ws://jdi-global.com:27777/', {
      path: '/socket_emergency/socket.io',
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5, //최대 재연결 시도 횟수
      reconnectionDelay: 10000, //재연결 시도 간격
    })

    socket.on('enter_room', () => {
      socket.emit('enter_room', {
        group_id: 1,
        ship_id: 2,
        user_id: 2,
        is_admin: false,
      })
    })

    socket.on('emergencyCall', (sosData: sosData) => {
      const modalId = useModalStore
        .getState()
        .openModal('EMERGENCIES', { sosData }, false)

      //   setTimeout(() => {
      //     useModalStore.getState().closeModal(modalId)
      //     console.log('알림 닫음', modalId)
      //   }, 20000)
    })

    // sendMessage 함수를 정의합니다. 서버로 메시지를 보내는 기능을 수행합니다.
    const send = (type: string) => {
      socket.emit('requestModal', type)
    }

    // useState를 통해 설정된 sendMessage 함수를 업데이트합니다.
    setSendMessage(() => send)

    return () => {
      console.log('WebSocket 연결 종료')
      socket.close()
    }
  }, [])

  // 컴포넌트에서 사용할 수 있도록 sendMessage 함수를 반환합니다.
  return { sendMessage }
}

export default useWebSocket
