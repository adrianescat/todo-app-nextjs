import getConfig from 'next/config'
import AuthService from './Auth.service'
import { List } from '../types'

const { publicRuntimeConfig } = getConfig()

class TodoService {
  public static getAllLists = (email: string): Promise<Array<List>> => {
    const token = AuthService.getToken() as string

    return fetch(`${publicRuntimeConfig.API_URL}/api/lists`, {
      headers: {
        'X-User-Token': token,
        'X-User-Email': email,
      },
    }).then(res => res.json())
  }

  public static createList = (email: string, title: string, color: string): Promise<List> => {
    const token = AuthService.getToken() as string
    const formData = new FormData()
    formData.append('title', title)
    formData.append('color', color)

    return fetch(`${publicRuntimeConfig.API_URL}/api/lists`, {
      method: 'POST',
      headers: {
        'X-User-Token': token,
        'X-User-Email': email,
      },
      body: formData,
    }).then(res => res.json())
  }
}

export default TodoService
