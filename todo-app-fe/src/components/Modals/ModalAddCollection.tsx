import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState, listsState } from '../../store/atoms'
import TodoService from '../../services/Todo.service'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ModalAddCollection({ isOpen, onClose }: Props) {
  const [titleInput, setTitleInput] = useState('')
  const [colorInput, setColorInput] = useState('')

  const user = useRecoilValue(userState)
  const setLists = useSetRecoilState(listsState)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (user?.email && titleInput && colorInput) {
      const listCreateResponse = await TodoService.createList(user.email, titleInput, colorInput)

      if (listCreateResponse?.title && listCreateResponse?.id) {
        const response = await TodoService.getAllLists(user.email)
        setLists(response)
        onClose && onClose()
      }
    }
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTitleInput(e.target.value)
    }
  }

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setColorInput(e.target.value)
    }
  }

  return (
    <Modal hasFooter={false} visible={isOpen} closable onClose={onClose}>
      <S.Container>
        <h3>Add collection</h3>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Title' name='title' value={titleInput} onChange={handleTitleChange} required />
          <input type='text' placeholder='Hex color' name='color' value={colorInput} onChange={handleColorChange} required />
          <button type='submit'> Add</button>
        </form>
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

    form input {
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
