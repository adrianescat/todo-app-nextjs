import React, { useState } from 'react'
import styled from 'styled-components'
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState, listsState } from '../../store/atoms'
import { List, Task } from '../../types'
import TodoService from '../../services/Todo.service'
import ModalEditTodo from '../Modals/ModalEditTodo'

interface Props {
  collection: List
  task: Task
}

export default function TaskBox({ collection, task }: Props) {
  const user = useRecoilValue(userState)
  const setLists = useSetRecoilState(listsState)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleCheckTask = async () => {
    if (user?.email && task) {
      const toggleResponse = await TodoService.toggleTask(user.email, task.id)

      if (toggleResponse?.title && toggleResponse?.id) {
        const response = await TodoService.getAllLists(user.email)
        setLists(response)
      }
    }
  }

  const handleDeleteTask = async () => {
    if (user?.email && task) {
      const deleteResponse = await TodoService.deleteTask(user.email, task.id)

      if (deleteResponse?.ok) {
        const response = await TodoService.getAllLists(user.email)
        setLists(response)
      }
    }
  }

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
  }

  return (
    <S.TaskBox>
      <S.TaskCheckBoxWrapper
        onClick={handleCheckTask}
        className={task.done ? 'done' : ''}
        style={{
          border: `2px solid ${collection.color ? collection.color : '#fff'}`,
          background: task.done ? `${collection.color ? collection.color : '#fff'}` : '#21212b',
        }}
      >
        <span>
          <CheckOutlined style={{ fontSize: '20px' }} />
        </span>
      </S.TaskCheckBoxWrapper>
      <S.TaskTitle data-tooltip={task.note ? task.note : null} data-tooltip-location='top' onClick={handleOpenEditModal}>
        {task.title}
      </S.TaskTitle>
      <S.DeleteTaskWrapper className='delete-button' onClick={handleDeleteTask}>
        <span>
          <DeleteOutlined style={{ fontSize: '18px' }} />
        </span>
      </S.DeleteTaskWrapper>
      <ModalEditTodo isOpen={isEditModalOpen} onClose={handleCloseEditModal} task={task} collectionId={collection.id} />
    </S.TaskBox>
  )
}
export const S = {
  TaskBox: styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 60px;
    background: #21212b;
    border-radius: 15px;
    align-items: center;
    margin-top: 20px;
    padding: 15px;

    &:hover .delete-button span {
      display: flex;
    }
  `,
  TaskCheckBoxWrapper: styled.div`
    height: 50px;
    width: 50px;
    height: 30px;
    width: 30px;
    border-radius: 10px;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      display: none;
    }

    &.done span {
      color: #16181f;
      width: 100%
      height: 100%;
      display: block;
    }
  `,
  TaskTitle: styled.div`
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  `,
  DeleteTaskWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 20px;
    cursor: pointer;

    span {
      display: none;
    }
  `,
}
