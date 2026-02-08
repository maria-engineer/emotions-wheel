import React from "react"
import styled from "@emotion/styled"
import { theme } from "../styles/theme"

const Button = styled.button<{ disabled: boolean }>`
  padding: ${theme.spacing(1.5)} ${theme.spacing(4)};
  background: ${({ disabled }) => (disabled ? theme.colors.surfaceLight : theme.colors.accent)};
  color: ${theme.colors.text};
  border: none;
  border-radius: ${theme.borderRadius};
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
`

interface Props {
  onClick: () => void
  disabled: boolean
}

const SpinButton: React.FC<Props> = ({ onClick, disabled }) => (
  <Button onClick={onClick} disabled={disabled}>
    Spin the Wheel
  </Button>
)

export default SpinButton
