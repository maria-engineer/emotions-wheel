import React from "react"
import styled from "@emotion/styled"
import { motion, AnimatePresence } from "framer-motion"
import { theme } from "../styles/theme"
import { coreColors } from "../styles/theme"

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: ${theme.spacing(2)};
`

const Card = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: 16px;
  padding: ${theme.spacing(5)} ${theme.spacing(6)};
  text-align: center;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`

const EmotionLabel = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing(2)};
  line-height: 1.1;
`

const Path = styled.p`
  font-size: 1rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing(3)};
`

const Prompt = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text};
  font-style: italic;
  margin-bottom: ${theme.spacing(4)};
  line-height: 1.5;
`

const CloseButton = styled.button`
  background: ${theme.colors.surfaceLight};
  color: ${theme.colors.text};
  border: none;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing(1)} ${theme.spacing(3)};
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.accent};
  }
`

interface Props {
  emotion: string
  path: string[]
  onClose: () => void
}

const ResultPopup: React.FC<Props> = ({ emotion, path, onClose }) => {
  const coreName = path[0]
  const accentColor = coreColors[coreName]?.base || theme.colors.accent

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Card
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          <EmotionLabel style={{ color: accentColor }}>{emotion}</EmotionLabel>
          <Path>{path.join(" \u203A ")}</Path>
          <Prompt>
            Write about a time you felt <strong>{emotion.toLowerCase()}</strong>.
            What happened? What did it feel like?
          </Prompt>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </Card>
      </Overlay>
    </AnimatePresence>
  )
}

export default ResultPopup
