import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { userState } from '../store/atoms'
import AuthService from '../services/Auth.service'
import LoginService from '../services/Login.service'

export default function LoginPageComponent() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginEror] = useState(false)
  const router = useRouter()

  const setUser = useSetRecoilState(userState)

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginEror(false)
    const login = await LoginService.signIn(emailInput, passwordInput)

    if (login?.message) {
      setLoginEror(true)
    }

    if (login?.email && login?.authentication_token) {
      AuthService.setToken(login.authentication_token)
      setUser({ email: login.email, token: login.authentication_token })
      router.push('/')
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setEmailInput(e.target.value)
    }
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPasswordInput(e.target.value)
    }
  }

  return (
    <S.Container>
      <S.LoginForm onSubmit={handleSubmitLogin}>
        <input name='email' type='email' placeholder='Email' value={emailInput} onChange={handleEmailChange} required />
        <input name='password' type='password' placeholder='password' value={passwordInput} onChange={handlePasswordChange} required />
        <button type='submit'>Sign In</button>
      </S.LoginForm>
      <S.RegisterWrapper>
        <span>Do not have an account yet?</span>
        <Link href='/register' passHref>
          <span>Register</span>
        </Link>
      </S.RegisterWrapper>
      {loginError && <S.LoginErrorMessage>Invalid user</S.LoginErrorMessage>}
    </S.Container>
  )
}

export const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #16181f;
    color: #fff;
    height: 100vh;
    justify-content: center;
    align-items: center;
  `,
  LoginErrorMessage: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: red;
    color: #fff;
    height: 50px;
    width: 400px;
  `,
  LoginForm: styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
  `,
  RegisterWrapper: styled.div`
    display: block;
  `,
}
