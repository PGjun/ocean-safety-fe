import React, { useCallback, useEffect, useState } from 'react'
import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from '@react-google-maps/api'

interface Location {
  lat: number
  lng: number
}

interface MarkerInfo {
  location?: Location
  info?: {
    name: string
    sos_date: string
  }
}

interface TrakingMarkerInfo {
  position: Location
  info: string
}

interface Cluster {
  position: Location
  markers: TrakingMarkerInfo[]
}

interface GoogleMapWrapperProps {
  markerInfo?: MarkerInfo
  trackingMarkerInfos?: TrakingMarkerInfo[]
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

const initCenter: Location = {
  lng: 126.99381270667426,
  lat: 37.54093324516149,
}

function useMapZoom(map: google.maps.Map | null): number {
  const [zoom, setZoom] = useState<number>(15) // Initial zoom level

  useEffect(() => {
    if (!map) return

    const onZoomChanged = () => {
      setZoom(map.getZoom() as number)
    }

    map.addListener('zoom_changed', onZoomChanged)
    return () => {
      google.maps.event.clearListeners(map, 'zoom_changed')
    }
  }, [map])

  return zoom
}

// Calculate Euclidean distance between two locations
function calculateDistance(loc1: Location, loc2: Location): number {
  return Math.sqrt(
    Math.pow(loc1.lat - loc2.lat, 2) + Math.pow(loc1.lng - loc2.lng, 2),
  )
}

// Process the markers into clusters based on the current zoom level
function processMarkers(markers: TrakingMarkerInfo[], zoom: number): Cluster[] {
  const clusters: Cluster[] = []
  const threshold = 0.0009 * Math.pow(2, 15 - zoom) // Dynamic threshold based on zoom level

  const visited = new Array(markers.length).fill(false)

  markers.forEach((marker, i) => {
    if (visited[i]) return
    const cluster: TrakingMarkerInfo[] = []

    markers.forEach((other, j) => {
      if (
        !visited[j] &&
        calculateDistance(marker.position, other.position) < threshold
      ) {
        visited[j] = true
        cluster.push(other)
      }
    })

    const clusterPosition = cluster.reduce(
      (acc, cur) => ({
        lat: acc.lat + cur.position.lat / cluster.length,
        lng: acc.lng + cur.position.lng / cluster.length,
      }),
      { lat: 0, lng: 0 },
    )

    clusters.push({ position: clusterPosition, markers: cluster })
  })

  return clusters
}

const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({
  markerInfo,
  trackingMarkerInfos,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    language: 'ko',
  })
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const zoom = useMapZoom(map)
  const currentCenter = markerInfo?.location ?? initCenter
  const [processedMarkers, setProcessedMarkers] = useState<Cluster[]>([])

  useEffect(() => {
    if (zoom && trackingMarkerInfos?.length) {
      setProcessedMarkers(processMarkers(trackingMarkerInfos, zoom))
    }
  }, [zoom, trackingMarkerInfos])

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (!isLoaded) return
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentCenter}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        zIndex={5}
        position={currentCenter}
        onClick={() => alert('마커 클릭')}
        icon={{
          url: '/icons/map-marker.svg',
          scaledSize: new google.maps.Size(40, 40),
        }}
      />
      <OverlayView position={currentCenter} mapPaneName="overlayLayer">
        {markerInfo && markerInfo.info ? (
          <div className="absolute -left-[130px] -top-[135px] z-50 flex w-[257px] flex-col items-center rounded-[10px] bg-[#FF3819] py-[8px] text-[18px] font-bold text-white">
            SOS Location Tracking
            <div className="mt-[8px] text-[16px] font-normal">
              {markerInfo.info.name}
            </div>
            <div className="text-[12px] font-normal">
              TIME : {markerInfo.info.sos_date}
            </div>
          </div>
        ) : (
          <div className="absolute -left-[55px] -top-[80px] flex w-[108px] flex-col items-center rounded-[10px] bg-[#FF3819] py-[8px] text-[12px] font-bold text-white">
            SOS Location
          </div>
        )}
      </OverlayView>
      {processedMarkers &&
        processedMarkers.map((cluster, index) => (
          <React.Fragment key={index}>
            <Marker
              zIndex={1}
              position={cluster.position}
              icon={{
                url: '/icons/tracking-marker.svg',
                scaledSize: new google.maps.Size(30, 30),
              }}
            />
            {cluster.markers.length > 0 && (
              <OverlayView
                position={cluster.position}
                mapPaneName="overlayLayer"
              >
                <div
                  className="absolute -left-[73px] -top-[70px] flex w-[150px] flex-col items-center rounded-[10px] bg-[#2262C6] py-[8px] text-[12px] font-bold text-white"
                  style={{ zIndex: cluster.markers.length - index }}
                >
                  {cluster.markers.map((m, i) => (
                    <div key={i}>{m.info}</div>
                  ))}
                </div>
              </OverlayView>
            )}
          </React.Fragment>
        ))}
    </GoogleMap>
  )
}

export default React.memo(GoogleMapWrapper)
