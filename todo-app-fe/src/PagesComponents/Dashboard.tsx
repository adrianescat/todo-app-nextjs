import React from 'react'
import styled from 'styled-components'

export default function DashboardPageComponent() {
  return <S.Container>Hello!</S.Container>
}

export const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    color: red;
  `,
}
