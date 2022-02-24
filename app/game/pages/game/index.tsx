import React from "react"
import { BlitzPage } from "blitz"
import GameLayout from "../../layout"
import { useCurrentUser } from "../../../core/hooks/useCurrentUser"

const Game: BlitzPage = () => {
  const user = useCurrentUser()
  return <div>{JSON.stringify(user)}</div>
}

Game.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default Game
