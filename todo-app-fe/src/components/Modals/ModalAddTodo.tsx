import React, { ChangeEvent, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { userState, listsState } from '../../store/atoms'
import TodoService from '../../services/Todo.service'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  collectionId?: number
  onClose: () => void
}

export default function ModalAddTodo({ isOpen, onClose, collectionId }: Props) {
  const [titleInput, setTitleInput] = useState('')
  const [dueDateInput, setDueDateInput] = useState('')
  const [noteInput, setNoteInput] = useState('')
  const [collectionIdInput, setCollectionIdInput] = useState<number | undefined>()
  const [errorMessage, setErrorMessage] = useState('')

  const user = useRecoilValue(userState)
  const lists = useRecoilValue(listsState)
  const setLists = useSetRecoilState(listsState)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (user?.email && titleInput) {
      const taskCreateResponse = await TodoService.createTask(user.email, collectionId || collectionIdInput || 1, {
        title: titleInput,
        dueDate: dueDateInput,
        note: noteInput,
      })

      if (taskCreateResponse?.title && taskCreateResponse?.id) {
        const response = await TodoService.getAllLists(user.email)
        setLists(response)
        onClose && onClose()
      } else {
        setErrorMessage('There was an error creating the task.')
      }
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
        <h3>Add task</h3>
        {(lists.length > 0 || collectionId) && (
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Title' name='title' value={titleInput} onChange={handleTitleChange} required />
            <input type='date' placeholder='Due date' name='due_date' value={dueDateInput} onChange={handleDueDateChange} />
            <input type='text' placeholder='Note' name='color' value={noteInput} onChange={handleNoteChange} />
            {!collectionId && lists.length > 0 && (
              <select name='collection' onChange={handleCollectionChange} required>
                {lists.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            )}
            <button type='submit'>Add</button>
          </form>
        )}
        {!lists.length && !collectionId && <div>No collections yet</div>}
        {errorMessage && <S.responseErrorMessage>{errorMessage}</S.responseErrorMessage>}
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
  responseErrorMessage: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    color: #fff;
    height: 50px;
    width: 400px;
    margin-top: 40px;
    border-radius: 5px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    background-color: #ff4747;
    width: 100%;
  `,
}
