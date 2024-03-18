// import React, { useState } from 'react'
// import { QrReader } from 'react-qr-reader'

// const QRCodeScanner = () => {
//   const [data, setData] = useState('QR 코드를 스캔해주세요')

//   const handleResult = (result, error) => {
//     if (!!result) {
//       setData(result?.text) // result 객체에서 text 속성을 사용해 QR 코드 데이터를 가져옵니다.
//     }

//     if (!!error) {
//       console.error(error)
//     }
//   }

//   return (
//     <div>
//       <QrReader
//         delay={3000}
//         onResult={handleResult}
//         style={{ width: '100%' }}
//       />
//       <p>{data}</p>
//     </div>
//   )
// }

// export default QRCodeScanner
