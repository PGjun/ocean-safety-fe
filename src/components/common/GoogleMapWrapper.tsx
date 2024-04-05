'use client'
import React from 'react'
import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from '@react-google-maps/api'
import { usePathname } from 'next/navigation'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 37.54093324516149,
  lng: 126.99381270667426,
}

function GoogleMapWrapper() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    language: 'ko',
  })

  const [map, setMap] = React.useState<any>(null)

  const [currentCenter, setCurrentCenter] = React.useState(center)

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)

    // 마커를 추가합니다.
    new window.google.maps.Marker({
      position: center,
      map: map,
      title: '여기는 어디인가요?', // 마커에 마우스를 올렸을 때 보여줄 텍스트입니다.
    })
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const onCenterChanged = () => {
    if (map) {
      const newCenter = map.getCenter()
      setCurrentCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      })
    }
  }

  const currentPath = usePathname()

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onCenterChanged={onCenterChanged} // 지도 중심 변경 이벤트 핸들러 추가
      >
        <>
          <OverlayView position={center} mapPaneName="overlayLayer">
            {currentPath !== '/sos/detail' ? (
              <div className="absolute -left-[55px] -top-[80px] flex w-[108px] flex-col items-center rounded-[10px] bg-[#FF3819] py-[8px] text-[12px] font-bold text-white">
                SOS Location
              </div>
            ) : (
              <div className="absolute -left-[130px] -top-[135px] flex w-[257px] flex-col items-center rounded-[10px] bg-[#FF3819] py-[8px] text-[18px] font-bold text-white">
                SOS Location Tracking
                <div className="mt-[8px] text-[16px] font-normal">이정희</div>
                <div className="text-[12px] font-normal">
                  TIME : 2024-03-01 16:00:00
                </div>
              </div>
            )}
          </OverlayView>
          <Marker
            position={center}
            onClick={() => alert('마커 클릭')}
            // label={{
            //   text: 'SOS Location', // 여기에 표시하고 싶은 텍스트를 입력하세요.
            //   color: 'white', // 텍스트 색상
            //   fontSize: '12px', // 텍스트 크기
            //   fontWeight: 'bold', // 글자 두께
            //   className:
            //     'absolute bg-[#FF3819] rounded-[10px] px-[16px] py-[7px] -top-[5px] -left-[55px]',
            // }}
            icon={{
              url: '/icons/map-marker.svg', // 이 경로는 서버에서 접근 가능한 경로로 설정해야 합니다.
              // 필요하다면 크기 조정도 가능합니다:
              // scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        </>
      </GoogleMap>
      {/* <div>{currentCenter.lat}</div>
      <div>{currentCenter.lng}</div> */}
    </>
  ) : (
    <></>
  )
}

export default React.memo(GoogleMapWrapper)
