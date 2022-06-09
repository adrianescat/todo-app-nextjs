import Cookies from 'universal-cookie'

export interface CookiesType {
  get: (name: string) => string | undefined | null
  remove: (name: string, config: any) => void
  set: (name: string, token: string, config: any) => void
}

class Auth {
  cookies: CookiesType
  constructor() {
    this.cookies = new Cookies()
  }

  // read cookies
  getToken = (): string | undefined | null => {
    return this.cookies.get('todo-app-token')
  }

  // write to cookies
  setToken = (token: string) => {
    return this.cookies.set('todo-app-token', token, { maxAge: 100000 })
  }

  // clear cookies
  clearToken = () => {
    return this.cookies.remove('todo-app-token', { path: '/' })
  }
}

export default new Auth()
