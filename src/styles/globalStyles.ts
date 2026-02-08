import { css } from "@emotion/react"
import { theme } from "./theme"

export const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, sans-serif;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
`
