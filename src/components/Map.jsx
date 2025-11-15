import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dummy data: replace with your real zone polygons and sensor info
const zones = [
  {
    type: "Feature",
    properties: {
      name: "Zone 1 (Supplier)",
      pressure: 3.2, // bar
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [81.629, 21.252],
          [81.631, 21.252],
          [81.631, 21.254],
          [81.629, 21.254],
          [81.629, 21.252],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Zone 2 (Consumer)",
      pressure: 1.7, // bar
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [81.633, 21.2525],
          [81.635, 21.2525],
          [81.635, 21.2545],
          [81.633, 21.2545],
          [81.633, 21.2525],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Zone 3 (Consumer2)",
      pressure: 1.5, // bar
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [81.67, 21.249], // top-right
          [81.664, 21.249], // top-left
          [81.664, 21.243], // bottom-left
          [81.67, 21.243], // bottom-right
          [81.67, 21.249],
        ],
      ],
    },
  },
];

// Function to color zones by pipe pressure
const getColor = (pressure) => {
  return pressure > 3
    ? "#e31a1c" // High
    : pressure > 2
    ? "#fd8d3c" // Medium
    : "#31a354"; // Low
};

// Dummy sensor locations & pressure info; replace with your live data
const sensors = [
  { name: "Sensor A", lat: 21.253, lng: 81.63, pressure: 3.2 },
  { name: "Sensor B", lat: 21.254, lng: 81.634, pressure: 1.7 },
  { name: "Sensor C", lat: 21.246, lng: 81.668, pressure: 1.5 },
];

const RaipurWaterMap = () => (
  <div className="p-5 flex justify-center items-center flex-col">
    <MapContainer center={[21.2514, 81.6296]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=EhDOfjPI1QyObTfa2Q7r"
      />

      {zones.map((zone, idx) => (
        <GeoJSON
          key={idx}
          data={zone}
          style={() => ({
            color: "#555",
            fillColor: getColor(zone.properties.pressure),
            fillOpacity: 0.5,
            weight: 2,
          })}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(
              `<b>${feature.properties.name}</b><br/>Pressure: ${feature.properties.pressure} bar`
            );
          }}
        />
      ))}

      {sensors.map((sensor, idx) => (
        <Marker key={idx} position={[sensor.lat, sensor.lng]}>
          <Popup>
            <b>{sensor.name}</b>
            <br />
            Pressure: {sensor.pressure} bar
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
);

export default RaipurWaterMap;
