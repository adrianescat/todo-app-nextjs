import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { User } from '../types'

const { persistAtom } = recoilPersist()

export const userState = atom<User | undefined>({
  key: 'User-atom',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
})
