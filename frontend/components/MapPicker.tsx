"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon yang suka error di Next.js/webpack
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapPickerProps = {
  lat: number | null;
  lng: number | null;
  onSelect: (lat: number, lng: number) => void;
};

function ClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPicker({ lat, lng, onSelect }: MapPickerProps) {
  // Default center: tengah Indonesia (kalau belum ada titik dipilih)
  const center: [number, number] = lat && lng ? [lat, lng] : [-2.5, 118];

  return (
    <MapContainer
      center={center}
      zoom={lat && lng ? 10 : 5}
      scrollWheelZoom={false}
      className="h-40 w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onSelect={onSelect} />
      {lat && lng && <Marker position={[lat, lng]} icon={markerIcon} />}
    </MapContainer>
  );
}