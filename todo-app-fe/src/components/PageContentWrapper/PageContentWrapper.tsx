import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}

export default function PageContentWrapper({ children }: Props) {
  return <S.PageContentWrapper>{children}</S.PageContentWrapper>
}

export const S = {
  PageContentWrapper: styled.main`
    display: flex;
    font-size: 14px;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 60px);
    background-color: #16181f;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  `,
}
