export const coreColors: Record<string, { base: string; mid: string; light: string }> = {
  Fearful: { base: "#6F3D79", mid: "#8B5E95", light: "#A77FB1" },
  Angry: { base: "#D64045", mid: "#E06A6E", light: "#EA9497" },
  Disgusted: { base: "#C97B3D", mid: "#D49A66", light: "#DFB98F" },
  Sad: { base: "#2D3561", mid: "#4A5280", light: "#676FA0" },
  Happy: { base: "#E8A838", mid: "#EDC068", light: "#F2D898" },
  Surprised: { base: "#3A7D44", mid: "#5E9A66", light: "#82B788" },
  Bad: { base: "#4A6B3E", mid: "#6E8F62", light: "#92B386" },
}

export const theme = {
  colors: {
    background: "#1a1a2e",
    surface: "#16213e",
    surfaceLight: "#0f3460",
    text: "#eee",
    textSecondary: "#aaa",
    accent: "#e94560",
  },
  spacing: (n: number) => `${n * 8}px`,
  borderRadius: "8px",
}
