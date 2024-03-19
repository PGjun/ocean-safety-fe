'use client'
import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '500px',
  height: '500px',
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
        {/* Child components, such as markers, info windows, etc. */}
        <>
          <Marker
            position={center}
            // 선택적으로 마커 클릭 이벤트 핸들러 추가 가능
            onClick={() => alert('마커 클릭')}
          />
        </>
      </GoogleMap>
      <div>{currentCenter.lat}</div>
      <div>{currentCenter.lng}</div>
    </>
  ) : (
    <></>
  )
}

export default React.memo(GoogleMapWrapper)
