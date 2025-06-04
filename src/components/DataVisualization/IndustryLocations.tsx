import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './IndustryLocations.css';
import L from 'leaflet';
import chroma from 'chroma-js';

// Fix for Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Industry {
  id: number;
  name: string;
  type: string;
  position: [number, number]; // [latitude, longitude]
  employees?: number;
  description?: string;
}

interface IndustryLocationsProps {
  industries: Industry[];
  center: [number, number];
  zoom?: number;
  title?: string;
}

const IndustryLocations: React.FC<IndustryLocationsProps> = ({ 
  industries, 
  center, 
  zoom = 7,
  title = "Industry Locations"
}) => {
  // Create a color scale for industry types
  const industryTypes = [...new Set(industries.map(ind => ind.type))];
  const colorScale = chroma.scale(['#1E88E5', '#D81B60', '#FFC107', '#004D40', '#6A1B9A'])
    .mode('lch')
    .colors(industryTypes.length);

  const typeToColor = Object.fromEntries(
    industryTypes.map((type, i) => [type, colorScale[i]])
  );

  return (
    <div className="industry-locations-container">
      <h3>{title}</h3>
      <div className="industry-map">
        <MapContainer 
          center={center} 
          zoom={zoom} 
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {industries.map(industry => (
            <CircleMarker 
              key={industry.id}
              center={industry.position}
              radius={industry.employees ? Math.sqrt(industry.employees) / 10 + 5 : 8}
              fillColor={typeToColor[industry.type] || '#3388ff'}
              color="#fff"
              weight={1}
              fillOpacity={0.8}
            >
              <Popup>
                <div>
                  <h4>{industry.name}</h4>
                  <p><strong>Type:</strong> {industry.type}</p>
                  {industry.employees && (
                    <p><strong>Employees:</strong> {industry.employees.toLocaleString()}</p>
                  )}
                  {industry.description && (
                    <p>{industry.description}</p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="industry-legend">
        <h4>Industry Types</h4>
        <ul>
          {industryTypes.map((type, index) => (
            <li key={type}>
              <span 
                className="color-dot" 
                style={{ backgroundColor: typeToColor[type] }}
              ></span>
              {type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndustryLocations;
