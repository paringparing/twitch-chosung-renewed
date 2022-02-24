import { atom } from "recoil"

export enum GameMode {
  Suggested,
  Custom,
}

export const SCurrentGameMode = atom<GameMode>({
  key: "game:gameMode",
  default: GameMode.Suggested,
})

export type ChatData = {
  user: string
  chat: string
}

export const SChatData = atom<ChatData[]>({
  key: "game:chatData",
  default: [],
})
