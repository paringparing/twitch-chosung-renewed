import React from "react"

export const useScale = () => {
  const [scale, setScale] = React.useState(0)

  React.useEffect(() => {
    const l = () => {
      setScale(Math.min(document.body.clientWidth / 1920, document.body.clientHeight / 1080))
    }
    window.addEventListener("resize", l)
    setScale(Math.min(document.body.clientWidth / 1920, document.body.clientHeight / 1080))
    return () => {
      window.removeEventListener("resize", l)
    }
  }, [])

  return scale
}
