import React from "react"
import styled from "@emotion/styled"
import { theme } from "../styles/theme"
import type { EmotionLevel } from "../types/emotions"

const Wrapper = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
`

const LevelButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border: 2px solid ${({ active }) => (active ? theme.colors.accent : theme.colors.surfaceLight)};
  background: ${({ active }) => (active ? theme.colors.accent : theme.colors.surface)};
  color: ${theme.colors.text};
  border-radius: ${theme.borderRadius};
  font-size: 0.9rem;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.accent};
  }
`

const labels: Record<EmotionLevel, string> = {
  1: "Core",
  2: "Secondary",
  3: "Tertiary",
}

interface Props {
  level: EmotionLevel
  onLevelChange: (level: EmotionLevel) => void
}

const LevelSelector: React.FC<Props> = ({ level, onLevelChange }) => (
  <Wrapper>
    {([1, 2, 3] as EmotionLevel[]).map(l => (
      <LevelButton key={l} active={l === level} onClick={() => onLevelChange(l)}>
        Level {l}: {labels[l]}
      </LevelButton>
    ))}
  </Wrapper>
)

export default LevelSelector
