'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const shipImage = new Image()

    shipImage.onload = () => {
      ctx.drawImage(shipImage, 0, 0, canvas.width, canvas.height)
      drawCrewPositions()
    }
    shipImage.src = '/ship.png' // 배 이미지 경로

    const crewPositions = [
      { name: '승조원1', x: 120, y: 450 },
      { name: '승조원2', x: 200, y: 550 },
      // 추가 승조원 위치 정보
    ]

    function drawCrewPositions() {
      crewPositions.forEach((crew) => {
        ctx.beginPath()
        ctx.arc(crew.x, crew.y, 10, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()

        ctx.fillStyle = 'white'
        ctx.fillText(crew.name, crew.x + 12, crew.y + 3)
      })
    }
  }, [])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="800"
        height="600"
        style={{ border: '1px solid #000' }}
      ></canvas>
    </div>
  )
}
