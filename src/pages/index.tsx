import React, { useState } from "react"
import styled from "@emotion/styled"
import type { EmotionLevel } from "../types/emotions"
import { theme } from "../styles/theme"
import Layout from "../components/Layout"
import LevelSelector from "../components/LevelSelector"
import EmotionsWheel from "../components/EmotionsWheel"
import SpinButton from "../components/SpinButton"
import SkipAnimationToggle from "../components/SkipAnimationToggle"
import ResultPopup from "../components/ResultPopup"
import InfoButton from "../components/InfoButton"
import { useWheelSpin } from "../hooks/useWheelSpin"

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(2)};
  flex-wrap: wrap;
  justify-content: center;
`

const IndexPage = () => {
  const [level, setLevel] = useState<EmotionLevel>(1)
  const [skipAnimation, setSkipAnimation] = useState(false)
  const wheelSpin = useWheelSpin(level, skipAnimation)

  return (
    <Layout>
      <InfoButton />
      <Controls>
        <LevelSelector level={level} onLevelChange={setLevel} />
        <SpinButton onClick={wheelSpin.spin} disabled={wheelSpin.isSpinning} />
        <SkipAnimationToggle checked={skipAnimation} onChange={setSkipAnimation} />
      </Controls>
      <EmotionsWheel
        level={level}
        rotation={wheelSpin.rotation}
        skipAnimation={skipAnimation}
        onSpinComplete={wheelSpin.onSpinComplete}
      />
      {wheelSpin.result && (
        <ResultPopup
          emotion={wheelSpin.result.emotion}
          path={wheelSpin.result.path}
          onClose={wheelSpin.clearResult}
        />
      )}
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Emotions Wheel</title>
