import { atom } from "recoil"

export const SDrawerOpen = atom<boolean>({
  key: "admin:drawerOpen",
  default: false,
})
