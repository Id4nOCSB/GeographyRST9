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
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const provinceData = sampleProvinceData;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Canadian Province Geography RST</h1>
        <p>by Idan Sheranosher, grade 9</p>
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
            onSave={()=>{}}
            onCancel={()=>{}}
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
