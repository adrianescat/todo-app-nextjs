import React from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { userState } from '../store/atoms'
import AuthService from '../services/Auth.service'

export default function DashboardPageComponent() {
  const [user, setUser] = useRecoilState(userState)
  const router = useRouter()

  const handleLogout = () => {
    AuthService.clearToken()
    setUser(undefined)
    router.push('/')
  }

  return (
    <S.Container>
      Dashboard {user?.email} - {user?.token}
      <button type='button' onClick={handleLogout}>
        logout
      </button>
    </S.Container>
  )
}

export const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #16181f;
    color: #fff;
  `,
}
