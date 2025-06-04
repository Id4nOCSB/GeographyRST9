import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Table, Tabs, Tab, Modal } from 'react-bootstrap';
import { ProvinceData } from '../../types/ProvinceData';
import CanadaMap from '../Map/CanadaMap';
import './ProvinceEditor.css';

interface ProvinceEditorProps {
  provinceData: ProvinceData;
  onSave: (data: ProvinceData) => void;
  onCancel: () => void;
}

const ProvinceEditor: React.FC<ProvinceEditorProps> = ({ provinceData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState<ProvinceData>({ ...provinceData });
  const [activeTab, setActiveTab] = useState('basic');
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [newImage, setNewImage] = useState({ url: '', caption: '' });
  const [showIndigenousPlaceNameModal, setShowIndigenousPlaceNameModal] = useState(false);
  const [currentIndigenousPlaceNameIndex, setCurrentIndigenousPlaceNameIndex] = useState<number | null>(null);
  const [newIndigenousPlaceName, setNewIndigenousPlaceName] = useState({ originalName: '', indigenousName: '', nation: '' });
  const [showEthnicityModal, setShowEthnicityModal] = useState(false);
  const [currentEthnicityIndex, setCurrentEthnicityIndex] = useState<number | null>(null);
  const [newEthnicity, setNewEthnicity] = useState({ ethnicGroup: '', percentage: 0 });

  // Handle basic info changes
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'population' || name === 'area') {
      setEditedData({
        ...editedData,
        [name]: Number(value)
      });
    } else if (name === 'mapCenter') {
      const [lat, lng] = value.split(',').map(v => parseFloat(v.trim()));
      setEditedData({
        ...editedData,
        mapCenter: [lat, lng] as [number, number]
      });
    } else {
      setEditedData({
        ...editedData,
        [name]: value
      });
    }
  };

  // Handle population density data changes
  const handleDensityChange = (index: number, field: string, value: string) => {
    const updatedDensityData = [...editedData.populationDensityData];
    if (field === 'density') {
      updatedDensityData[index] = {
        ...updatedDensityData[index],
        [field]: Number(value)
      };
    } else {
      updatedDensityData[index] = {
        ...updatedDensityData[index],
        [field]: value
      };
    }

    setEditedData({
      ...editedData,
      populationDensityData: updatedDensityData
    });
  };

  // Add new population density region
  const addDensityRegion = () => {
    setEditedData({
      ...editedData,
      populationDensityData: [
        ...editedData.populationDensityData,
        { region: 'New Region', density: 0 }
      ]
    });
  };

  // Remove population density region
  const removeDensityRegion = (index: number) => {
    const updatedDensityData = [...editedData.populationDensityData];
    updatedDensityData.splice(index, 1);
    setEditedData({
      ...editedData,
      populationDensityData: updatedDensityData
    });
  };

  // Handle industry changes
  const handleIndustryChange = (index: number, field: string, value: string) => {
    const updatedIndustries = [...editedData.industries];

    if (field === 'position') {
      const [lat, lng] = value.split(',').map(v => parseFloat(v.trim()));
      updatedIndustries[index] = {
        ...updatedIndustries[index],
        [field]: [lat, lng] as [number, number]
      };
    } else if (field === 'employees' || field === 'id') {
      updatedIndustries[index] = {
        ...updatedIndustries[index],
        [field]: Number(value)
      };
    } else {
      updatedIndustries[index] = {
        ...updatedIndustries[index],
        [field]: value
      };
    }

    setEditedData({
      ...editedData,
      industries: updatedIndustries
    });
  };

  // Add new industry
  const addIndustry = () => {
    const newId = Math.max(0, ...editedData.industries.map(i => i.id)) + 1;
    setEditedData({
      ...editedData,
      industries: [
        ...editedData.industries,
        {
          id: newId,
          name: 'New Industry',
          type: 'Other',
          position: [editedData.mapCenter[0], editedData.mapCenter[1]] as [number, number],
          employees: 0,
          description: 'Description of the new industry'
        }
      ]
    });
  };

  // Remove industry
  const removeIndustry = (index: number) => {
    const updatedIndustries = [...editedData.industries];
    updatedIndustries.splice(index, 1);
    setEditedData({
      ...editedData,
      industries: updatedIndustries
    });
  };

  // Handle key fact changes
  const handleKeyFactChange = (index: number, field: string, value: string) => {
    const updatedKeyFacts = [...editedData.keyFacts];
    updatedKeyFacts[index] = {
      ...updatedKeyFacts[index],
      [field]: value
    };

    setEditedData({
      ...editedData,
      keyFacts: updatedKeyFacts
    });
  };

  // Add new key fact
  const addKeyFact = () => {
    setEditedData({
      ...editedData,
      keyFacts: [
        ...editedData.keyFacts,
        { fact: 'New Fact', value: 'Value' }
      ]
    });
  };

  // Remove key fact
  const removeKeyFact = (index: number) => {
    const updatedKeyFacts = [...editedData.keyFacts];
    updatedKeyFacts.splice(index, 1);
    setEditedData({
      ...editedData,
      keyFacts: updatedKeyFacts
    });
  };

  // Handle image changes
  const handleImageChange = (index: number, field: string, value: string) => {
    const updatedImages = [...editedData.images];
    updatedImages[index] = {
      ...updatedImages[index],
      [field]: value
    };

    setEditedData({
      ...editedData,
      images: updatedImages
    });
  };

  // Handle province shape changes
  const handleProvinceShapeChange = (feature: any) => {
    setEditedData({
      ...editedData,
      provinceShape: feature
    });
  };

  // Open image edit modal
  const openImageModal = (index: number | null) => {
    if (index !== null) {
      setNewImage(editedData.images[index]);
    } else {
      setNewImage({ url: '', caption: '' });
    }
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  // Save image from modal
  const saveImage = () => {
    const updatedImages = [...editedData.images];

    if (currentImageIndex !== null) {
      // Edit existing image
      updatedImages[currentImageIndex] = newImage;
    } else {
      // Add new image
      updatedImages.push(newImage);
    }

    setEditedData({
      ...editedData,
      images: updatedImages
    });

    setShowImageModal(false);
  };

  // Remove image
  const removeImage = (index: number) => {
    const updatedImages = [...editedData.images];
    updatedImages.splice(index, 1);
    setEditedData({
      ...editedData,
      images: updatedImages
    });
  };

  // Handle indigenous place name changes
  const handleIndigenousPlaceNameChange = (index: number, field: string, value: string) => {
    const updatedPlaceNames = [...(editedData.indigenousPlaceNames || [])];
    updatedPlaceNames[index] = {
      ...updatedPlaceNames[index],
      [field]: value
    };

    setEditedData({
      ...editedData,
      indigenousPlaceNames: updatedPlaceNames
    });
  };

  // Open indigenous place name modal
  const openIndigenousPlaceNameModal = (index: number | null) => {
    if (index !== null && editedData.indigenousPlaceNames && editedData.indigenousPlaceNames[index]) {
      setNewIndigenousPlaceName(editedData.indigenousPlaceNames[index]);
    } else {
      setNewIndigenousPlaceName({ originalName: '', indigenousName: '', nation: '' });
    }
    setCurrentIndigenousPlaceNameIndex(index);
    setShowIndigenousPlaceNameModal(true);
  };

  // Save indigenous place name from modal
  const saveIndigenousPlaceName = () => {
    const updatedPlaceNames = [...(editedData.indigenousPlaceNames || [])];

    if (currentIndigenousPlaceNameIndex !== null) {
      // Edit existing place name
      updatedPlaceNames[currentIndigenousPlaceNameIndex] = newIndigenousPlaceName;
    } else {
      // Add new place name
      updatedPlaceNames.push(newIndigenousPlaceName);
    }

    setEditedData({
      ...editedData,
      indigenousPlaceNames: updatedPlaceNames
    });

    setShowIndigenousPlaceNameModal(false);
  };

  // Remove indigenous place name
  const removeIndigenousPlaceName = (index: number) => {
    if (!editedData.indigenousPlaceNames) return;

    const updatedPlaceNames = [...editedData.indigenousPlaceNames];
    updatedPlaceNames.splice(index, 1);
    setEditedData({
      ...editedData,
      indigenousPlaceNames: updatedPlaceNames
    });
  };

  // Handle ethnicity data changes
  const handleEthnicityChange = (index: number, field: string, value: string) => {
    const updatedEthnicities = [...(editedData.demographicsEthnicity || [])];

    if (field === 'percentage') {
      updatedEthnicities[index] = {
        ...updatedEthnicities[index],
        [field]: Number(value)
      };
    } else {
      updatedEthnicities[index] = {
        ...updatedEthnicities[index],
        [field]: value
      };
    }

    setEditedData({
      ...editedData,
      demographicsEthnicity: updatedEthnicities
    });
  };

  // Open ethnicity modal
  const openEthnicityModal = (index: number | null) => {
    if (index !== null && editedData.demographicsEthnicity && editedData.demographicsEthnicity[index]) {
      setNewEthnicity(editedData.demographicsEthnicity[index]);
    } else {
      setNewEthnicity({ ethnicGroup: '', percentage: 0 });
    }
    setCurrentEthnicityIndex(index);
    setShowEthnicityModal(true);
  };

  // Save ethnicity from modal
  const saveEthnicity = () => {
    const updatedEthnicities = [...(editedData.demographicsEthnicity || [])];

    if (currentEthnicityIndex !== null) {
      // Edit existing ethnicity
      updatedEthnicities[currentEthnicityIndex] = newEthnicity;
    } else {
      // Add new ethnicity
      updatedEthnicities.push(newEthnicity);
    }

    setEditedData({
      ...editedData,
      demographicsEthnicity: updatedEthnicities
    });

    setShowEthnicityModal(false);
  };

  // Remove ethnicity
  const removeEthnicity = (index: number) => {
    if (!editedData.demographicsEthnicity) return;

    const updatedEthnicities = [...editedData.demographicsEthnicity];
    updatedEthnicities.splice(index, 1);
    setEditedData({
      ...editedData,
      demographicsEthnicity: updatedEthnicities
    });
  };

  // Handle text field changes for new fields
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value
    });
  };

  // Handle natural resources changes
  const handleNaturalResourcesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const resources = e.target.value.split('\n').filter(resource => resource.trim() !== '');
    setEditedData({
      ...editedData,
      naturalResources: resources
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedData);
  };

  return (
    <Container className="province-editor">
      <h2 className="mb-4">Edit Province Data</h2>

      <Form onSubmit={handleSubmit}>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'basic')}
          className="mb-4"
        >
          {/* Basic Information Tab */}
          <Tab eventKey="basic" title="Basic Information">
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Province Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleBasicInfoChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Capital</Form.Label>
                      <Form.Control
                        type="text"
                        name="capital"
                        value={editedData.capital}
                        onChange={handleBasicInfoChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Population</Form.Label>
                      <Form.Control
                        type="number"
                        name="population"
                        value={editedData.population}
                        onChange={handleBasicInfoChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Area (km²)</Form.Label>
                      <Form.Control
                        type="number"
                        name="area"
                        value={editedData.area}
                        onChange={handleBasicInfoChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Map Center (latitude, longitude)</Form.Label>
                  <Form.Control
                    type="text"
                    name="mapCenter"
                    value={`${editedData.mapCenter[0]}, ${editedData.mapCenter[1]}`}
                    onChange={handleBasicInfoChange}
                    placeholder="51.0, -114.0"
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter as "latitude, longitude" (e.g., "51.0, -114.0")
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={editedData.description}
                    onChange={handleBasicInfoChange}
                    rows={5}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Physical Geography Tab */}
          <Tab eventKey="physicalGeography" title="Physical Geography">
            <Card className="mb-4">
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Landforms</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="landforms"
                    value={editedData.landforms || ''}
                    onChange={handleTextFieldChange}
                    rows={4}
                    placeholder="Describe the landforms of the province (mountains, plains, valleys, etc.)..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Climate</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="climate"
                    value={editedData.climate || ''}
                    onChange={handleTextFieldChange}
                    rows={4}
                    placeholder="Describe the climate of the province (temperature, precipitation, seasons, etc.)..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ecozones</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="ecozones"
                    value={editedData.ecozones || ''}
                    onChange={handleTextFieldChange}
                    rows={4}
                    placeholder="Describe the ecozones of the province (forests, grasslands, tundra, etc.)..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Physical Process Explained</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="physicalProcessExplained"
                    value={editedData.physicalProcessExplained || ''}
                    onChange={handleTextFieldChange}
                    rows={4}
                    placeholder="Explain key physical processes in the province..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Natural Resources (one per line)</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="naturalResources"
                    value={(editedData.naturalResources || []).join('\n')}
                    onChange={handleNaturalResourcesChange}
                    rows={4}
                    placeholder="List natural resources, one per line..."
                  />
                  <Form.Text className="text-muted">
                    Enter each resource on a new line
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Indigenous Information Tab */}
          <Tab eventKey="indigenous" title="Indigenous Information">
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Indigenous Place Names</h4>
                  <Button variant="success" size="sm" onClick={() => openIndigenousPlaceNameModal(null)}>
                    Add Place Name
                  </Button>
                </div>

                <Table striped bordered hover className="mb-4">
                  <thead>
                    <tr>
                      <th>Original Name</th>
                      <th>Indigenous Name</th>
                      <th>Nation/Community</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(editedData.indigenousPlaceNames || []).map((placeName, index) => (
                      <tr key={index}>
                        <td>{placeName.originalName}</td>
                        <td>{placeName.indigenousName}</td>
                        <td>{placeName.nation}</td>
                        <td>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => openIndigenousPlaceNameModal(index)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => removeIndigenousPlaceName(index)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {(!editedData.indigenousPlaceNames || editedData.indigenousPlaceNames.length === 0) && (
                      <tr>
                        <td colSpan={4} className="text-center">No indigenous place names added yet</td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <Form.Group className="mb-3">
                  <Form.Label>How Land is Shared with Indigenous Communities</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="indigenousLandSharing"
                    value={editedData.indigenousLandSharing || ''}
                    onChange={handleTextFieldChange}
                    rows={4}
                    placeholder="Describe how land is shared with indigenous communities..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Indigenous Value Incorporation</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="indigenousValueIncorporation"
                    value={editedData.indigenousValueIncorporation || ''}
                    onChange={handleTextFieldChange}
                    rows={4}
                    placeholder="Describe how indigenous values are incorporated..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Population Density Tab */}
          <Tab eventKey="density" title="Population Density">
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Population Density by Region</h4>
                  <Button variant="success" size="sm" onClick={addDensityRegion}>
                    Add Region
                  </Button>
                </div>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Density (people/km²)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedData.populationDensityData.map((region, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control
                            type="text"
                            value={region.region}
                            onChange={(e) => handleDensityChange(index, 'region', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={region.density}
                            onChange={(e) => handleDensityChange(index, 'density', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => removeDensityRegion(index)}
                            disabled={editedData.populationDensityData.length <= 1}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Industries Tab */}
          <Tab eventKey="industries" title="Industries">
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Industries</h4>
                  <Button variant="success" size="sm" onClick={addIndustry}>
                    Add Industry
                  </Button>
                </div>

                {editedData.industries.map((industry, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Industry Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={industry.name}
                              onChange={(e) => handleIndustryChange(index, 'name', e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                              type="text"
                              value={industry.type}
                              onChange={(e) => handleIndustryChange(index, 'type', e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Position (latitude, longitude)</Form.Label>
                            <Form.Control
                              type="text"
                              value={`${industry.position[0]}, ${industry.position[1]}`}
                              onChange={(e) => handleIndustryChange(index, 'position', e.target.value)}
                              placeholder="51.0, -114.0"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Employees</Form.Label>
                            <Form.Control
                              type="number"
                              value={industry.employees}
                              onChange={(e) => handleIndustryChange(index, 'employees', e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={industry.description || ''}
                          onChange={(e) => handleIndustryChange(index, 'description', e.target.value)}
                          rows={2}
                        />
                      </Form.Group>

                      <div className="text-end">
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => removeIndustry(index)}
                          disabled={editedData.industries.length <= 1}
                        >
                          Remove Industry
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          </Tab>

          {/* Key Facts Tab */}
          <Tab eventKey="facts" title="Key Facts">
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Key Facts</h4>
                  <Button variant="success" size="sm" onClick={addKeyFact}>
                    Add Fact
                  </Button>
                </div>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Fact</th>
                      <th>Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedData.keyFacts.map((fact, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control
                            type="text"
                            value={fact.fact}
                            onChange={(e) => handleKeyFactChange(index, 'fact', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={fact.value}
                            onChange={(e) => handleKeyFactChange(index, 'value', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => removeKeyFact(index)}
                            disabled={editedData.keyFacts.length <= 1}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Province Shape Tab */}
          <Tab eventKey="shape" title="Province Shape">
            <Card className="mb-4">
              <Card.Body>
                <div className="mb-3">
                  <h4>Edit Province Shape</h4>
                  <p className="text-muted">
                    Use the drawing tools to create or edit the shape of your province. 
                    You can draw a new shape, edit the existing shape, or delete it to start over.
                  </p>
                </div>

                <div style={{ height: '500px' }}>
                  {/* Create a GeoJSON FeatureCollection for the map */}
                  {(() => {
                    const provinceGeoJson = {
                      type: "FeatureCollection",
                      features: editedData.provinceShape ? [editedData.provinceShape] : []
                    };

                    return (
                      <CanadaMap 
                        provincesData={provinceGeoJson}
                        selectedProvince={editedData.name}
                        onProvinceShapeChange={handleProvinceShapeChange}
                        isEditable={true}
                      />
                    );
                  })()}
                </div>
              </Card.Body>
            </Card>
          </Tab>

          {/* Demographics Tab */}
          <Tab eventKey="demographics" title="Demographics">
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Population Ethnicity</h4>
                  <Button variant="success" size="sm" onClick={() => openEthnicityModal(null)}>
                    Add Ethnic Group
                  </Button>
                </div>

                <Table striped bordered hover className="mb-4">
                  <thead>
                    <tr>
                      <th>Ethnic Group</th>
                      <th>Percentage (%)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(editedData.demographicsEthnicity || []).map((ethnicity, index) => (
                      <tr key={index}>
                        <td>{ethnicity.ethnicGroup}</td>
                        <td>{ethnicity.percentage}%</td>
                        <td>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => openEthnicityModal(index)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => removeEthnicity(index)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {(!editedData.demographicsEthnicity || editedData.demographicsEthnicity.length === 0) && (
                      <tr>
                        <td colSpan={3} className="text-center">No ethnicity data added yet</td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <Form.Group className="mb-3">
                  <Form.Label>Major Population Trend</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="majorPopulationTrend"
                    value={editedData.majorPopulationTrend || ''}
                    onChange={handleTextFieldChange}
                    rows={4}
                    placeholder="Describe major population trends in the province..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Sustainability Tab */}
          <Tab eventKey="sustainability" title="Sustainability">
            <Card className="mb-4">
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>General Sustainability Plan</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="sustainabilityPlan"
                    value={editedData.sustainabilityPlan || ''}
                    onChange={handleTextFieldChange}
                    rows={4}
                    placeholder="Describe the general sustainability plan..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Transportation Sustainability</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="sustainabilityTransportation"
                    value={editedData.sustainabilityTransportation || ''}
                    onChange={handleTextFieldChange}
                    rows={3}
                    placeholder="Describe transportation sustainability plans..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Housing Sustainability</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="sustainabilityHousing"
                    value={editedData.sustainabilityHousing || ''}
                    onChange={handleTextFieldChange}
                    rows={3}
                    placeholder="Describe housing sustainability plans..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Energy Sustainability</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="sustainabilityEnergy"
                    value={editedData.sustainabilityEnergy || ''}
                    onChange={handleTextFieldChange}
                    rows={3}
                    placeholder="Describe energy sustainability plans..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Green Space Sustainability</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="sustainabilityGreenSpace"
                    value={editedData.sustainabilityGreenSpace || ''}
                    onChange={handleTextFieldChange}
                    rows={3}
                    placeholder="Describe green space sustainability plans..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Food System Sustainability</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="sustainabilityFoodSystem"
                    value={editedData.sustainabilityFoodSystem || ''}
                    onChange={handleTextFieldChange}
                    rows={3}
                    placeholder="Describe food system sustainability plans..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Impact Assessment Tab */}
          <Tab eventKey="impact" title="Impact Assessment">
            <Card className="mb-4">
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>How Decisions Affect People and Land</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="landPeopleImpact"
                    value={editedData.landPeopleImpact || ''}
                    onChange={handleTextFieldChange}
                    rows={6}
                    placeholder="Describe how decisions affect both the people and the land..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Images Tab */}
          <Tab eventKey="images" title="Images">
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Images</h4>
                  <Button variant="success" size="sm" onClick={() => openImageModal(null)}>
                    Add Image
                  </Button>
                </div>

                <Row>
                  {editedData.images.map((image, index) => (
                    <Col key={index} md={4} className="mb-3">
                      <Card>
                        <Card.Img variant="top" src={image.url} alt={image.caption} />
                        <Card.Body>
                          <Card.Text>{image.caption}</Card.Text>
                          <div className="d-flex justify-content-between">
                            <Button 
                              variant="primary" 
                              size="sm" 
                              onClick={() => openImageModal(index)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm" 
                              onClick={() => removeImage(index)}
                              disabled={editedData.images.length <= 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

        <div className="d-flex justify-content-between mb-5">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>

      {/* Image Edit Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentImageIndex !== null ? 'Edit Image' : 'Add New Image'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={newImage.url}
              onChange={(e) => setNewImage({...newImage, url: e.target.value})}
              placeholder="https://example.com/image.jpg"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              value={newImage.caption}
              onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
              required
            />
          </Form.Group>
          {newImage.url && (
            <div className="text-center mt-3">
              <p>Preview:</p>
              <img 
                src={newImage.url} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '200px' }} 
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveImage}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Indigenous Place Name Modal */}
      <Modal show={showIndigenousPlaceNameModal} onHide={() => setShowIndigenousPlaceNameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentIndigenousPlaceNameIndex !== null ? 'Edit Indigenous Place Name' : 'Add Indigenous Place Name'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Original Name</Form.Label>
            <Form.Control
              type="text"
              value={newIndigenousPlaceName.originalName}
              onChange={(e) => setNewIndigenousPlaceName({...newIndigenousPlaceName, originalName: e.target.value})}
              placeholder="e.g., Vancouver"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Indigenous Name</Form.Label>
            <Form.Control
              type="text"
              value={newIndigenousPlaceName.indigenousName}
              onChange={(e) => setNewIndigenousPlaceName({...newIndigenousPlaceName, indigenousName: e.target.value})}
              placeholder="e.g., Xwməθkwəy̓əm"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nation/Community</Form.Label>
            <Form.Control
              type="text"
              value={newIndigenousPlaceName.nation}
              onChange={(e) => setNewIndigenousPlaceName({...newIndigenousPlaceName, nation: e.target.value})}
              placeholder="e.g., Musqueam"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowIndigenousPlaceNameModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveIndigenousPlaceName}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Ethnicity Modal */}
      <Modal show={showEthnicityModal} onHide={() => setShowEthnicityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentEthnicityIndex !== null ? 'Edit Ethnic Group' : 'Add Ethnic Group'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Ethnic Group</Form.Label>
            <Form.Control
              type="text"
              value={newEthnicity.ethnicGroup}
              onChange={(e) => setNewEthnicity({...newEthnicity, ethnicGroup: e.target.value})}
              placeholder="e.g., Indigenous, European, Asian"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Percentage (%)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={newEthnicity.percentage}
              onChange={(e) => setNewEthnicity({...newEthnicity, percentage: Number(e.target.value)})}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEthnicityModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEthnicity}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProvinceEditor;
