import { atom } from "recoil"
import React from "react"

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

export const SOverlayContent = atom<React.ReactNode | null>({
  key: "game:overlayContent",
  default: null,
})
