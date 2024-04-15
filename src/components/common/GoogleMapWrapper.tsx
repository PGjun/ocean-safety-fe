'use client'
import React, { useCallback, useEffect, useState } from 'react'
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
  lng: 126.99381270667426,
  lat: 37.54093324516149,
}

function GoogleMapWrapper({
  location,
}: {
  location?: { lng: number; lat: number }
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    language: 'ko',
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)

  // 기본값으로 center 사용
  const currentCenter = location ?? center

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // const initialMarker = new google.maps.Marker({
    //   position: currentCenter,
    //   map: map,
    //   title: '여기는 어디인가요?',
    // })
    setMap(map)
    // setMarker(initialMarker)
  }, [])

  useEffect(() => {
    if (map && marker) {
      // 새 위치로 지도 중심 이동
      map.setCenter(currentCenter)
      // 마커 위치 업데이트
      marker.setPosition(currentCenter)
    }
  }, [currentCenter, map, marker])

  const onUnmount = useCallback(function callback() {
    setMap(null)
    setMarker(null)
  }, [])

  const onCenterChanged = useCallback(() => {
    if (map) {
      const newCenter = map.getCenter()
      console.log(newCenter?.lat(), newCenter?.lng())
    }
  }, [map])

  const currentPath = usePathname()
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onCenterChanged={onCenterChanged} // 지도 중심 변경 이벤트 핸들러 추가
      >
        <>
          <OverlayView position={currentCenter} mapPaneName="overlayLayer">
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
            position={currentCenter}
            onClick={() => alert('마커 클릭')}
            icon={{
              url: '/icons/map-marker.svg', // 이 경로는 서버에서 접근 가능한 경로로 설정해야 합니다.
            }}
          />
        </>
      </GoogleMap>
    </>
  ) : (
    <></>
  )
}

export default React.memo(GoogleMapWrapper)
