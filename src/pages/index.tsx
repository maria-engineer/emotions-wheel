import React, { useState } from "react"
import type { EmotionLevel } from "../types/emotions"
import Layout from "../components/Layout"
import LevelSelector from "../components/LevelSelector"
import EmotionsWheel from "../components/EmotionsWheel"
import SpinButton from "../components/SpinButton"
import SkipAnimationToggle from "../components/SkipAnimationToggle"
import ResultPopup from "../components/ResultPopup"
import InfoButton from "../components/InfoButton"
import { useWheelSpin } from "../hooks/useWheelSpin"

const IndexPage = () => {
  const [level, setLevel] = useState<EmotionLevel>(1)
  const [skipAnimation, setSkipAnimation] = useState(false)
  const wheelSpin = useWheelSpin(level, skipAnimation)

  return (
    <Layout>
      <InfoButton />
      <LevelSelector level={level} onLevelChange={setLevel} />
      <EmotionsWheel
        level={level}
        rotation={wheelSpin.rotation}
        skipAnimation={skipAnimation}
        onSpinComplete={wheelSpin.onSpinComplete}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "24px" }}>
        <SpinButton onClick={wheelSpin.spin} disabled={wheelSpin.isSpinning} />
        <SkipAnimationToggle checked={skipAnimation} onChange={setSkipAnimation} />
      </div>
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
