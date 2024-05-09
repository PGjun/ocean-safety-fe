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
  preLocaion1,
  preLocaion2,
  info,
}: {
  location?: { lng: number; lat: number }
  preLocaion1?: {
    location: { lng: number; lat: number }
    // name: string
    sos_date: string
  }
  preLocaion2?: {
    location: { lng: number; lat: number }
    // name: string
    sos_date: string
  }
  info?: { name: string; sos_date: string }
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
  console.log('🚀 ~ preLocaion1:', preLocaion1)

  const currentPath = usePathname()
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onCenterChanged={onCenterChanged} // 지도 중심 변경 이벤트 핸들러 추가
      >
        <>
          <OverlayView position={currentCenter} mapPaneName="overlayLayer">
            {currentPath !== '/sos/detail' && currentPath !== '/fall/detail' ? (
              <div className="absolute -left-[55px] -top-[80px] flex w-[108px] flex-col items-center rounded-[10px] bg-[#FF3819] py-[8px] text-[12px] font-bold text-white">
                SOS Location
              </div>
            ) : (
              <div className="absolute -left-[130px] -top-[135px] z-30 flex w-[257px] flex-col items-center rounded-[10px] bg-[#FF3819] py-[8px] text-[18px] font-bold text-white">
                SOS Location Tracking
                <div className="mt-[8px] text-[16px] font-normal">
                  {info?.name}
                </div>
                <div className="text-[12px] font-normal">
                  TIME : {info?.sos_date}
                </div>
              </div>
            )}
          </OverlayView>
          <Marker
            zIndex={3}
            position={currentCenter}
            onClick={() => alert('마커 클릭')}
            icon={{
              url: '/icons/map-marker.svg', // 이 경로는 서버에서 접근 가능한 경로로 설정해야 합니다.
            }}
          />

          {preLocaion1 && preLocaion1?.sos_date && (
            <>
              <OverlayView
                position={preLocaion1?.location}
                mapPaneName="overlayLayer"
              >
                <div className="absolute -left-[73px] -top-[70px] z-20 flex w-[150px] flex-col items-center rounded-[10px] bg-[#2262C6] py-[8px] text-[12px] font-bold text-white">
                  {preLocaion1.sos_date}
                </div>
              </OverlayView>
              <Marker
                zIndex={2}
                position={preLocaion1?.location}
                onClick={() => alert(preLocaion1.sos_date)}
                icon={{
                  url: '/icons/tracking-marker.svg', // 이 경로는 서버에서 접근 가능한 경로로 설정해야 합니다.
                }}
              />
            </>
          )}
          {preLocaion2 && preLocaion2?.sos_date && (
            <>
              <OverlayView
                position={preLocaion2?.location}
                mapPaneName="overlayLayer"
              >
                <div className="absolute -left-[73px] -top-[70px] z-10 flex w-[150px] flex-col items-center rounded-[10px] bg-[#2262C6] py-[8px] text-[12px] font-bold text-white">
                  {preLocaion2.sos_date}
                </div>
              </OverlayView>
              <Marker
                zIndex={1}
                position={preLocaion2?.location}
                onClick={() => alert(preLocaion2.sos_date)}
                // onMouseOver={() => alert(preLocaion2.sos_date)}
                icon={{
                  url: '/icons/tracking-marker.svg', // 이 경로는 서버에서 접근 가능한 경로로 설정해야 합니다.
                }}
              />
            </>
          )}
        </>
      </GoogleMap>
    </>
  ) : (
    <></>
  )
}

export default React.memo(GoogleMapWrapper)
