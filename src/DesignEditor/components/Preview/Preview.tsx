import React from "react"
import { Modal, ModalBody, SIZE, ROLE } from "baseui/modal"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import useGraphic from "~/hooks/useGraphic"

interface ComponentProps {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}
const Preview = ({ isOpen, setIsOpen }: ComponentProps) => {
  const { editor } = useGraphic()
  const [loading, setLoading] = React.useState(true)
  const [state, setState] = React.useState({
    image: "",
  })

  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON()
      const image = (await editor.renderer.render(template)) as string
      setState({ image })
      setLoading(false)
    }
  }, [editor])

  React.useEffect(() => {
    makePreview()
  }, [editor])

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.full}
      role={ROLE.dialog}
      overrides={{
        Root: {
          style: {
            zIndex: 5,
          },
        },
        Dialog: {
          style: {
            width: "90vw",
            height: "90vh",
            marginTop: '5vh',
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      }}
    >
      <ModalBody
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          height: "100%",
          position: "relative",
        }}
      >
        <Block
          style={{
            position: "absolute",
            flex: 1,
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          <Block
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              padding: "1rem",
              maxWidth: "100%",
              overflow: "auto",
            }}
          >
            {!loading && <img width="100%" height="100%" src={state.image} style={{ objectFit: "contain" }} />}
          </Block>
        </Block>
      </ModalBody>
    </Modal>
  )
}

export default Preview
