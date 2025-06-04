import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProvincePage from './components/Layout/ProvincePage';
import ProvinceEditor from './components/Editor/ProvinceEditor';
import { sampleProvinceData, simplifiedCanadaGeoJson } from './data/sampleProvinceData';
import { ProvinceData } from './types/ProvinceData';
import { Button, Alert } from 'react-bootstrap';
import * as GeoJSON from 'geojson';

// Local storage key for saving province data
const STORAGE_KEY = 'provinceData';

function App() {
  // Initialize state from local storage or use sample data
  const [provinceData, setProvinceData] = useState<ProvinceData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    // Start with sample data or saved data
    const initialData = savedData ? JSON.parse(savedData) : sampleProvinceData;

    // If there's no province shape in the data, find it in the GeoJSON
    if (!initialData.provinceShape) {
      // Find the feature for this province
      const provinceFeature = simplifiedCanadaGeoJson.features.find(
        feature => feature.properties.name === initialData.name
      );

      if (provinceFeature) {
        initialData.provinceShape = provinceFeature;
      }
    }

    return initialData;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // Save to local storage whenever provinceData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(provinceData));
  }, [provinceData]);

  // Handle saving edited data
  const handleSaveData = (editedData: ProvinceData) => {
    setProvinceData(editedData);
    setIsEditing(false);
    setShowSaveAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 3000);
  };

  // Handle canceling edits
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Reset to default data
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data to default values? This cannot be undone.')) {
      setProvinceData(sampleProvinceData);
      setShowSaveAlert(true);
      setTimeout(() => {
        setShowSaveAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Canadian Province Geography RST</h1>
        <p>A detailed exploration of a Canadian province</p>
        <div className="header-buttons">
          <Button 
            variant={isEditing ? "secondary" : "primary"} 
            onClick={() => setIsEditing(!isEditing)}
            className="edit-button"
          >
            {isEditing ? "Cancel" : "Edit Province Data"}
          </Button>

          {!isEditing && (
            <Button 
              variant="outline-light" 
              onClick={handleResetData}
              className="reset-button"
            >
              Reset to Default Data
            </Button>
          )}
        </div>
      </header>

      {showSaveAlert && (
        <Alert 
          variant="success" 
          className="save-alert"
          onClose={() => setShowSaveAlert(false)} 
          dismissible
        >
          Data has been successfully saved!
        </Alert>
      )}

      <main>
        {isEditing ? (
          <ProvinceEditor 
            provinceData={provinceData} 
            onSave={handleSaveData} 
            onCancel={handleCancelEdit}
          />
        ) : (
          <ProvincePage 
            provinceData={provinceData} 
            provincesGeoJson={simplifiedCanadaGeoJson}
          />
        )}
      </main>

      <footer className="App-footer">
        <p>Geography Rich Summative Task - Created by [Your Name]</p>
      </footer>
    </div>
  );
}

export default App;
