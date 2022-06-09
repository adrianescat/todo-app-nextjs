import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

class LoginService {
  public static signIn = (email: string, password: string): Promise<any> => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    return fetch(`${publicRuntimeConfig.API_URL}/api/users/token`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
  }

  public static signUp = (email: string, password: string): Promise<any> => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    return fetch(`${publicRuntimeConfig.API_URL}/api/users`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
  }
}

export default LoginService
