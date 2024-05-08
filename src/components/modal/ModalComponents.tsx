// modalComponents.js

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CommonIcon } from '../SvgIcons'
import Link from 'next/link'
import { PATHS } from '@/constants/paths'
import { useEffect, useState } from 'react'
import { sosData } from '@/hooks/useWebSocket'
import { fetchUserSpecificEmergency, postAddGroup } from '@/services/api/user'

export type ModalType = 'EMERGENCIES' | 'GROUP_ADD'

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
  console.log('🚀 ~ sosData:', sosData)
  const isMobile = useMediaQuery('768')

  let size = '156'
  if (isMobile) {
    size = '96'
  }

  const SosImg = EmerType['SOS'].IconComponent
  const FallImg = EmerType['FALL'].IconComponent

  const [emer, setEmer] = useState({
    ship_name: '',
    name: '',
    user_id: '',
    latitude: 0,
    longitude: 0,
  })

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

    const getEmer = async () => {
      const res = await fetchUserSpecificEmergency(sosData.sos_id)
      setEmer(res?.data.data[0])
    }
    if (sosData.sos_id) {
      getEmer()
    }
  }, [sosData])
  console.log(emer)

  return (
    <div className="relative flex flex-col items-center rounded-[12px] bg-white p-[15px] md:p-[56px]">
      {sosData && sosData.emergency_code_name === 'SOS' ? (
        <SosImg size={size} />
      ) : (
        <FallImg size={size} />
      )}
      <button onClick={closeModal} className="absolute right-[10px] top-[3px]">
        x
      </button>
      <div className="mt-[20px]">
        {emer && (
          <div className="flex flex-col items-center">
            <div>
              선박명 : {emer.ship_name}{' '}
              <span className="text-[#c4c4c4]">/</span> 이름 : {emer.name}{' '}
            </div>
            <div>
              아이디 : {emer.user_id} <span className="text-[#c4c4c4]">/</span>{' '}
              좌표x : {emer.latitude} <span className="text-[#c4c4c4]">/</span>{' '}
              좌표y : {emer.longitude}
            </div>
          </div>
        )}
      </div>
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

const GroupAdd = ({ closeModal }: { closeModal: () => void }) => {
  const [groupName, setGroupName] = useState('')

  const updateGroupAdd = async () => {
    if (groupName.trim() === '') {
      alert('그룹 이름을 입력하세요')
      return
    }
    const res = await postAddGroup({ group_name: groupName })
    if (!res) return
    alert('추가 완료')
    closeModal()
  }
  return (
    <div className="relative flex flex-col items-center rounded-[12px] bg-white p-[15px] md:p-[46px]">
      <button onClick={closeModal} className="absolute right-[10px] top-[3px]">
        x
      </button>
      <div className="w-full">
        <div className="font-bold md:text-[26px]">그룹 추가</div>
      </div>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="mt-[20px] w-[200px] rounded border p-3 md:w-[300px]"
        placeholder="그룹 이름을 입력하세요"
      />
      <div className="mt-[30px] flex w-full justify-center gap-[5px] md:mt-[60px]">
        <button
          onClick={closeModal}
          className="w-1/2 rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]"
        >
          취소
        </button>
        <button
          onClick={updateGroupAdd}
          className="w-1/2 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]"
        >
          추가
        </button>
      </div>
    </div>
  )
}

const modalComponents: { [key: string]: any } = {
  EMERGENCIES: Emergencies,
  GROUP_ADD: GroupAdd,
}

export default modalComponents
