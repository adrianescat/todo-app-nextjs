import React from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MenuOutlined, BlockOutlined, FolderOutlined, LogoutOutlined, SearchOutlined, BellOutlined, UserOutlined } from '@ant-design/icons'
import { userState } from '../../store/atoms'
import AuthService from '../../services/Auth.service'

import AddItemTrigger from '../AddItemTrigger'

export default function Header() {
  const [, setUser] = useRecoilState(userState)
  const router = useRouter()

  const handleLogout = () => {
    AuthService.clearToken()
    setUser(undefined)
    router.push('/')
  }

  return (
    <S.Header>
      <S.BurgerMenu>
        <MenuOutlined style={{ fontSize: '20px' }} />
      </S.BurgerMenu>
      <S.NavBar>
        <ul>
          <li>
            <Link href='/' passHref>
              <span>
                <span>
                  <BlockOutlined style={{ fontSize: '20px' }} />
                </span>
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link href='/collections' passHref>
              <span>
                <span>
                  <FolderOutlined style={{ fontSize: '20px' }} />
                </span>{' '}
                Collections
              </span>
            </Link>
          </li>
        </ul>
      </S.NavBar>
      <S.Menu>
        <div>
          <AddItemTrigger />
        </div>
        <button type='button'>
          <SearchOutlined style={{ fontSize: '20px' }} />
        </button>
        <button type='button'>
          <BellOutlined style={{ fontSize: '20px' }} />
        </button>
        <button type='button'>
          <S.UserProfileWrapper>
            <UserOutlined style={{ fontSize: '20px' }} />
          </S.UserProfileWrapper>
        </button>
        <button type='button' onClick={handleLogout}>
          <LogoutOutlined style={{ fontSize: '20px' }} />
        </button>
      </S.Menu>
    </S.Header>
  )
}

export const S = {
  Header: styled.header`
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #21212b;
    color: #72737b;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  `,
  NavBar: styled.nav`
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #21212b;
    color: #72737b;

    ul {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }

    li {
      cursor: pointer;
      margin: 0 20px;
      margin-right: 5px;
    }

    li span {
      display: flex;
      align-items: center;
    }

    li svg {
      margin-right: 10px;
    }

    li:hover {
      color: #fff;
    }
  `,
  Menu: styled.div`
    display: flex;
    width: 30%;

    button {
      outline: none;
      border: none;
      background: none;
      cursor: pointer;
      color: #fff;
      margin-left: 20px;
    }
  `,
  BurgerMenu: styled.div`
    display: flex;
    cursor: pointer;
  `,
  UserProfileWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    cursor: pointer;
    background: lightgrey;
    color: #333;
  `,
  AddItemWrapper: styled.div`
    display: flex;
    cursor: pointer;
    background-image: linear-gradient(to bottom right, #c94dce, #f79186);
    height: 30px;
    width: 30px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s cubic-bezier(0.15, 0.9, 0.34, 0.95);

    &:hover {
      transform: scale(1.2);
    }
  `,
}
