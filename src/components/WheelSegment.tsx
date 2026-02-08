import React from "react"

interface Props {
  label: string
  startAngle: number
  endAngle: number
  color: string
  innerRadius: number
  outerRadius: number
  cx: number
  cy: number
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
): string {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle)
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle)
  const innerStart = polarToCartesian(cx, cy, innerR, endAngle)
  const innerEnd = polarToCartesian(cx, cy, innerR, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ")
}

const WheelSegment: React.FC<Props> = ({
  label,
  startAngle,
  endAngle,
  color,
  innerRadius,
  outerRadius,
  cx,
  cy,
}) => {
  const midAngle = (startAngle + endAngle) / 2
  const labelRadius = (innerRadius + outerRadius) / 2
  const labelPos = polarToCartesian(cx, cy, labelRadius, midAngle)
  const segmentSpan = endAngle - startAngle
  const ringWidth = outerRadius - innerRadius

  // Rotate text along the radius
  const textRotation = midAngle > 180 ? midAngle + 90 : midAngle - 90

  // Scale font: use arc width at label radius to determine max size
  const arcWidthAtLabel =
    2 * Math.PI * labelRadius * (segmentSpan / 360)
  // Font size based on whichever dimension is tighter
  const fontSize = Math.min(
    ringWidth * 0.28,
    arcWidthAtLabel * 0.85,
    14
  )

  return (
    <g>
      <path
        d={arcPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle)}
        fill={color}
        stroke="#1a1a2e"
        strokeWidth={0.5}
      />
      {fontSize >= 3 && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fill="white"
          fontSize={fontSize}
          fontWeight={segmentSpan > 20 ? 600 : 400}
          textAnchor="middle"
          dominantBaseline="central"
          transform={`rotate(${textRotation}, ${labelPos.x}, ${labelPos.y})`}
        >
          {label}
        </text>
      )}
    </g>
  )
}

export default WheelSegment
