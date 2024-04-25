import React, { useState, useRef, useEffect, useCallback } from 'react'

interface Rect {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface Canvas {
  rects: Rect[]
  onRectsChange: (rects: Rect[]) => void
  width: number
  height: number
}

function CanvasRect({
  rects,
  onRectsChange,
  width = 400,
  height = 400,
}: Canvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null,
  )
  const [currentRect, setCurrentRect] = useState<Rect | null>(null)

  const drawRect = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw all saved rectangles
    rects.forEach((rect, index) => {
      ctx.fillStyle = 'rgba(34, 98, 198, 0.3)'
      ctx.fillRect(
        Math.min(rect.x1, rect.x2),
        Math.min(rect.y1, rect.y2),
        Math.abs(rect.x2 - rect.x1),
        Math.abs(rect.y2 - rect.y1),
      )
      ctx.strokeStyle = 'rgba(34, 98, 198, 0.8)'
      ctx.lineWidth = 2
      ctx.strokeRect(
        Math.min(rect.x1, rect.x2),
        Math.min(rect.y1, rect.y2),
        Math.abs(rect.x2 - rect.x1),
        Math.abs(rect.y2 - rect.y1),
      )
      // Draw text and circle around it
      const centerX = (rect.x1 + rect.x2) / 2
      const centerY = (rect.y1 + rect.y2) / 2
      ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI) // Adjust the radius as needed
      ctx.fillStyle = '#2262C6' // Semi-transparent white circle
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${index + 1}`, centerX, centerY)
      ctx.beginPath()
    })

    // Draw the current rectangle if currently drawing
    if (currentRect) {
      ctx.fillStyle = 'rgba(34, 98, 198, 0.5)'
      ctx.fillRect(
        Math.min(currentRect.x1, currentRect.x2),
        Math.min(currentRect.y1, currentRect.y2),
        Math.abs(currentRect.x2 - currentRect.x1),
        Math.abs(currentRect.y2 - currentRect.y1),
      )
      ctx.strokeStyle = 'rgba(34, 98, 198, 1)'
      ctx.lineWidth = 2
      ctx.strokeRect(
        Math.min(currentRect.x1, currentRect.x2),
        Math.min(currentRect.y1, currentRect.y2),
        Math.abs(currentRect.x2 - currentRect.x1),
        Math.abs(currentRect.y2 - currentRect.y1),
      )
    }
  }, [rects, currentRect])

  useEffect(() => {
    drawRect()
  }, [drawRect])

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent
    // Check if a rectangle is clicked
    const clickedIndex = rects.findIndex(
      (rect) =>
        offsetX >= Math.min(rect.x1, rect.x2) &&
        offsetX <= Math.max(rect.x1, rect.x2) &&
        offsetY >= Math.min(rect.y1, rect.y2) &&
        offsetY <= Math.max(rect.y1, rect.y2),
    )

    if (clickedIndex !== -1) {
      // Remove the clicked rectangle
      const newRects = rects.filter((_, index) => index !== clickedIndex)
      onRectsChange(newRects)
    } else {
      // Start drawing a new rectangle
      setStartPos({ x: offsetX, y: offsetY })
      setIsDrawing(true)
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return
    const { offsetX, offsetY } = event.nativeEvent
    setCurrentRect({
      x1: startPos.x,
      y1: startPos.y,
      x2: offsetX,
      y2: offsetY,
    })
  }

  const handleMouseUp = () => {
    if (currentRect) {
      onRectsChange([...rects, currentRect])
    }
    setIsDrawing(false)
    setCurrentRect(null)
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="bg-transparent"
        width={width}
        height={height}
      />
    </div>
  )
}

export default CanvasRect
