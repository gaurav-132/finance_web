import React from 'react'
import Modal from './Modal'

const AlertModal = ({isOpen,onChange, modalWidth, message }) => {
  return (
    <div>
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            modalWidth={modalWidth}
            // minHeigth="10%"
            height="15%"
            top="12%"
        >
            <div className='flex items-center px-4'>
                {message}
            </div>
        </Modal>
    </div>
  )
}

export default AlertModal