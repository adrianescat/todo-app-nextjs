import React from 'react'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ModalAddTodo({ isOpen, onClose }: Props) {
  return (
    <Modal hasFooter={false} visible={isOpen} closable onClose={onClose}>
      {/* <S.UploaderContainer> */}
      <h3>Add todo</h3>
      {/* <S.Uploader>
            <input type='file' id='input_files' accept='application/pdf' onChange={onChange} />
          </S.Uploader>
          <S.UploadButtonTrigger label='Ok' onClick={handleClose} disabled={uploadLoading} loading={uploadLoading} />
        </S.UploaderContainer> */}
    </Modal>
  )
}
