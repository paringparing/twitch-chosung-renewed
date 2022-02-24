import React from "react"
import { BlitzPage } from "blitz"
import GameLayout from "../../layout"

const Game: BlitzPage = () => {
  return <div>test</div>
}

Game.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default Game
