export interface EmotionEntry {
  core: string
  secondary: string
  tertiary: string
}

export type EmotionLevel = 1 | 2 | 3

export interface WheelSegment {
  label: string
  startAngle: number
  endAngle: number
  color: string
  core: string
  secondary?: string
}
