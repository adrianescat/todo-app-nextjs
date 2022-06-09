import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { userState, listsState } from '../store/atoms'
import TodoService from '../services/Todo.service'
import Header from '../components/Header'
import PageContentWrapper from '../components/PageContentWrapper'
import ClientComponentWrapper from '../components/ClientComponentWrapper'
import ModalAddCollection from '../components/Modals/ModalAddCollection'

interface Props {
  urlName: string
}

export default function CollectionsPageComponent({ urlName }: Props) {
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false)
  const user = useRecoilValue(userState)
  const lists = useRecoilValue(listsState)
  const setLists = useSetRecoilState(listsState)

  const handleOpenCollectionModal = () => {
    setIsCollectionModalOpen(true)
  }

  const handleCloseCollectionModal = () => {
    setIsCollectionModalOpen(false)
  }

  useEffect(() => {
    async function fetchAPI(email: string) {
      const response = await TodoService.getAllLists(email)
      setLists(response)
    }

    if (user?.email) {
      fetchAPI(user?.email)
    }
  }, [user, setLists])

  return (
    <S.Container>
      <Header urlName={urlName} />
      <PageContentWrapper>
        <S.CollectionsPageContainer>
          <h3>Collections</h3>
          <ClientComponentWrapper>
            <S.CollectionsList>
              {lists.map(list => {
                const tasksToDo = list.tasks.filter(task => !task.done)
                const tasksCompleted = list.tasks.filter(task => task.done)

                return (
                  <Link key={`list-${list.id}`} href={{ pathname: `/collection/${list.id}` }}>
                    <S.CollectionBox>
                      <S.CollectionIcon style={{ backgroundColor: list.color ? list.color : '#fff' }} />
                      <h4>{list.title}</h4>
                      <S.TasksStatus>
                        <span>{`${tasksToDo.length} / ${tasksCompleted.length}`}</span>
                      </S.TasksStatus>
                    </S.CollectionBox>
                  </Link>
                )
              })}
              <S.AddCollectionBox onClick={handleOpenCollectionModal}>
                <PlusOutlined style={{ fontSize: '30px' }} />
              </S.AddCollectionBox>
            </S.CollectionsList>
          </ClientComponentWrapper>
        </S.CollectionsPageContainer>
        <ModalAddCollection isOpen={isCollectionModalOpen} onClose={handleCloseCollectionModal} />
      </PageContentWrapper>
    </S.Container>
  )
}

export const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  `,
  CollectionsPageContainer: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    max-width: 970px;
    margin: 0 auto;
    padding: 50px 0;

    h3 {
      font-size: 30px;
      font-weight: 700;
    }
  `,
  CollectionBox: styled.div`
    display: flex;
    width: 300px;
    height: 300px;
    color: #fff;
    flex-direction: column;
    background: #21212b;
    margin-bottom: 20px;
    margin-right: 20px;
    border-radius: 10%;
    padding: 40px;
    cursor: pointer;

    h4 {
      font-size: 24px;
      font-weight: 700;
      padding-top: 80px;
    }

    &:hover {
      background: #282830;
    }
  `,
  AddCollectionBox: styled.div`
    display: flex;
    width: 300px;
    height: 300px;
    color: #444444;
    flex-direction: column;
    background: #21212b;
    margin-bottom: 20px;
    margin-right: 20px;
    border-radius: 10%;
    padding: 40px;
    cursor: pointer;
    border: 2px dashed #444444;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #282830;
    }
  `,
  CollectionsList: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 100px;
  `,
  CollectionIcon: styled.div`
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 30%;
  `,
  TasksStatus: styled.div`
    display: flex;
    width: 100%;
    color: #fff;
    margin-top: 40px;
    font-size: 18px;
  `,
}
