import React, { useRef, useEffect } from 'react'

interface Rect {
  id: number
  area_name: string
  x1: number
  y1: number
  x2: number
  y2: number
}

interface Canvas {
  rects: Rect[]
  width: number
  height: number
}

function RestrictRects({ rects, width = 400, height = 400 }: Canvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    rects.forEach((rect) => {
      ctx.fillStyle = 'rgba(34, 98, 198, 0.5)'
      ctx.fillRect(
        Math.min(rect.x1, rect.x2),
        Math.min(rect.y1, rect.y2),
        Math.abs(rect.x2 - rect.x1),
        Math.abs(rect.y2 - rect.y1),
      )
      ctx.strokeStyle = 'rgba(34, 98, 198, 1)'
      ctx.lineWidth = 2
      ctx.strokeRect(
        Math.min(rect.x1, rect.x2),
        Math.min(rect.y1, rect.y2),
        Math.abs(rect.x2 - rect.x1),
        Math.abs(rect.y2 - rect.y1),
      )

      // Draw text in the middle of the rectangle
      const centerX = (rect.x1 + rect.x2) / 2
      const centerY = (rect.y1 + rect.y2) / 2
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${rect.id} - ${rect.area_name}`, centerX, centerY)
    })
  }, [rects])

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="bg-transparent"
        width={width}
        height={height}
      />
    </div>
  )
}

export default RestrictRects
