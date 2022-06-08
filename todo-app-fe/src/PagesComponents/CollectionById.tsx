import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import Link from 'next/link'
import { LoadingOutlined, ArrowLeftOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons'

import { List, Task } from '../types'
import { userState, listsState } from '../store/atoms'
import Header from '../components/Header'
import PageContentWrapper from '../components/PageContentWrapper'
import ClientComponentWrapper from '../components/ClientComponentWrapper'
import TodoService from '../services/Todo.service'
import ModalAddTodo from '../components/Modals/ModalAddTodo'
import TaskBox from '../components/Task'

interface Props {
  collectionId: string
}

export default function CollectionById({ collectionId }: Props) {
  const router = useRouter()
  const user = useRecoilValue(userState)
  const lists = useRecoilValue(listsState)

  const [collection, setCollection] = useState<List | undefined>(undefined)
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false)

  const [tasksToDo, setTasksToDo] = useState<Array<Task>>([])
  const [tasksCompleted, setTasksCompleted] = useState<Array<Task>>([])

  const handleOpenTodoModal = () => {
    setIsTodoModalOpen(true)
  }

  const handleCloseTodoModal = () => {
    setIsTodoModalOpen(false)
  }

  // FETCH COLLECTION DATA
  useEffect(() => {
    async function fetchAPI(email: string) {
      const response = await TodoService.getCollectionById(email, parseInt(collectionId, 10))
      if (response?.id && response?.title) {
        setCollection(response)
      }
    }

    if (user?.email && collectionId) {
      fetchAPI(user?.email)
    }
  }, [user, collectionId])

  // SET TASKS AND COMPLETED TASKS LISTS
  useEffect(() => {
    if (collection && collection?.tasks) {
      setTasksToDo(collection.tasks.filter(task => !task.done))
      setTasksCompleted(collection.tasks.filter(task => task.done))
    }
  }, [collection])

  // UPDATE LISTS WHEN ADDING OR MODIFING TASKS
  useEffect(() => {
    const collectionFromLists = lists.find(list => list.id === parseInt(collectionId, 10))
    if (lists && collectionFromLists) {
      setCollection(collectionFromLists)
    }
  }, [lists, collectionId, collection])

  if (!collectionId) {
    router.push('/collections')
  }

  return (
    <S.Container>
      <Header />
      <PageContentWrapper>
        <ClientComponentWrapper>
          <S.CollectionPageContainer>
            {!collection && <LoadingOutlined style={{ fontSize: '30px' }} />}
            {collection && (
              <>
                <S.CollectionHeader>
                  <span>
                    <Link href={{ pathname: `/collections` }}>
                      <ArrowLeftOutlined style={{ fontSize: '30px' }} />
                    </Link>
                    <h3>{collection.title}</h3>
                  </span>
                  <span>
                    <EllipsisOutlined style={{ fontSize: '30px' }} />
                  </span>
                </S.CollectionHeader>
                <S.AddTaskBar onClick={handleOpenTodoModal}>
                  <S.TriggerWrapper style={{ background: collection.color ? collection.color : '#fff' }}>
                    <PlusOutlined style={{ fontSize: '20px' }} />
                  </S.TriggerWrapper>
                </S.AddTaskBar>
                <S.ListOfTasks>
                  <h4>Tasks{tasksToDo.length > 0 ? ` - ${tasksToDo.length}` : ''}</h4>
                  {!tasksToDo.length && !tasksCompleted.length && <S.ListMessage>No tasks yet...</S.ListMessage>}
                  {!tasksToDo.length && tasksCompleted.length > 0 && <S.ListMessage>All the tasks were completed</S.ListMessage>}
                  {tasksToDo.length > 0 &&
                    tasksToDo.map(task => <TaskBox collection={collection} task={task} key={`task-${collection.id}-${task.id}`} />)}
                </S.ListOfTasks>
                {tasksCompleted.length > 0 && (
                  <S.ListOfTasks>
                    <h4>Completed - {tasksCompleted.length}</h4>
                    {tasksCompleted.map(task => (
                      <TaskBox collection={collection} task={task} key={`task-${collection.id}-${task.id}`} />
                    ))}
                  </S.ListOfTasks>
                )}
              </>
            )}
            {collection?.id && (
              <ModalAddTodo
                isOpen={isTodoModalOpen && collection?.id !== undefined}
                onClose={handleCloseTodoModal}
                collectionId={collection.id}
              />
            )}
          </S.CollectionPageContainer>
        </ClientComponentWrapper>
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
  CollectionPageContainer: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    max-width: 970px;
    margin: 0 auto;
    padding: 50px 0;
  `,
  CollectionHeader: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;

    span {
      display: flex;
    }

    h3 {
      font-size: 30px;
      font-weight: 700;
      margin-left: 30px;
    }
  `,
  AddTaskBar: styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    flex-direction: row;
    margin-bottom: 50px;
    align-items: center;
    border: 1px dashed #72737b;
    border-radius: 15px;
    padding: 0 20px;
    cursor: pointer;

    &:hover {
      background: #21212b;
    }
  `,
  TriggerWrapper: styled.div`
    cursor: pointer;
    height: 30px;
    width: 30px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }
  `,
  ListOfTasks: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    margin-bottom: 40px;

    h4 {
      font-size: 20px;
    }
  `,
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
  ListMessage: styled.div`
    margin-top: 20px;
  `,
  TaskCheckBoxWrapper: styled.div`
    height: 50px;
    width: 50px;
    height: 30px;
    width: 30px;
    border-radius: 10px;
    margin-right: 15px;
  `,
}
