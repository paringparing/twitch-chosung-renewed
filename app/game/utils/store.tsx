import { atom, selector } from "recoil"
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

export const SSelectedCustomWords = atom<number[]>({
  key: "game:selectedCustomWords",
  default: [],
})

export const SWordCount = atom<number>({
  key: "game:wordCount",
  default: 1,
})

export const SWords = atom<null | { word: string; hint: string; category: string }[]>({
  key: "game:words",
  default: null,
})

export const SDisablePadding = atom<boolean>({
  key: "game:disablePadding",
  default: false,
})

export const SCurrentWordIndex = atom<number>({
  key: "game:currentWordIndex",
  default: 0,
})

export const SCurrentWord = selector<{ word: string; hint: string; category: string } | null>({
  key: "game:currentWord",
  get: async ({ get }) => {
    return get(SWords)?.[get(SCurrentWordIndex)] ?? null
  },
})

export const SShowHint = atom<boolean>({
  key: "game:showHint",
  default: false,
})

export const SShowCategory = atom<boolean>({
  key: "game:showCategory",
  default: false,
})

export const SNoAnswer = atom<boolean>({
  key: "game:noAnswer",
  default: false,
})
