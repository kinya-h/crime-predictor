import React, { useState, useEffect } from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

interface MapRendererProps {
  latitude: number;
  longitude: number;
}

const MapRenderer = ({ latitude, longitude }: MapRendererProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude])
    }
  }, [latitude, longitude])

  if (!position) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md absolute top-0 left-0 md:w-full md:h-full  xs:h-1/4 object-cover z-0">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-96 rounded-lg border-2 border-gray-300"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup className="bg-white rounded-lg shadow-md p-2">
            Location <br /> {longitude.toString()} {latitude.toString()}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapRenderer