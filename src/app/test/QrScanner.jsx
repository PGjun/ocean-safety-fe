'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false })

const QrScanner = () => {
  const [result, setResult] = useState('No result')

  const handleScan = (data) => {
    if (data) {
      setResult(data.text)
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }

  return (
    <div>
      <QrReader
        delay={100}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result}</p>
    </div>
  )
}

export default QrScanner
