import React, { useRef, useEffect, useCallback } from 'react'

interface Dot {
  x: number
  y: number
  user_index: string
  user_name: string
}

interface Canvas {
  dots: Dot[]
  onSelectDot: (dot: Dot) => void
  width: number
  height: number
}

function CrewLocationDots({
  dots,
  onSelectDot,
  width = 400,
  height = 400,
}: Canvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoverRef = useRef<number | null>(null)

  const drawDots = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dots.forEach((dot, index) => {
      ctx.fillStyle = '#2262C6'
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 10, 0, 2 * Math.PI)
      ctx.fill()

      if (hoverRef.current === index) {
        ctx.fillStyle = 'white'
        // 그림자 설정
        ctx.shadowColor = 'black'
        ctx.shadowBlur = 3
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 0
        ctx.fillText(dot.user_name, dot.x, dot.y - 15) // 이름을 도트 위에 표시
        // 그림자 리셋
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      }

      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
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

  const handleMouseOver = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const { offsetX, offsetY } = event.nativeEvent
      const index = dots.findIndex(
        (dot) =>
          Math.sqrt((offsetX - dot.x) ** 2 + (offsetY - dot.y) ** 2) <= 10,
      )
      hoverRef.current = index
      drawDots()
    },
    [dots, drawDots],
  )

  const handleMouseOut = useCallback(() => {
    hoverRef.current = null
    drawDots()
  }, [drawDots])

  const handleMouseClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const { offsetX, offsetY } = event.nativeEvent
      const index = dots.findIndex(
        (dot) =>
          Math.sqrt((offsetX - dot.x) ** 2 + (offsetY - dot.y) ** 2) <= 10,
      )
      if (index !== -1) {
        onSelectDot(dots[index]) // 클릭한 도트 정보를 부모 컴포넌트로 전달
      }
    },
    [dots, onSelectDot],
  )

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleMouseClick}
        className="bg-transparent"
      />
    </div>
  )
}

export default CrewLocationDots
