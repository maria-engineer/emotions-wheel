import type { EmotionLevel, WheelSegment } from "../types/emotions"
import { getEmotionsForLevel, getEmotionPath } from "../hooks/useEmotions"
import { coreColors } from "../styles/theme"
import { allEmotions } from "../hooks/useEmotions"

function getColorForEmotion(emotion: string, level: EmotionLevel): string {
  const entry = allEmotions.find(e => {
    switch (level) {
      case 1: return e.core === emotion
      case 2: return e.secondary === emotion
      case 3: return e.tertiary === emotion
    }
  })
  if (!entry) return "#666"
  const colors = coreColors[entry.core]
  if (!colors) return "#666"
  switch (level) {
    case 1: return colors.base
    case 2: return colors.mid
    case 3: return colors.light
  }
}

export function getSegmentsForLevel(level: EmotionLevel): WheelSegment[] {
  const emotions = getEmotionsForLevel(level)
  const segmentAngle = 360 / emotions.length

  return emotions.map((emotion, i) => ({
    label: emotion,
    startAngle: i * segmentAngle,
    endAngle: (i + 1) * segmentAngle,
    color: getColorForEmotion(emotion, level),
    core: getEmotionPath(emotion, level)[0],
    secondary: level >= 2 ? getEmotionPath(emotion, level)[1] : undefined,
  }))
}

export function getEmotionAtDegree(
  degree: number,
  level: EmotionLevel
): { emotion: string; path: string[] } {
  const segments = getSegmentsForLevel(level)
  // Normalize degree to 0-360
  const normalized = ((degree % 360) + 360) % 360

  const segment = segments.find(
    s => normalized >= s.startAngle && normalized < s.endAngle
  )

  // Edge case: exactly 360 maps to first segment
  const found = segment || segments[0]
  return {
    emotion: found.label,
    path: getEmotionPath(found.label, level),
  }
}

export function pickRandomDegree(): number {
  return Math.floor(Math.random() * 360)
}
