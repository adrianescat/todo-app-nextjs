export type User = {
  email: string
  token: string
}

export type List = {
  color: string
  icon: string
  id: number
  tasks: Array<Task>
  title: string
  metadata?: Record<string, unknown>
}

export type Task = {
  title: string
}
