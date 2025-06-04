import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, Tooltip, useMap, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import './CanadaMap.css';

// Fix for Leaflet's icon paths
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// This would be replaced with actual GeoJSON data for Canadian provinces
interface CanadaMapProps {
  provincesData?: any;
  selectedProvince?: string;
  onProvinceSelect?: (province: string) => void;
  onProvinceShapeChange?: (feature: any) => void;
  isEditable?: boolean;
}

// Custom hook to add tool labels to the drawing tools
const useToolLabels = () => {
  useEffect(() => {
    const addLabels = () => {
      // Wait for the DOM to be ready
      setTimeout(() => {
        // Add labels to drawing tools
        const rectangleButton = document.querySelector('.leaflet-draw-draw-rectangle');
        const polygonButton = document.querySelector('.leaflet-draw-draw-polygon');
        const editButton = document.querySelector('.leaflet-draw-edit-edit');
        const deleteButton = document.querySelector('.leaflet-draw-edit-remove');

        if (rectangleButton && !rectangleButton.querySelector('.tool-label')) {
          const rectangleLabel = document.createElement('span');
          rectangleLabel.className = 'tool-label';
          rectangleLabel.textContent = 'Draw Rectangle';
          rectangleButton.appendChild(rectangleLabel);
        }

        if (polygonButton && !polygonButton.querySelector('.tool-label')) {
          const polygonLabel = document.createElement('span');
          polygonLabel.className = 'tool-label';
          polygonLabel.textContent = 'Draw Polygon';
          polygonButton.appendChild(polygonLabel);
        }

        if (editButton && !editButton.querySelector('.tool-label')) {
          const editLabel = document.createElement('span');
          editLabel.className = 'tool-label';
          editLabel.textContent = 'Edit Shapes';
          editButton.appendChild(editLabel);
        }

        if (deleteButton && !deleteButton.querySelector('.tool-label')) {
          const deleteLabel = document.createElement('span');
          deleteLabel.className = 'tool-label';
          deleteLabel.textContent = 'Delete Shapes';
          deleteButton.appendChild(deleteLabel);
        }
      }, 500);
    };

    // Add labels when component mounts
    addLabels();

    // Add labels when the DOM changes (e.g., when switching between edit modes)
    const observer = new MutationObserver(addLabels);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
};

// Drawing tools component that will be rendered inside the MapContainer
const DrawingTools: React.FC<{
  onProvinceShapeChange?: (feature: any) => void;
  existingFeatures?: any;
}> = ({ onProvinceShapeChange, existingFeatures }) => {
  const map = useMap();
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  // Use the custom hook to add tool labels
  useToolLabels();

  useEffect(() => {
    if (featureGroupRef.current && existingFeatures && existingFeatures.features && existingFeatures.features.length > 0) {
      // Clear existing layers
      featureGroupRef.current.clearLayers();

      // Add existing features to the feature group
      const geoJsonLayer = L.geoJSON(existingFeatures);
      geoJsonLayer.eachLayer(layer => {
        featureGroupRef.current?.addLayer(layer);
      });
    }
  }, [existingFeatures]);

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const geoJson = layer.toGeoJSON();

    // Add name property to match the expected format
    if (geoJson && geoJson.properties) {
      geoJson.properties.name = 'Custom Shape';
    }

    if (onProvinceShapeChange) {
      onProvinceShapeChange(geoJson);
    }
  };

  const handleEdited = (e: any) => {
    const layers = e.layers;
    layers.eachLayer((layer: any) => {
      const geoJson = layer.toGeoJSON();

      // Preserve the name property
      if (geoJson && geoJson.properties) {
        geoJson.properties.name = 'Custom Shape';
      }

      if (onProvinceShapeChange) {
        onProvinceShapeChange(geoJson);
      }
    });
  };

  const handleDeleted = () => {
    if (onProvinceShapeChange) {
      onProvinceShapeChange(null);
    }
  };

  return (
    <FeatureGroup ref={featureGroupRef}>
      <EditControl
        position="topleft"
        onCreated={handleCreated}
        onEdited={handleEdited}
        onDeleted={handleDeleted}
        draw={{
          rectangle: {
            shapeOptions: {
              color: '#0078A8',
              weight: 3
            },
            showArea: true,
            metric: true
          },
          polygon: {
            allowIntersection: false,
            showArea: true,
            metric: true,
            shapeOptions: {
              color: '#0078A8',
              weight: 3
            }
          },
          circle: false,
          circlemarker: false,
          marker: false,
          polyline: false,
        }}
        edit={{
          featureGroup: featureGroupRef.current,
          remove: true,
          edit: true
        }}
      />
    </FeatureGroup>
  );
};

const CanadaMap: React.FC<CanadaMapProps> = ({ 
  provincesData, 
  selectedProvince, 
  onProvinceSelect,
  onProvinceShapeChange,
  isEditable = false
}) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const onEachProvince = (province: any, layer: any) => {
    const provinceName = province.properties.name;

    layer.on({
      mouseover: () => setHoveredProvince(provinceName),
      mouseout: () => setHoveredProvince(null),
      click: () => onProvinceSelect && onProvinceSelect(provinceName)
    });

    layer.bindTooltip(provinceName);
  };

  const provinceStyle = (feature: any) => {
    const isSelected = feature.properties.name === selectedProvince;
    const isHovered = feature.properties.name === hoveredProvince;

    return {
      fillColor: isSelected ? '#4CAF50' : '#3388ff',
      weight: isSelected || isHovered ? 3 : 1,
      opacity: 1,
      color: isSelected ? '#004D40' : '#666',
      fillOpacity: isSelected ? 0.7 : isHovered ? 0.5 : 0.3
    };
  };

  return (
    <div className="canada-map-container">
      <MapContainer 
        center={[60, -95]} 
        zoom={4} 
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {provincesData && (
          <GeoJSON 
            data={provincesData} 
            style={provinceStyle}
            onEachFeature={onEachProvince}
          />
        )}

        {isEditable && (
          <>
            <DrawingTools 
              onProvinceShapeChange={onProvinceShapeChange}
              existingFeatures={provincesData}
            />
            <div className="map-instructions">
              <h5>Drawing Tools Guide</h5>
              <div className="instructions-grid">
                <div className="instruction-item">
                  <strong>Draw Rectangle</strong>
                  <p>Click and drag to create a rectangular province shape</p>
                </div>
                <div className="instruction-item">
                  <strong>Draw Polygon</strong>
                  <p>Click multiple points to create a custom province shape. Double-click to finish.</p>
                </div>
                <div className="instruction-item">
                  <strong>Edit Shape</strong>
                  <p>Click to select a shape, then drag the white handles to resize or reshape it</p>
                </div>
                <div className="instruction-item">
                  <strong>Delete Shape</strong>
                  <p>Click to select and remove a shape from the map</p>
                </div>
              </div>
              <div className="instructions-footer">
                <p>Hover over any tool in the left toolbar for a description. Your changes will be saved when you click "Save Changes".</p>
              </div>
            </div>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default CanadaMap;
