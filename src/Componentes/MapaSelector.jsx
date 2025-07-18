import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      const newPos = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const MapaSelector = ({ latitud, longitud, onChange }) => {
  const defaultPos = [-17.768963, -63.182526];
  const initial = latitud && longitud ? [latitud, longitud] : defaultPos;
  const [position, setPosition] = useState(initial);

  useEffect(() => {
    if (latitud && longitud) {
      setPosition([latitud, longitud]);
    }
  }, [latitud, longitud]);

  useEffect(() => {
    if (position) {
      onChange({ lat: position[0], lng: position[1] });
    }
  }, [position]);

  return (
    <MapContainer center={position} zoom={17} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
};

export default MapaSelector;
