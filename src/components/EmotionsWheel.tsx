import React, { useMemo } from "react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import WheelSegment from "./WheelSegment"
import { getSegmentsForLevel } from "../utils/degreeMapping"
import type { EmotionLevel } from "../types/emotions"

const WheelContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
`

const Pointer = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid #e94560;
  z-index: 10;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
`

const SIZE = 400
const CX = SIZE / 2
const CY = SIZE / 2
const CENTER_RADIUS = 30
const OUTER_RADIUS = 195

interface Props {
  level: EmotionLevel
  rotation: number
  skipAnimation: boolean
  onSpinComplete: () => void
}

const EmotionsWheel: React.FC<Props> = ({
  level,
  rotation,
  skipAnimation,
  onSpinComplete,
}) => {
  const segments = useMemo(() => getSegmentsForLevel(level), [level])

  return (
    <WheelContainer>
      <Pointer />
      <motion.svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        height="100%"
        animate={{ rotate: rotation }}
        transition={
          skipAnimation
            ? { duration: 0 }
            : { duration: 3.5, ease: [0.15, 0.7, 0.3, 1] }
        }
        onAnimationComplete={onSpinComplete}
      >
        <circle cx={CX} cy={CY} r={CENTER_RADIUS} fill="#1a1a2e" />
        {segments.map(seg => (
          <WheelSegment
            key={seg.label}
            label={seg.label}
            startAngle={seg.startAngle}
            endAngle={seg.endAngle}
            color={seg.color}
            innerRadius={CENTER_RADIUS}
            outerRadius={OUTER_RADIUS}
            cx={CX}
            cy={CY}
          />
        ))}
      </motion.svg>
    </WheelContainer>
  )
}

export default EmotionsWheel
