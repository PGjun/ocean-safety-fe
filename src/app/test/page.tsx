import Canvas from './Canvas'
import CanvasComponent from './Canvas2'
import GoogleMapWrapper from './GoogleMapWrapper'
import QrScanner from './QrScanner'

export default function TestPage() {
  return (
    <div className="m-[30px]">
      <GoogleMapWrapper />
      <div className="mt-[50px]">
        <Canvas />
      </div>
      <div className="mt-[50px] w-[190px]">
        <div>
          <QrScanner />
        </div>
      </div>
      <div className="mt-[50px]">
        <CanvasComponent />
      </div>
    </div>
  )
}
