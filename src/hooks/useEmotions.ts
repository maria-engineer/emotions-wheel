import { useMemo } from "react"
import type { EmotionEntry, EmotionLevel } from "../types/emotions"
import csvData from "../data/emotions.csv"

function parseCSV(raw: string): EmotionEntry[] {
  const lines = raw.trim().split("\n")
  // skip header
  return lines.slice(1).map(line => {
    const [core, secondary, tertiary] = line.split(",").map(s => s.trim())
    return { core, secondary, tertiary }
  })
}

const allEmotions = parseCSV(csvData)

export function getEmotionsForLevel(level: EmotionLevel): string[] {
  switch (level) {
    case 1:
      return [...new Set(allEmotions.map(e => e.core))]
    case 2:
      return [...new Set(allEmotions.map(e => e.secondary))]
    case 3:
      return [...new Set(allEmotions.map(e => e.tertiary))]
  }
}

export function getEmotionPath(emotion: string, level: EmotionLevel): string[] {
  const entry = allEmotions.find(e => {
    switch (level) {
      case 1: return e.core === emotion
      case 2: return e.secondary === emotion
      case 3: return e.tertiary === emotion
    }
  })
  if (!entry) return [emotion]
  switch (level) {
    case 1: return [entry.core]
    case 2: return [entry.core, entry.secondary]
    case 3: return [entry.core, entry.secondary, entry.tertiary]
  }
}

export function useEmotions(level: EmotionLevel) {
  return useMemo(() => getEmotionsForLevel(level), [level])
}

export { allEmotions }
