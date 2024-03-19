// pages/index.js 또는 다른 페이지 컴포넌트
'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const QRCodeScanner = dynamic(() => import('@/app/qrcode/QRCodeScanner '), {
  ssr: false, // 서버 사이드 렌더링을 비활성화
})

export default function Home() {
  return (
    <div>
      <h1>QR 코드 스캐너</h1>
      <QRCodeScanner />
    </div>
  )
}
