// modalComponents.js

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CommonIcon } from '../SvgIcons'
import Link from 'next/link'
import { PATHS } from '@/constants/paths'
import { useEffect } from 'react'
import { sosData } from '@/hooks/useWebSocket'

export type ModalType = 'EMERGENCIES' | 'ALERT2'

const EmerType: { [key: string]: any } = {
  SOS: { IconComponent: CommonIcon.SosAlarm },
  FALL: { IconComponent: CommonIcon.FallAlarm },
}

const Emergencies = ({
  sosData,
  closeModal = () => {},
}: {
  sosData: sosData
  closeModal: () => void
}) => {
  const isMobile = useMediaQuery('768')

  let size = '156'
  if (isMobile) {
    size = '96'
  }

  const EmerImg = EmerType['SOS'].IconComponent

  useEffect(() => {
    const sound = new Audio('/sounds/emergency-alarm.mp3')
    sound
      .play()
      .then(() => {
        // 재생이 성공적으로 시작된 후, 타이머 설정
        const timer = setTimeout(() => {
          sound.pause()
          sound.currentTime = 0
        }, 3000) // 3초 후 정지

        // 컴포넌트 언마운트 시 타이머와 오디오 정리
        return () => {
          clearTimeout(timer)
          sound.pause()
          sound.currentTime = 0
        }
      })
      .catch((error) => {
        console.log('오디오 재생 실패:', error)
      })
  }, [])

  return (
    <div className="relative flex flex-col items-center rounded-[12px] bg-white p-[15px] md:p-[56px]">
      <EmerImg size={size} />
      <button onClick={closeModal} className="absolute right-[10px] top-[3px]">
        x
      </button>
      <div className="mt-[20px]">{sosData.message}</div>
      <div className="mt-[28px] flex justify-center gap-[5px]">
        <button
          onClick={closeModal}
          className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[22px] py-[15px] text-[14px] font-bold md:px-[36px] md:py-[15px]"
        >
          취소
        </button>
        <Link href={PATHS.SOS_DETAIL({ sos_id: sosData.sos_id.toString() })}>
          <button
            onClick={closeModal}
            className="flex-1 rounded border border-[#333333] bg-[#333333] px-[60px] py-[15px] text-[14px] font-bold text-white md:px-[80px]"
          >
            상세보기
          </button>
        </Link>
      </div>
    </div>
  )
}

const TestAlert2 = ({ message = '중첩테스트', closeModal = () => {} }) => {
  return (
    <div>
      <button onClick={closeModal}>x</button>
      {message}
    </div>
  )
}

const modalComponents: { [key: string]: any } = {
  EMERGENCIES: Emergencies,
  ALERT2: TestAlert2,
}

export default modalComponents
