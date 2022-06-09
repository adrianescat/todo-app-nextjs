import React, { ChangeEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { userState, listsState } from '../../store/atoms'
import { Task } from '../../types'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  task: Task
  collectionId: number
  onClose: () => void
}

export default function ModalEditTodo({ isOpen, onClose, task, collectionId }: Props) {
  const [titleInput, setTitleInput] = useState(task?.title || '')
  const [dueDateInput, setDueDateInput] = useState(task?.due_date || '')
  const [noteInput, setNoteInput] = useState(task?.note || '')
  const [collectionIdInput, setCollectionIdInput] = useState<number>(collectionId)

  const user = useRecoilValue(userState)
  const lists = useRecoilValue(listsState)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (user?.email && titleInput) {
      alert("Backend's missing feature")
      onClose && onClose()
    }
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTitleInput(e.target.value)
    }
  }

  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDueDateInput(e.target.value)
    }
  }

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setNoteInput(e.target.value)
    }
  }

  const handleCollectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setCollectionIdInput(parseInt(e.target.value, 10))
    }
  }

  return (
    <Modal hasFooter={false} visible={isOpen} closable onClose={onClose}>
      <S.Container>
        <h3>Update task</h3>
        {lists.length > 0 && (
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Title' name='title' value={titleInput} onChange={handleTitleChange} required />
            <input type='date' placeholder='Due date' name='due_date' value={dueDateInput} onChange={handleDueDateChange} />
            <input type='text' placeholder='Note' name='color' value={noteInput} onChange={handleNoteChange} />
            {lists.length > 0 && (
              <select value={collectionIdInput} name='collection' onChange={handleCollectionChange} required>
                {lists.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            )}
            <button type='submit'>Update</button>
          </form>
        )}
      </S.Container>
    </Modal>
  )
}

export const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    h3 {
      font-size: 24px;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 60%;
      margin: 0 auto;
      margin-top: 30px;
    }

    form input,
    form select {
      outline: none;
      border: none;
      height: 35px;
      border-radius: 3px;
      padding: 5px 10px;
      font-family: 'Matter';
      font-size: 16px;
      margin-bottom: 10px;
    }

    form button {
      height: 35px;
      font-size: 20px;
      font-weight: 700;
      border-radius: 3px;
      outline: none;
      border: none;
      margin-top: 10px;
      margin-bottom: 20px;
      cursor: pointer;
      background-image: linear-gradient(to bottom right, #c94dce, #f79186);
    }
  `,
}
