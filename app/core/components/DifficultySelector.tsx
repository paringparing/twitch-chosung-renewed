import React from "react"
import { useField } from "react-final-form"
import { MdStar, MdStarOutline } from "react-icons/md"

const DifficultySelector: React.FC = () => {
  const {
    input: { value, onChange },
  } = useField<number>("difficulty")
  const [hovered, setHovered] = React.useState(0)

  return (
    <div style={{ paddingLeft: 24 }}>
      <div style={{ fontSize: 24, fontWeight: 800 }}>난이도</div>
      <div style={{ marginTop: 5, display: "flex" }}>
        {new Array(10).fill(0).map((_, i) => (
          <div
            key={i}
            onMouseOver={() => {
              setHovered(i + 1)
            }}
            onMouseLeave={() => setHovered(0)}
            onClick={() => {
              onChange(i + 1)
            }}
          >
            {(hovered || value) > i ? <MdStar size={24} /> : <MdStarOutline size={24} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector
