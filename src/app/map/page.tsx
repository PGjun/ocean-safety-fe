'use client'
import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

function GoogleMapWrapper() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    language: 'ko',
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker
          position={center}
          // 선택적으로 마커 클릭 이벤트 핸들러 추가 가능
          onClick={() => alert('마커 클릭!')}
        />
      </>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(GoogleMapWrapper)
