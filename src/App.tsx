import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProvincePage from './components/Layout/ProvincePage';
import ProvinceEditor from './components/Editor/ProvinceEditor';
import { ProvinceData } from './types/ProvinceData';
import { Button, Alert } from 'react-bootstrap';
import * as GeoJSON from 'geojson';

// Local storage key for saving province data
const STORAGE_KEY = 'provinceData';

function App() {
  // State for the GeoJSON data
  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection | null>(null);

  // State for default province data
  const [defaultProvinceData, setDefaultProvinceData] = useState<ProvinceData | null>(null);

  // Initialize state from local storage or use sample data
  const [provinceData, setProvinceData] = useState<ProvinceData | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the GeoJSON and province data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch GeoJSON data
        const geoJsonResponse = await fetch('/canadaGeoJson.json');
        const geoJson = await geoJsonResponse.json();
        setGeoJsonData(geoJson);

        // Fetch default province data
        const provinceDataResponse = await fetch('/provinceData.json');
        const provinceData = await provinceDataResponse.json();
        setDefaultProvinceData(provinceData);

        // Check for saved data in localStorage
        const savedData = localStorage.getItem(STORAGE_KEY);

        // Initialize with saved data or default data
        if (savedData) {
          const parsedData = JSON.parse(savedData);

          // If there's no province shape in the saved data, find it in the GeoJSON
          if (!parsedData.provinceShape && geoJson) {
            const provinceFeature = geoJson.features.find(
              (feature: any) => feature.properties.name === parsedData.name
            );

            if (provinceFeature) {
              parsedData.provinceShape = provinceFeature;
            }
          }

          setProvinceData(parsedData);
        } else {
          // Use default data
          const initialData = {...provinceData};

          // If there's no province shape in the data, find it in the GeoJSON
          if (!initialData.provinceShape && geoJson) {
            const provinceFeature = geoJson.features.find(
              (feature: any) => feature.properties.name === initialData.name
            );

            if (provinceFeature) {
              initialData.provinceShape = provinceFeature;
            }
          }

          setProvinceData(initialData);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save to local storage whenever provinceData changes
  useEffect(() => {
    if (provinceData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(provinceData));
    }
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
    if (window.confirm('Are you sure you want to reset all data to default values? This cannot be undone.') && defaultProvinceData) {
      // Create a copy of the default data
      const resetData = {...defaultProvinceData};

      // If there's no province shape in the data, find it in the GeoJSON
      if (!resetData.provinceShape && geoJsonData) {
        const provinceFeature = geoJsonData.features.find(
          (feature: any) => feature.properties.name === resetData.name
        );

        if (provinceFeature) {
          resetData.provinceShape = provinceFeature;
        }
      }

      setProvinceData(resetData);
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
        {!isLoading && (
          <div className="header-buttons">
            <Button 
              variant={isEditing ? "secondary" : "primary"} 
              onClick={() => setIsEditing(!isEditing)}
              className="edit-button"
              disabled={isLoading}
            >
              {isEditing ? "Cancel" : "Edit Province Data"}
            </Button>

            {!isEditing && (
              <Button 
                variant="outline-light" 
                onClick={handleResetData}
                className="reset-button"
                disabled={isLoading}
              >
                Reset to Default Data
              </Button>
            )}
          </div>
        )}
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
        {isLoading ? (
          <div className="loading-container">
            <p>Loading province data...</p>
          </div>
        ) : provinceData ? (
          isEditing ? (
            <ProvinceEditor 
              provinceData={provinceData} 
              onSave={handleSaveData} 
              onCancel={handleCancelEdit}
            />
          ) : (
            <ProvincePage 
              provinceData={provinceData} 
              provincesGeoJson={geoJsonData || undefined}
            />
          )
        ) : (
          <div className="error-container">
            <p>Error loading province data. Please refresh the page or check the JSON files.</p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>Geography Rich Summative Task - Created by [Your Name]</p>
      </footer>
    </div>
  );
}

export default App;
