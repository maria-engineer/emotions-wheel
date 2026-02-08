import React, { useState } from "react"
import styled from "@emotion/styled"
import { theme } from "../styles/theme"
import InfoModal from "./InfoModal"

const Button = styled.button`
  position: fixed;
  top: ${theme.spacing(2)};
  right: ${theme.spacing(2)};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${theme.colors.surfaceLight};
  background: ${theme.colors.surface};
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  font-weight: 700;
  font-style: italic;
  font-family: Georgia, serif;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 50;

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.text};
  }
`

const InfoButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} aria-label="About this exercise">
        i
      </Button>
      {isOpen && <InfoModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

export default InfoButton
