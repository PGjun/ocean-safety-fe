//ModalWrapper.tsx 모달 공용 컨테이너
'use client'

import { usePathname } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import modalComponents from './ModalComponents'
import useModalStore from '@/stores/modalStore'

const ModalWrapper = () => {
  const { modals, closeModal, closeModalAll } = useModalStore()

  const pathName = usePathname()

  useEffect(() => {
    closeModalAll()
  }, [pathName, closeModalAll])

  // if (!isOpen) return null

  return (
    <>
      {modals.map(({ id, modalType, modalProps, isOpen, bgClickEnabled }) => {
        const ModalComponent = modalComponents[modalType]
        return (
          <Fragment key={id}>
            {isOpen && (
              <div
                className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-700 bg-opacity-50`}
                onClick={() => bgClickEnabled && closeModal(id)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ModalComponent
                    {...modalProps}
                    closeModal={() => closeModal(id)}
                  />
                </div>
              </div>
            )}
          </Fragment>
        )
      })}
    </>
  )
}

export default ModalWrapper
