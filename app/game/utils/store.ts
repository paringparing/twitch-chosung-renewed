import { atom } from "recoil"

export enum GameMode {
  Suggested,
  Custom,
}

export const currentGameMode = atom<GameMode>({
  key: "game:gameMode",
  default: GameMode.Suggested,
})
