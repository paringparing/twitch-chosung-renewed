import { atom } from "recoil"

export type ChatData = {
  user: string
  chat: string
}

export const SChatData = atom<ChatData[]>({
  key: "game:chatData",
  default: [],
})

export const STimeLimit = atom<number>({
  key: "game:timeLimit",
  default: 30,
})

export const SSelectedOfficialWords = atom<number[]>({
  key: "game:selectedOfficialWords",
  default: [],
})
