import React from "react"
import { Global } from "@emotion/react"
import styled from "@emotion/styled"
import { globalStyles } from "../styles/globalStyles"
import { theme } from "../styles/theme"

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(4)};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Global styles={globalStyles} />
    <Container>
      {children}
    </Container>
  </>
)

export default Layout
