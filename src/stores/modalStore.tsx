// 모달 스토어

import { ModalType } from '@/components/modal/ModalComponents'
import { getCurrentTimeId } from '@/utils/getCurrentTimeId'
import { create } from 'zustand'

interface ModalInfo {
  id: string
  modalType: ModalType
  modalProps: object
  isOpen: boolean
  bgClickEnabled: boolean
}

interface ModalState {
  modals: ModalInfo[]
  openModal: (
    modalType: ModalType,
    modalProps?: object,
    bgClickEnabled?: boolean,
  ) => string
  closeModal: (id: string) => void
  closeModalAll: () => void
}

const useModalStore = create<ModalState>((set) => ({
  modals: [],

  openModal: (modalType, modalProps = {}, bgClickEnabled = true) => {
    const id = getCurrentTimeId() // 고유한 ID 생성
    set((state) => ({
      modals: [
        ...state.modals,
        { id, modalType, modalProps, isOpen: true, bgClickEnabled },
      ],
    }))
    return id // 생성된 모달의 ID 반환
  },

  closeModal: (id) => {
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id), // ID를 기반으로 모달 제거
    }))
  },
  closeModalAll: () => {
    set((state) => ({
      modals: state.modals.map((modal) => ({ ...modal, isOpen: false })),
    }))
  },
}))

export default useModalStore
