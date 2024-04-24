import React, { useState, useRef, useEffect, useCallback } from 'react'

interface Dot {
  x: number
  y: number
}

interface Rect {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface Canvas {
  dots: Dot[]
  onDotsChange: any
  width: number
  height: number
}

function CanvasRect({ dots, onDotsChange, width = 400, height = 400 }: Canvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState<Dot | null>(null)
  const [endPos, setEndPos] = useState<Dot | null>(null)

  const updateDots = (newDots: Dot[]) => {
    onDotsChange(newDots)
  }

  const drawRect = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw existing dots
    dots.forEach((dot, index) => {
      ctx.fillStyle = '#2262C6'
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI)
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.fillText((index + 1).toString(), dot.x, dot.y)
    })

    // Draw rectangle if currently drawing
    if (isDrawing && startPos && endPos) {
      const rect: Rect = {
        x1: Math.min(startPos.x, endPos.x),
        y1: Math.min(startPos.y, endPos.y),
        x2: Math.max(startPos.x, endPos.x),
        y2: Math.max(startPos.y, endPos.y),
      }

      ctx.strokeStyle = 'rgba(34, 98, 198, 0.8)' // Set the stroke color
      ctx.lineWidth = 2 // Set the line width
      ctx.strokeRect(rect.x1, rect.y1, rect.x2 - rect.x1, rect.y2 - rect.y1) // Draw the rectangle border
    }
  }, [dots, isDrawing, startPos, endPos])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = width
      canvas.height = height
      drawRect()
    }
  }, [width, height, drawRect])

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    const { offsetX, offsetY } = event.nativeEvent

    // Start drawing rectangle
    setIsDrawing(true)
    setStartPos({ x: offsetX, y: offsetY })
    setEndPos({ x: offsetX, y: offsetY })
  }

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!isDrawing) return

    const { offsetX, offsetY } = event.nativeEvent
    setEndPos({ x: offsetX, y: offsetY })
  }

  const handleMouseUp = () => {
    if (isDrawing && startPos && endPos) {
      // Save the drawn rectangle
      const rect: Rect = {
        x1: Math.min(startPos.x, endPos.x),
        y1: Math.min(startPos.y, endPos.y),
        x2: Math.max(startPos.x, endPos.x),
        y2: Math.max(startPos.y, endPos.y),
      }

      // Optional: Add the rectangle as dots
      const newDots = [
        ...dots,
        { x: rect.x1, y: rect.y1 },
        { x: rect.x2, y: rect.y2 },
      ]
      updateDots(newDots)
    }

    // Reset drawing state
    setIsDrawing(false)
    setStartPos(null)
    setEndPos(null)
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="bg-transparent"
        style={{ border: '1px solid #000' }}
      />
    </div>
  )
}

export default CanvasRect
