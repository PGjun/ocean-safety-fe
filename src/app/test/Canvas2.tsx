'use client'

import { useState, useRef, useEffect } from 'react'

function CanvasComponent() {
  const canvasRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const [isDragging, setIsDragging] = useState(false)

  // Canvas와 빨간 점 초기화
  useEffect(() => {
    const canvas: any = canvasRef.current
    canvas.width = 400
    canvas.height = 400
  }, [])

  // 빨간 점 그리기
  const drawDot = (x: any, y: any) => {
    const canvas: any = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height) // 이전 점을 지우고 새로 그림
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI)
    ctx.fill()
  }

  // 클릭하여 점 찍기
  const handleMouseDown = (event: any) => {
    setIsDragging(true)
    const { offsetX, offsetY } = event.nativeEvent
    setMousePosition({ x: offsetX, y: offsetY })
    drawDot(offsetX, offsetY)
  }

  // 드래그하여 점 움직이기
  const handleMouseMove = (event: any) => {
    if (!isDragging) return
    const { offsetX, offsetY } = event.nativeEvent
    setMousePosition({ x: offsetX, y: offsetY })
    drawDot(offsetX, offsetY)
  }

  // 드래그 끝내기
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp} // 캔버스 밖으로 마우스가 나갔을 때 드래그 끝내기
        style={{ border: '1px solid #000' }}
      />
      {mousePosition.x && mousePosition.y && (
        <p>
          위치: X={mousePosition.x}, Y={mousePosition.y}
        </p>
      )}
    </div>
  )
}

export default CanvasComponent
