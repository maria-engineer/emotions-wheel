import { useState, useCallback, useRef } from "react"
import type { EmotionLevel } from "../types/emotions"
import { getEmotionAtDegree, pickRandomDegree } from "../utils/degreeMapping"

interface SpinResult {
  emotion: string
  path: string[]
}

interface UseWheelSpinReturn {
  rotation: number
  isSpinning: boolean
  result: SpinResult | null
  spin: () => void
  clearResult: () => void
  onSpinComplete: () => void
}

export function useWheelSpin(
  level: EmotionLevel,
  skipAnimation: boolean
): UseWheelSpinReturn {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<SpinResult | null>(null)
  const cumulativeRotation = useRef(0)

  const spin = useCallback(() => {
    setResult(null)
    const targetDegree = pickRandomDegree()

    // The pointer is at 12 o'clock (0 degrees). The wheel rotates clockwise.
    // When the wheel rotates by X degrees, the pointer effectively points at
    // the position (360 - X % 360) on the wheel's coordinate system.
    // So we need to spin so that (360 - totalRotation % 360) === targetDegree
    // Which means totalRotation % 360 === (360 - targetDegree) % 360
    const landingOffset = (360 - targetDegree) % 360

    // Add 4-5 full rotations for drama
    const extraSpins = (4 + Math.floor(Math.random() * 2)) * 360

    // Calculate how much more we need to rotate from current position
    const currentMod = cumulativeRotation.current % 360
    let delta = landingOffset - currentMod
    if (delta < 0) delta += 360

    const totalDelta = extraSpins + delta
    const newRotation = cumulativeRotation.current + totalDelta

    cumulativeRotation.current = newRotation

    if (skipAnimation) {
      setRotation(newRotation)
      setResult(getEmotionAtDegree(targetDegree, level))
      // isSpinning stays false — instant result
    } else {
      setIsSpinning(true)
      setRotation(newRotation)
      // onAnimationComplete in the component will call handleSpinComplete
    }
  }, [level, skipAnimation])

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false)
    // Derive the landed degree from the current cumulative rotation
    const landedMod = cumulativeRotation.current % 360
    const pointerDegree = (360 - landedMod) % 360
    setResult(getEmotionAtDegree(pointerDegree, level))
  }, [level])

  const clearResult = useCallback(() => {
    setResult(null)
  }, [])

  return {
    rotation,
    isSpinning,
    result,
    spin,
    clearResult,
    onSpinComplete: handleSpinComplete,
  }
}
