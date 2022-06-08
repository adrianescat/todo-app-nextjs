export type User = {
  email: string
  token: string
}

export type List = {
  id: number
  title: string
  tasks: Array<Task>
  color?: string
  icon?: string
  metadata?: Record<string, unknown>
}

export type Task = {
  id: number
  title: string
  done: boolean
  due_date?: string
  metadata?: Record<string, unknown>
  note?: string
}
