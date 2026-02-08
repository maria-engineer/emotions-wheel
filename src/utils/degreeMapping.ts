import type { EmotionLevel, WheelSegment } from "../types/emotions"
import { getEmotionPath, allEmotions } from "../hooks/useEmotions"
import { coreColors } from "../styles/theme"

export interface WheelLayout {
  core: WheelSegment[]
  secondary: WheelSegment[]
  tertiary: WheelSegment[]
}

/**
 * Build the full concentric wheel layout.
 * All 82 tertiary emotions get equal-width slices (360/82 each).
 * Secondary and core spans are derived by grouping their children.
 */
export function buildWheelLayout(): WheelLayout {
  const tertiarySliceAngle = 360 / allEmotions.length
  const tertiarySegments: WheelSegment[] = []
  const secondarySegments: WheelSegment[] = []
  const coreSegments: WheelSegment[] = []

  // Build tertiary segments (equal width, in CSV order)
  allEmotions.forEach((entry, i) => {
    const colors = coreColors[entry.core]
    tertiarySegments.push({
      label: entry.tertiary,
      startAngle: i * tertiarySliceAngle,
      endAngle: (i + 1) * tertiarySliceAngle,
      color: colors?.light || "#666",
      core: entry.core,
      secondary: entry.secondary,
    })
  })

  // Build secondary segments by grouping consecutive tertiary with same secondary
  let secStart = 0
  let currentSecondary = allEmotions[0].secondary
  for (let i = 1; i <= allEmotions.length; i++) {
    const entry = allEmotions[i]
    if (i === allEmotions.length || entry.secondary !== currentSecondary) {
      const coreEntry = allEmotions[secStart]
      const colors = coreColors[coreEntry.core]
      secondarySegments.push({
        label: currentSecondary,
        startAngle: secStart * tertiarySliceAngle,
        endAngle: i * tertiarySliceAngle,
        color: colors?.mid || "#666",
        core: coreEntry.core,
        secondary: currentSecondary,
      })
      if (i < allEmotions.length) {
        secStart = i
        currentSecondary = entry.secondary
      }
    }
  }

  // Build core segments by grouping consecutive secondary with same core
  let coreStart = 0
  let currentCore = allEmotions[0].core
  for (let i = 1; i <= allEmotions.length; i++) {
    const entry = allEmotions[i]
    if (i === allEmotions.length || entry.core !== currentCore) {
      const colors = coreColors[currentCore]
      coreSegments.push({
        label: currentCore,
        startAngle: coreStart * tertiarySliceAngle,
        endAngle: i * tertiarySliceAngle,
        color: colors?.base || "#666",
        core: currentCore,
      })
      if (i < allEmotions.length) {
        coreStart = i
        currentCore = entry.core
      }
    }
  }

  return { core: coreSegments, secondary: secondarySegments, tertiary: tertiarySegments }
}

// Cache the layout since it never changes
let _cachedLayout: WheelLayout | null = null
export function getWheelLayout(): WheelLayout {
  if (!_cachedLayout) _cachedLayout = buildWheelLayout()
  return _cachedLayout
}

/**
 * Given a degree (0-359) and a selected level, find which emotion the pointer lands on.
 */
export function getEmotionAtDegree(
  degree: number,
  level: EmotionLevel
): { emotion: string; path: string[] } {
  const layout = getWheelLayout()
  const segments =
    level === 1 ? layout.core : level === 2 ? layout.secondary : layout.tertiary

  const normalized = ((degree % 360) + 360) % 360

  const segment = segments.find(
    s => normalized >= s.startAngle && normalized < s.endAngle
  )
  const found = segment || segments[0]

  return {
    emotion: found.label,
    path: getEmotionPath(found.label, level),
  }
}

export function pickRandomDegree(): number {
  return Math.floor(Math.random() * 360)
}
