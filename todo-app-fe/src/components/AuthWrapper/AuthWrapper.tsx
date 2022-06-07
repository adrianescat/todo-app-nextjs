/* eslint-disable react/jsx-no-useless-fragment */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Auth from '../../services/Auth.service'

type Props = {
  children: React.ReactNode
  isLogin?: boolean
}

const AuthWrapper = (props: Props) => {
  const { children, isLogin } = props
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  // TODO: improve session handling
  useEffect(() => {
    const token = Auth.getToken()

    if (token) {
      setIsAuthorized(true)
    } else if (!isLogin) {
      router.push('/login')
    }
  }, [router, isLogin])

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}

export default AuthWrapper
