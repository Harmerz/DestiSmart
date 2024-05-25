'use client'

// START: Preserve spaces to avoid auto-sorting
import 'leaflet/dist/leaflet.css'

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'

import 'leaflet-defaulticon-compatibility'
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, useMapEvents, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet'
import { useState } from 'react'

export default function Map() {
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
      <CircleMarker
        center={position}
        pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 1 }}
        radius={5}
        stroke={true}
      >
        <Popup>Anda berada di sini</Popup>
      </CircleMarker>
    )
  }
  return (
    <MapContainer
      preferCanvas={true}
      center={[-7.770531, 110.377732]}
      zoom={11}
      scrollWheelZoom={true}
      className="absolute z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          This Marker icon is displayed correctly with <i>leaflet-defaulticon-compatibility</i>.
        </Popup>
      </Marker>
      <LocationMarker />
    </MapContainer>
  )
}
