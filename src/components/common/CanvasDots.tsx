'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'

interface Dot {
  x: number
  y: number
}

interface Canvas {
  dots: Dot[]
  onDotsChange: any
  width: number
  height: number
}

function CanvasDots({ dots, onDotsChange, width = 400, height = 400 }: Canvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // const [dots, setDots] = useState<Dot[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null)

  // 기존 코드와 동일, dots 상태 업데이트 후 onDotsChange 호출 추가:
  const updateDots = (newDots: any) => {
    // setDots(newDots)
    onDotsChange(newDots)
  }

  const drawDots = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dots.forEach((dot, index) => {
      // 점 그리기
      ctx.fillStyle = '#2262C6'
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 10, 0, 2 * Math.PI)
      ctx.fill()

      // 텍스트 그리기
      ctx.fillStyle = 'white' // 텍스트 색상
      // ctx.font = `${10 * 2.5}px` // 폰트 크기 점 크기에 비례
      ctx.textBaseline = 'middle' // 중앙 정렬
      ctx.textAlign = 'center' // 중앙 정렬
      ctx.fillText((index + 1).toString(), dot.x, dot.y)
    })
  }, [dots])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = width
      canvas.height = height
      drawDots()
    }
  }, [width, height, drawDots])

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    const { offsetX, offsetY } = event.nativeEvent
    const clickedDotIndex = dots.findIndex(
      (dot) => Math.sqrt((offsetX - dot.x) ** 2 + (offsetY - dot.y) ** 2) <= 5,
    )

    if (clickedDotIndex !== -1) {
      const newDots = dots.filter((_, index) => index !== clickedDotIndex)
      updateDots(newDots)
      // setDots(newDots)
    } else {
      const newDots = [...dots, { x: offsetX, y: offsetY }]
      updateDots(newDots)
      // setDots(newDots)
      setDragStartIndex(newDots.length - 1)
      setIsDragging(true)
    }
  }

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!isDragging || dragStartIndex === null) return
    const { offsetX, offsetY } = event.nativeEvent
    const newDots = [...dots]
    newDots[dragStartIndex] = { x: offsetX, y: offsetY }
    updateDots(newDots)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragStartIndex(null)
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
      {/* <p>점 개수: {dots.length}</p> */}
    </div>
  )
}

export default CanvasDots
