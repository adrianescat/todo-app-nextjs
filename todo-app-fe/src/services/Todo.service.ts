import getConfig from 'next/config'
import AuthService from './Auth.service'
import { List, Task } from '../types'

const { publicRuntimeConfig } = getConfig()

export interface TaskInput {
  title: string
  dueDate?: string
  note?: string
}

export interface TaskInputEdit {
  id: number
  title: string
  dueDate?: string
  note?: string
}

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

  public static getCollectionById = (email: string, id: number): Promise<List> => {
    const token = AuthService.getToken() as string

    return fetch(`${publicRuntimeConfig.API_URL}/api/lists/${id}`, {
      headers: {
        'X-User-Token': token,
        'X-User-Email': email,
      },
    }).then(res => res.json())
  }

  public static createTask = (email: string, collectionId: number, task: TaskInput): Promise<Task> => {
    const token = AuthService.getToken() as string
    const formData = new FormData()
    formData.append('title', task.title)
    formData.append('due_date', task.dueDate ? task.dueDate : '9999-12-31')
    formData.append('note', task.note ? task.note : '')

    return fetch(`${publicRuntimeConfig.API_URL}/api/lists/${collectionId}/tasks`, {
      method: 'POST',
      headers: {
        'X-User-Token': token,
        'X-User-Email': email,
      },
      body: formData,
    }).then(res => res.json())
  }

  public static toggleTask = (email: string, taskId: number): Promise<Task> => {
    const token = AuthService.getToken() as string

    return fetch(`${publicRuntimeConfig.API_URL}/api/tasks/${taskId}/toggle`, {
      method: 'POST',
      headers: {
        'X-User-Token': token,
        'X-User-Email': email,
      },
    }).then(res => res.json())
  }

  public static deleteTask = (email: string, taskId: number): Promise<any> => {
    const token = AuthService.getToken() as string

    return fetch(`${publicRuntimeConfig.API_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'X-User-Token': token,
        'X-User-Email': email,
      },
    })
  }

  public static updateTask = (email: string, collectionId: number, task: TaskInputEdit): Promise<Task> => {
    const token = AuthService.getToken() as string
    const formData = new FormData()
    formData.append('title', task.title)
    formData.append('due_date', task.dueDate ? task.dueDate : '9999-12-31')
    formData.append('note', task.note ? task.note : '')

    return fetch(`${publicRuntimeConfig.API_URL}/api/tasks/${task.id}`, {
      method: 'UPDATE',
      headers: {
        'X-User-Token': token,
        'X-User-Email': email,
      },
      body: formData,
    }).then(res => res.json())
  }
}

export default TodoService
