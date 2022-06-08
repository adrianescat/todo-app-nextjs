import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState, listsState } from '../store/atoms'
import Header from '../components/Header'
import PageContentWrapper from '../components/PageContentWrapper'
import TodoService from '../services/Todo.service'

export default function DashboardPageComponent() {
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
      <Header />
      <PageContentWrapper>
        <>
          <h3>Dashboard</h3>
          {lists && !lists.length && <div>No lists yet</div>}
        </>
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
}
