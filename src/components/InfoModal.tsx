import React from "react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { theme } from "../styles/theme"

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
  padding: ${theme.spacing(4)} ${theme.spacing(4)};
  max-width: 520px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing(2)};
  color: ${theme.colors.text};
`

const Text = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing(2)};
`

const CloseButton = styled.button`
  background: ${theme.colors.surfaceLight};
  color: ${theme.colors.text};
  border: none;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing(1)} ${theme.spacing(3)};
  font-size: 1rem;
  margin-top: ${theme.spacing(2)};
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.accent};
  }
`

interface Props {
  onClose: () => void
}

const InfoModal: React.FC<Props> = ({ onClose }) => (
  <Overlay
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onClick={onClose}
  >
    <Card
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      onClick={e => e.stopPropagation()}
    >
      <Title>About This Exercise</Title>
      <Text>
        The Emotions Wheel is a tool for developing emotional granularity
        — the ability to make fine-grained distinctions between similar
        feelings. Research shows that people who can precisely name their
        emotions experience better emotional regulation and wellbeing.
      </Text>
      <Text>
        This wheel is based on Geoffrey Roberts' Feelings Wheel, which
        organises 130 emotions across three levels: 7 core emotions at the
        centre, branching into more specific feelings as you move outward.
      </Text>
      <Text>
        <strong>How to use it:</strong> Choose a level of emotional detail,
        then spin the wheel. Use the emotion you land on as a writing
        prompt — journal about a time you felt that way, write a scene
        featuring a character experiencing that emotion, or simply reflect
        on what the word means to you.
      </Text>
      <Text>
        There are no wrong answers. The goal is to explore your emotional
        vocabulary and use writing as a way to connect with your inner
        experience.
      </Text>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </Card>
  </Overlay>
)

export default InfoModal
