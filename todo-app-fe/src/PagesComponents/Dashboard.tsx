import React from 'react'
import styled from 'styled-components'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export default function DashboardPageComponent() {
  return <S.Container>Hello! - API at {publicRuntimeConfig.API_URL}</S.Container>
}

export const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    color: red;
  `,
}
