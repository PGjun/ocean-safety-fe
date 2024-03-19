'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false })

const QrScanner = () => {
  const [qrOpen, setQrOpen] = useState(false)
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

  // useEffect(() => {
  //   if (result !== 'No result') {
  //     window.open(result)
  //   }
  // }, [result])

  return (
    <div>
      <button
        onClick={() => {
          setResult('No result')
          setQrOpen(!qrOpen)
        }}
        className="rounded-xl bg-blue-500 p-[10px] text-[24px] font-bold text-white"
      >
        QR 스캔
      </button>
      {qrOpen && (
        <>
          <QrReader
            delay={100}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
          <p>
            {result !== 'No result' && (
              <button
                onClick={() => {
                  window.open(result)
                }}
                className="rounded-xl border border-blue-500 p-[10px] text-[24px] font-bold "
              >
                {result}
              </button>
            )}
          </p>
        </>
      )}
    </div>
  )
}

export default QrScanner
