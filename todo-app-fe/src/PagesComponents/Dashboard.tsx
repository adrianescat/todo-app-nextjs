import React from 'react'
import styled from 'styled-components'

export default function DashboardPageComponent() {
  return <S.Container>Dashboard</S.Container>
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
