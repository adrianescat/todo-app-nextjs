import { CloseOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import ClientComponentWrapper from '../ClientComponentWrapper'
import Portal from './Portal'

export interface ModalProps {
  children: JSX.Element
  footer?: JSX.Element
  header?: JSX.Element
  title?: string
  className?: string
  confirmButtonLabel?: string
  cancelButtonLabel?: string
  visible?: boolean
  hasConfirmOnly?: boolean
  closable?: boolean
  hasFooter?: boolean
  onConfirm?: () => void
  onReject?: () => void
  onClose?: () => void
  onAfterClose?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal: React.FC<ModalProps> = ({
  children,
  visible = false,
  className = '',
  title = '',
  closable = true,
  hasFooter = true,
  hasConfirmOnly = false,
  confirmButtonLabel = 'Accept',
  cancelButtonLabel = 'Cancel',
  header,
  footer,
  onAfterClose,
  onConfirm,
  onReject,
  onClose,
}: ModalProps) => {
  if (!visible) {
    return null
  }

  return (
    <ClientComponentWrapper>
      <Portal rootPortalId='#root-portal-modal' onAfterClose={onAfterClose}>
        <S.Modal className={className}>
          <S.Overlay onClick={closable ? onClose : () => undefined} />
          <S.ModalBody>
            {closable && (
              <S.CloseButton onClick={onClose}>
                <CloseOutlined style={{ fontSize: '16px' }} />
              </S.CloseButton>
            )}
            {!header && title && <S.Header>{title}</S.Header>}
            {header && !title && { header }}

            <S.Content>{children}</S.Content>

            {!footer && hasFooter && !hasConfirmOnly && (
              <S.Footer>
                <button type='button' onClick={onReject}>
                  {cancelButtonLabel}
                </button>
                <button type='button' onClick={onConfirm}>
                  {confirmButtonLabel}
                </button>
              </S.Footer>
            )}
            {!footer && hasFooter && hasConfirmOnly && (
              <S.Footer>
                <button type='button' onClick={onConfirm}>
                  {confirmButtonLabel}
                </button>
              </S.Footer>
            )}
            {footer && hasFooter && <S.Footer>{footer}</S.Footer>}
          </S.ModalBody>
        </S.Modal>
      </Portal>
    </ClientComponentWrapper>
  )
}

export default Modal

export const S = {
  Modal: styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 30%;
    width: 100%;
    z-index: 9999;
  `,
  ModalBody: styled.div`
    background: #16181f;
    position: relative;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 600px;
    height: auto;
    min-height: 200px;
    z-index: 1002;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgb(0 0 0 / 30%);
    color: #fff;
  `,
  CloseButton: styled.div`
    color: #fff;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  `,
  Overlay: styled.div`
    background: rgba(88, 88, 88, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
  `,
  Content: styled.div`
    display: flex;
  `,
  Footer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  `,
  Header: styled.div`
    text-align: center;
    width: 100%;
    margin: 0 auto;
    font-size: 18px;
    display: block;
    font-family: 'Matter';
    font-weight: 500;
  `,
}
