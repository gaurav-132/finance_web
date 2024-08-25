import React from 'react'
import Modal from './Modal'

function CreateOrUpdateLocationModal({
    isModalOpen,
    onChange,
    modalWidth,
    height,
    submitDetails
}) {
  return (
    <Modal
        title="Add Location"
        isOpen={isModalOpen}
        modalWidth={modalWidth}
        onChange={onChange}
        minHeigth="350px"
        top="40%"
        height={height}    
    >

    </Modal>
  )
}

export default CreateOrUpdateLocationModal