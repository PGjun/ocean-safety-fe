// modalComponents.js

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CommonIcon } from '../SvgIcons'

export type ModalType = 'EMERGENCIES' | 'ALERT2'

const EmerType: { [key: string]: any } = {
  SOS: { IconComponent: CommonIcon.SosAlarm },
  FALL: { IconComponent: CommonIcon.FallAlarm },
}

const Emergencies = ({
  modalData = { type: '', message: '' },
  closeModal = () => {},
}) => {
  const isMobile = useMediaQuery('768')

  let size = '156'
  if (isMobile) {
    size = '96'
  }

  const EmerImg = EmerType['SOS'].IconComponent
  return (
    <div className="relative flex flex-col items-center rounded-[12px] bg-white p-[15px] md:p-[56px]">
      <EmerImg size={size} />
      <button onClick={closeModal} className="absolute right-[10px] top-[3px]">
        x
      </button>
      <div className="mt-[20px]">{modalData.message}</div>
      <div className="mt-[28px] flex justify-center gap-[5px]">
        <button
          onClick={closeModal}
          className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[22px] py-[10px] text-[14px] font-bold md:px-[36px] md:py-[15px]"
        >
          취소
        </button>
        <button className="flex-1 rounded border border-[#333333] bg-[#333333] px-[60px] py-[10px] text-[14px] font-bold text-white md:px-[80px]">
          상세보기
        </button>
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
