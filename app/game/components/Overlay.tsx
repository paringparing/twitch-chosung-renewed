import React from "react"
import ReactDOM from "react-dom"
import { useScale } from "../utils/scale"
import { AnimatePresence, motion } from "framer-motion"

class Portal extends React.Component<any, any> {
  el: HTMLDivElement

  constructor(props) {
    super(props)
    this.el = document.createElement("div")
  }

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

const Overlay: React.FC<
  React.StyleHTMLAttributes<HTMLDivElement> & {
    button?: React.ReactNode
    open?: boolean
    children: React.ReactNode | ((props: { close: () => void }) => React.ReactNode)
  }
> = ({ children, button, open: openProp, style }) => {
  const scale = useScale()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Portal>
        <AnimatePresence>
          {(openProp ?? open) && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                type: "tween",
              }}
            >
              <motion.div
                initial={{
                  scale,
                  translateX: "-50%",
                  translateY: "-50%",
                  y: 40,
                }}
                animate={{
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                  },
                }}
                exit={{
                  y: 40,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                style={{
                  background: "#6BD0B8",
                  borderRadius: 20,
                  padding: 40,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  zIndex: 9999,
                  ...style,
                }}
              >
                {typeof children === "function"
                  ? children({ close: () => setOpen(false) })
                  : children}
              </motion.div>
              <motion.div
                style={{
                  position: "fixed",
                  background: `rgba(0, 0, 0, 0.5)`,
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 9998,
                }}
                onClick={() => {
                  setOpen(false)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
      {button && (
        <div
          onClick={() => {
            if (!(button as any).props.disabled) setOpen(true)
          }}
        >
          {button}
        </div>
      )}
    </>
  )
}

export default Overlay
