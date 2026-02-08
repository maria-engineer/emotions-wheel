import React, { useMemo } from "react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import WheelSegment from "./WheelSegment"
import { getWheelLayout } from "../utils/degreeMapping"
import type { EmotionLevel } from "../types/emotions"

const WheelContainer = styled.div`
  position: relative;
  width: 90vw;
  max-width: 700px;
  aspect-ratio: 1;
`

const Pointer = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 24px solid #e94560;
  z-index: 10;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
`

const SIZE = 500
const CX = SIZE / 2
const CY = SIZE / 2

// Ring radii
const CENTER_R = 20
const CORE_INNER = CENTER_R
const CORE_OUTER = 85
const SEC_INNER = CORE_OUTER
const SEC_OUTER = 160
const TERT_INNER = SEC_OUTER
const TERT_OUTER = 245

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
  const layout = useMemo(() => getWheelLayout(), [])

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
        {/* Center circle */}
        <circle cx={CX} cy={CY} r={CENTER_R} fill="#1a1a2e" />

        {/* Core ring (innermost) */}
        {layout.core.map(seg => (
          <WheelSegment
            key={`core-${seg.label}`}
            label={seg.label}
            startAngle={seg.startAngle}
            endAngle={seg.endAngle}
            color={seg.color}
            innerRadius={CORE_INNER}
            outerRadius={CORE_OUTER}
            cx={CX}
            cy={CY}
          />
        ))}

        {/* Secondary ring (middle) */}
        {layout.secondary.map(seg => (
          <WheelSegment
            key={`sec-${seg.label}`}
            label={seg.label}
            startAngle={seg.startAngle}
            endAngle={seg.endAngle}
            color={seg.color}
            innerRadius={SEC_INNER}
            outerRadius={SEC_OUTER}
            cx={CX}
            cy={CY}
          />
        ))}

        {/* Tertiary ring (outermost) */}
        {layout.tertiary.map((seg, i) => (
          <WheelSegment
            key={`tert-${seg.label}-${i}`}
            label={seg.label}
            startAngle={seg.startAngle}
            endAngle={seg.endAngle}
            color={seg.color}
            innerRadius={TERT_INNER}
            outerRadius={TERT_OUTER}
            cx={CX}
            cy={CY}
          />
        ))}
      </motion.svg>
    </WheelContainer>
  )
}

export default EmotionsWheel
