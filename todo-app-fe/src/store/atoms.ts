import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { User, List } from '../types'

const { persistAtom } = recoilPersist()

export const userState = atom<User | undefined>({
  key: 'User-atom',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
})

export const listsState = atom<Array<List>>({
  key: 'Lists-atom',
  default: [],
  effects_UNSTABLE: [persistAtom],
})
