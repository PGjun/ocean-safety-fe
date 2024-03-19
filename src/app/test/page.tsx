import Canvas from './Canvas'
import GoogleMapWrapper from './GoogleMapWrapper'
import QrScanner from './QrScanner'

export default function TestPage() {
  return (
    <div className="m-[30px]">
      <GoogleMapWrapper />
      <div className="mt-[50px]">
        <Canvas />
      </div>
      <div className="mt-[50px]">
        <QrScanner />
      </div>
    </div>
  )
}
