import React, { useState } from 'react'
import styled from 'styled-components'
import { PlusOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { listsState } from '../../store/atoms'

import ModalAddCollection from '../Modals/ModalAddCollection'
import ModalAddTodo from '../Modals/ModalAddTodo'

export default function AddItemTrigger() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false)
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false)
  const lists = useRecoilValue(listsState)

  const handleOpenClose = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleOpenCollectionModal = () => {
    setIsCollectionModalOpen(true)
  }

  const handleCloseCollectionModal = () => {
    setIsCollectionModalOpen(false)
  }

  const handleOpenTodoModal = () => {
    setIsTodoModalOpen(true)
  }

  const handleCloseTodoModal = () => {
    setIsTodoModalOpen(false)
  }

  return (
    <S.AddItemWrapper>
      <S.TriggerWrapper onClick={handleOpenClose}>
        <PlusOutlined style={{ fontSize: '20px' }} />
      </S.TriggerWrapper>
      <S.Dropdown className={isDropdownOpen ? 'visible' : ''}>
        <ul>
          <li>
            <button type='button' onClick={handleOpenCollectionModal}>
              Add collection
            </button>
          </li>
          <li>
            <button type='button' onClick={handleOpenTodoModal}>
              Add todo
            </button>
          </li>
        </ul>
      </S.Dropdown>
      <ModalAddCollection isOpen={isCollectionModalOpen} onClose={handleCloseCollectionModal} />
      <ModalAddTodo isOpen={isTodoModalOpen && lists.length > 0} onClose={handleCloseTodoModal} />
    </S.AddItemWrapper>
  )
}
export const S = {
  AddItemWrapper: styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: #fff;
  `,
  TriggerWrapper: styled.div`
    cursor: pointer;
    background-image: linear-gradient(to bottom right, #c94dce, #f79186);
    height: 30px;
    width: 30px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s cubic-bezier(0.15, 0.9, 0.34, 0.95);

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }

    &:hover {
      transform: scale(1.2);
    }
  `,
  Dropdown: styled.div`
    display: none;
    opacity: 0;
    transform: translateY(15px);
    flex-direction: column;
    position: absolute;
    z-index: 999;
    width: 120px;
    border-radius: 3px;
    text-align: left;
    padding: 10px;
    background: #21212b;
    top: 40px;
    box-shadow: 0px 2px 7px -2px #72737b;
    font-size: 14px;

    li {
      height: 25px;
      padding: 5px 0;
      cursor: pointer;
    }

    li button {
      border: none;
      outline: none;
      background: none;
      margin: 0;
      padding: 0;
    }

    li.disabled {
      color: #72737b;
      pointer-events: none;
    }

    li.disabled button {
      color: #72737b;
      pointer-events: none;
    }

    &.visible {
      display: flex;
      opacity: 1;
      transform: translateY(0);
    }
  `,
}
