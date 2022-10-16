import { atom, selector } from "recoil"

export type ChatData = {
  user: string
  chat: string
  percent?: string
}

export const SChatData = atom<ChatData[]>({
  key: "game:chatData",
  default: [],
})

export const STimeLimit = atom<number>({
  key: "game:timeLimit",
  default: 30,
})

export const SEnableTimeLimit = atom<boolean>({
  key: "game:enableTimeLimit",
  default: true,
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

export const SWords = atom<
  null | { word: string; hint: string; category: string; author: string | null }[]
>({
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

export const SCurrentWord = selector<{
  word: string
  hint: string
  category: string
  author: string | null
} | null>({
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

export const SRankingData = atom<Record<string, { score: number; count: number }> | null>({
  key: "game:rankingData",
  default: null,
})

export const SShowPercent = atom<boolean>({
  key: "game:showPercent",
  default: true,
})

export const SShowAnswerInMenu = atom<boolean>({
  key: "game:showAnswerInMenu",
  default: true,
})

export const SAutoSkip = atom<boolean>({
  key: "game:autoSkip",
  default: false,
})

export const SAutoSkipTime = atom<number>({
  key: "game:autoSkipTime",
  default: 5,
})

export const SContinuousBlock = atom<boolean>({
  key: "game:continuousBlock",
  default: false,
})

export const SContinuousBlockCount = atom<number>({
  key: "game:continuousBlockCount",
  default: 3,
})

export const gameUserStateStore = new Map<string, number>()
