import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { userState } from '../store/atoms'
import LoginService from '../services/Login.service'
import AuthService from '../services/Auth.service'

export default function LoginPageComponent() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [registerError, setRegisterError] = useState('')
  const router = useRouter()

  const setUser = useSetRecoilState(userState)

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError('')
    const login = await LoginService.signUp(emailInput, passwordInput)

    if (login?.message) {
      setRegisterError('There was an error registering the user. Try again later')
    }

    if (login?.errors?.length) {
      setRegisterError(login.errors.join(', '))
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
      <h1>TODO app</h1>
      <h2>Sign up</h2>
      <S.RegisterForm onSubmit={handleSubmitRegister}>
        <input name='email' type='email' placeholder='Email' value={emailInput} onChange={handleEmailChange} required />
        <input name='password' type='password' placeholder='password' value={passwordInput} onChange={handlePasswordChange} required />
        <button type='submit'>Sign Up</button>
      </S.RegisterForm>
      <S.LoginWrapper>
        <span>Already have an account?</span>
        <Link href='/login' passHref>
          <h5>Login</h5>
        </Link>
      </S.LoginWrapper>
      {registerError && <S.RegisterErrorMessage>{registerError}</S.RegisterErrorMessage>}
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

    h1 {
      font-size: 50px;
      font-weight: 700;
      margin-bottom: 50px;
    }

    h2 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  `,
  RegisterErrorMessage: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: red;
    color: #fff;
    height: 50px;
    width: 400px;
    margin-top: 40px;
    border-radius: 5px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    background-color: #ff4747;
  `,
  RegisterForm: styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;

    input {
      font-size: 16px;
      border: none;
      padding: 10px;
      height: 40px;
      margin-bottom: 20px;
      border-radius: 3px;
    }

    button {
      font-size: 16px;
      border: none;
      padding: 10px;
      height: 40px;
      border-radius: 3px;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      background-image: linear-gradient(to bottom right, #c94dce, #f79186);
      margin-bottom: 20px;
    }
  `,
  LoginWrapper: styled.div`
    display: block;

    h5 {
      display: inline-block;
      cursor: pointer;
      padding: 0 10px;
      color: #f79186;
    }
  `,
}
