import React from 'react'
import styled from 'styled-components'
import { CheckOutlined } from '@ant-design/icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState, listsState } from '../../store/atoms'
import { List, Task } from '../../types'
import TodoService from '../../services/Todo.service'

interface Props {
  collection: List
  task: Task
}

export default function TaskBox({ collection, task }: Props) {
  const user = useRecoilValue(userState)
  const setLists = useSetRecoilState(listsState)

  const handleCheckTask = async () => {
    if (user?.email && task) {
      const toggleResponse = await TodoService.toggleTask(user.email, task.id)

      if (toggleResponse?.title && toggleResponse?.id) {
        const response = await TodoService.getAllLists(user.email)
        setLists(response)
      }
    }
  }

  return (
    <S.TaskBox data-tooltip={task.note ? task.note : null} data-tooltip-location='top' onClick={handleCheckTask}>
      <S.TaskCheckBoxWrapper
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
      {task.title}
    </S.TaskBox>
  )
}
export const S = {
  TaskBox: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
    background: #21212b;
    border-radius: 15px;
    align-items: center;
    margin-top: 20px;
    padding: 15px;
    cursor: pointer;
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
}
