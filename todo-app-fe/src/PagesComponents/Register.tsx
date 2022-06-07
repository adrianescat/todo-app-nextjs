import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoginService from '../services/Login.service'
import AuthService from '../services/Auth.service'

export default function LoginPageComponent() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [registerError, setRegisterError] = useState('')
  const router = useRouter()

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError('')
    const login = await LoginService.signUp(emailInput, passwordInput)

    console.log(login)

    if (login?.message) {
      setRegisterError('There was an error registering the user. Try again later')
    }

    if (login?.errors?.length) {
      setRegisterError(login.errors.join(', '))
    }

    if (login?.email && login?.authentication_token) {
      AuthService.setToken(login.authentication_token)
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
      <S.RegisterForm onSubmit={handleSubmitRegister}>
        <input name='email' type='email' placeholder='Email' value={emailInput} onChange={handleEmailChange} />
        <input name='password' type='password' placeholder='password' value={passwordInput} onChange={handlePasswordChange} />
        <button type='submit'>Sign Up</button>
      </S.RegisterForm>
      <S.LoginWrapper>
        <span>Already have an account?</span>
        <Link href='/login' passHref>
          <span>Login</span>
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
  `,
  RegisterErrorMessage: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: red;
    color: #fff;
    height: 50px;
    width: 400px;
  `,
  RegisterForm: styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
  `,
  LoginWrapper: styled.div`
    display: block;
  `,
}
