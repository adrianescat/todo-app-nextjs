import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Link from 'next/link'
import { ArrowRightOutlined } from '@ant-design/icons'
import { userState, listsState } from '../store/atoms'
import Header from '../components/Header'
import PageContentWrapper from '../components/PageContentWrapper'
import TodoService from '../services/Todo.service'
import TaskBox from '../components/Task'

interface Props {
  urlName: string
}

export default function DashboardPageComponent({ urlName }: Props) {
  const user = useRecoilValue(userState)
  const lists = useRecoilValue(listsState)
  const setLists = useSetRecoilState(listsState)

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
        <S.DashboardWrapper>
          <S.CollectionsAside>
            {lists && !lists.length && <S.NoCollectionsMessage>No collections yet</S.NoCollectionsMessage>}
            {lists.length > 0 &&
              lists.map(list => {
                return (
                  <Link key={`list-${list.id}`} href={{ pathname: `/collection/${list.id}` }}>
                    <S.CollectionBox>
                      <S.CollectionIcon style={{ backgroundColor: list.color ? list.color : '#fff' }} />
                      <h4>{list.title}</h4>
                    </S.CollectionBox>
                  </Link>
                )
              })}
          </S.CollectionsAside>
          <S.DashboardContent>
            <S.ContentWrapper>
              <h3>Dashboard</h3>
              {lists && !lists.length && (
                <S.WelcomeFirstMessage>Welcome to the TODO app. Start creating your collections</S.WelcomeFirstMessage>
              )}
              {lists && lists.length > 0 && (
                <S.DashboardOverview>
                  <h3>Welcome, {user?.email}</h3>
                  {lists.map(list => {
                    return (
                      <S.CollectionInfo key={`list-${list.id}`}>
                        <S.CollectionInfoHeader>{list.title}</S.CollectionInfoHeader>
                        {list.tasks.slice(0, 2).map(task => (
                          <TaskBox
                            key={`dashboard-task-${task.id}`}
                            task={task}
                            collection={list}
                            styles={{ marginTop: 0, border: 'none', borderRadius: 0 }}
                          />
                        ))}
                        {!list.tasks.length && <S.NoTasks>No tasks yet...</S.NoTasks>}
                        <Link href={{ pathname: `/collection/${list.id}` }}>
                          <S.CollectionInforFooter>
                            <span>Go to Collection</span>
                            <span>
                              <ArrowRightOutlined />
                            </span>
                          </S.CollectionInforFooter>
                        </Link>
                      </S.CollectionInfo>
                    )
                  })}
                </S.DashboardOverview>
              )}
            </S.ContentWrapper>
          </S.DashboardContent>
        </S.DashboardWrapper>
      </PageContentWrapper>
    </S.Container>
  )
}

export const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `,
  DashboardWrapper: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  `,
  DashboardContent: styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 350px);
    height: auto;
    min-height: calc(100vh - 60px);
    padding: 40px;
  `,
  CollectionsAside: styled.aside`
    display: flex;
    flex-direction: column;
    width: 350px;
    height: auto;
    min-height: calc(100vh - 60px);
    background: #21212b;
    border-top: 2px solid #16181f;
  `,
  ContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    height: auto;
    margin: 0 auto;

    h3 {
      font-size: 30px;
      font-weight: 700;
    }
  `,
  CollectionBox: styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    color: #fff;
    flex-direction: row;
    margin-bottom: 20px;
    padding: 20px;
    cursor: pointer;
    align-items: center;

    h4 {
      font-size: 18px;
      font-weight: 700;
      margin-left: 20px;
    }

    &:hover {
      background: #282830;
    }
  `,
  CollectionIcon: styled.div`
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 30%;
  `,
  DashboardOverview: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;

    h3 {
      margin-top: 30px;
    }
  `,
  CollectionInfo: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    border: 2px solid #16181f;
    margin-top: 40px;
  `,
  CollectionInfoHeader: styled.div`
    font-size: 20px;
    padding: 20px;
    height: 60px;
    background: #272732;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  `,
  CollectionInforFooter: styled.div`
    font-size: 18px;
    padding: 20px;
    height: 60px;
    background: #272732;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    cursor: pointer;
    text-align: center;
  `,
  NoTasks: styled.div`
    font-size: 16px;
    padding: 20px;
    background: #21212b;
  `,
  WelcomeFirstMessage: styled.div`
    font-size: 40px;
    margin-top: 30px;
    font-weight: 700;
  `,
  NoCollectionsMessage: styled.div`
    font-size: 20px;
    margin-top: 30px;
    padding: 20px;
    text-align: center;
    font-weight: 700;
  `,
}
