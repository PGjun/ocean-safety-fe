// // GoogleMap.js
// 'use client'
// import React, { useEffect, useRef } from 'react'

// interface GoogleMapProps {
//   apiKey: string
// }

// const mapStyles = {
//   width: '100%',
//   height: '50%',
// }

// export const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey }) => {
//   const googleMapRef = useRef(null)

//   useEffect(() => {
//     if (typeof window === 'undefined') return // SSR에서는 실행하지 않음
//     const loadGoogleMapScript = async () => {
//       if (!(window as any).google) {
//         const script = document.createElement('script')
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
//         document.head.appendChild(script)
//         script.addEventListener('load', () => initializeGoogleMap())
//       } else {
//         initializeGoogleMap()
//       }
//     }

//     const initializeGoogleMap = () => {
//       const map = new (window as any).google.maps.Map(googleMapRef.current, {
//         zoom: 17,
//         center: {
//           lat: 19.020145856138136,
//           lng: -98.24006775697993,
//         },
//       })

//       // 여기서 마커를 추가합니다.
//       new (window as any).google.maps.Marker({
//         position: {
//           lat: 19.020145856138136,
//           lng: -98.24006775697993,
//         },
//         map: map, // 이 마커를 어느 지도에 표시할지 지정합니다.
//         title: '여기에 타이틀을 넣을 수 있습니다.', // 마커에 마우스를 올렸을 때 보여줄 텍스트
//       })
//     }

//     loadGoogleMapScript()
//   }, [apiKey]) // apiKey 변경 시 재로딩

//   return <div ref={googleMapRef} style={mapStyles} />
// }

// // 페이지 컴포넌트에서 GoogleMap 사용
// // import GoogleMap from './GoogleMap';
// // import React from 'react';

// const MapPage = () => {
//   return <GoogleMap apiKey={'AIzaSyBEYKe2zLbmRflmTfhFweefI-lZe_Cn1Y0'} />
// }

// export default MapPage

export default function MapPage() {
  return <div>맵</div>
}
