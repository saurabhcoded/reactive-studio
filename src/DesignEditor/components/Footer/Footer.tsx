import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Common from "./Common"
import Scenes from "./Scenes"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
}))

const Footer = () => {
  return (
    <Container>
      <Scenes />
      <Common />
    </Container>
  )
}

export default Footer
