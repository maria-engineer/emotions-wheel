import React from "react"
import styled from "@emotion/styled"
import { theme } from "../styles/theme"

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  font-size: 0.85rem;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  user-select: none;
`

const Checkbox = styled.input`
  accent-color: ${theme.colors.accent};
  width: 16px;
  height: 16px;
  cursor: pointer;
`

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
}

const SkipAnimationToggle: React.FC<Props> = ({ checked, onChange }) => (
  <Label>
    <Checkbox
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
    />
    Skip animation
  </Label>
)

export default SkipAnimationToggle
