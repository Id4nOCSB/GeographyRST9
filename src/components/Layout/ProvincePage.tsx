import React, { useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import CanadaMap from '../Map/CanadaMap';
import PopulationDensity from '../DataVisualization/PopulationDensity';
import './ProvincePage.css';
import * as GeoJSON from 'geojson';
import { ProvinceData } from '../../types/ProvinceData';

interface ProvincePageProps {
  provinceData: ProvinceData;
  provincesGeoJson?: any;
}

const ProvincePage: React.FC<ProvincePageProps> = ({ provinceData, provincesGeoJson }) => {
  const { 
    name, 
    capital, 
    population, 
    area, 
    description, 
    mapCenter, 
    provinceShape,
    populationDensityData, 
    industries,
    keyFacts,
    images,
    // New fields
    landforms,
    climate,
    ecozones,
    physicalProcessExplained,
    naturalResources,
    indigenousPlaceNames,
    indigenousLandSharing,
    indigenousValueIncorporation,
    demographicsEthnicity,
    majorPopulationTrend,
    sustainabilityPlan,
    sustainabilityTransportation,
    sustainabilityHousing,
    sustainabilityEnergy,
    sustainabilityGreenSpace,
    sustainabilityFoodSystem,
    landPeopleImpact
  } = provinceData;

  const populationDensity = population / area;

  // Create a GeoJSON FeatureCollection from the province shape or use the provided provincesGeoJson
  const provinceGeoJson = useMemo(() => {
    if (provinceShape) {
      // If we have a custom province shape, create a FeatureCollection with just that feature
      return {
        type: "FeatureCollection",
        features: [provinceShape]
      } as GeoJSON.FeatureCollection;
    }
    // Otherwise use the provided provincesGeoJson
    return provincesGeoJson;
  }, [provinceShape, provincesGeoJson]);

  return (
    <Container className="province-page">
      <Row className="mb-4">
        <Col>
          <h1 className="province-title">{name}</h1>
          <p className="province-subtitle">Capital: {capital}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Overview</Card.Title>
              <p>{description}</p>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td><strong>Population</strong></td>
                    <td>{population.toLocaleString()} people</td>
                  </tr>
                  <tr>
                    <td><strong>Area</strong></td>
                    <td>{area.toLocaleString()} km²</td>
                  </tr>
                  <tr>
                    <td><strong>Population Density</strong></td>
                    <td>{populationDensity.toFixed(2)} people/km²</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Key Facts</Card.Title>
              <Table striped bordered hover size="sm">
                <tbody>
                  {keyFacts.map((item, index) => (
                    <tr key={index}>
                      <td><strong>{item.fact}</strong></td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Location</Card.Title>
              {provinceGeoJson && (
                <CanadaMap 
                  provincesData={provinceGeoJson} 
                  selectedProvince={name}
                  isEditable={false}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Population Density by Region</Card.Title>
              <PopulationDensity 
                data={populationDensityData} 
                title={`Population Density in ${name} by Region`}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Industry Locations</Card.Title>
              <div className="industry-locations">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Employees</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industries.map((industry, index) => (
                      <tr key={index}>
                        <td>{industry.name}</td>
                        <td>{industry.type}</td>
                        <td>{industry.employees?.toLocaleString() || 'N/A'}</td>
                        <td>{industry.description || 'No description available'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Images</Card.Title>
              <div className="province-images">
                {images.map((image, index) => (
                  <div key={index} className="province-image-container">
                    <img 
                      src={image.url} 
                      alt={image.caption} 
                      className="province-image"
                    />
                    <p className="image-caption">{image.caption}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Physical Geography Section */}
      {(landforms || climate || ecozones || physicalProcessExplained || naturalResources) && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Physical Geography</Card.Title>

                {landforms && (
                  <div className="mb-4">
                    <h5>Landforms</h5>
                    <p>{landforms}</p>
                  </div>
                )}

                {climate && (
                  <div className="mb-4">
                    <h5>Climate</h5>
                    <p>{climate}</p>
                  </div>
                )}

                {ecozones && (
                  <div className="mb-4">
                    <h5>Ecozones</h5>
                    <p>{ecozones}</p>
                  </div>
                )}

                {physicalProcessExplained && (
                  <div className="mb-4">
                    <h5>Physical Processes</h5>
                    <p>{physicalProcessExplained}</p>
                  </div>
                )}

                {naturalResources && naturalResources.length > 0 && (
                  <div>
                    <h5>Natural Resources</h5>
                    <ul className="resource-list">
                      {naturalResources.map((resource, index) => (
                        <li key={index}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Indigenous Information Section */}
      {(indigenousPlaceNames || indigenousLandSharing || indigenousValueIncorporation) && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Indigenous Information</Card.Title>

                {indigenousPlaceNames && indigenousPlaceNames.length > 0 && (
                  <div className="mb-4">
                    <h5>Indigenous Place Names</h5>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Original Name</th>
                          <th>Indigenous Name</th>
                          <th>Nation/Community</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indigenousPlaceNames.map((place, index) => (
                          <tr key={index}>
                            <td>{place.originalName}</td>
                            <td>{place.indigenousName}</td>
                            <td>{place.nation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}

                {indigenousLandSharing && (
                  <div className="mb-4">
                    <h5>Land Sharing with Indigenous Communities</h5>
                    <p>{indigenousLandSharing}</p>
                  </div>
                )}

                {indigenousValueIncorporation && (
                  <div>
                    <h5>Indigenous Value Incorporation</h5>
                    <p>{indigenousValueIncorporation}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Demographics Section */}
      {(demographicsEthnicity || majorPopulationTrend) && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Demographics</Card.Title>

                {demographicsEthnicity && demographicsEthnicity.length > 0 && (
                  <div className="mb-4">
                    <h5>Population Ethnicity</h5>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Ethnic Group</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demographicsEthnicity.map((ethnicity, index) => (
                          <tr key={index}>
                            <td>{ethnicity.ethnicGroup}</td>
                            <td>{ethnicity.percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}

                {majorPopulationTrend && (
                  <div>
                    <h5>Major Population Trends</h5>
                    <p>{majorPopulationTrend}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Sustainability Section */}
      {(sustainabilityPlan || sustainabilityTransportation || sustainabilityHousing || 
        sustainabilityEnergy || sustainabilityGreenSpace || sustainabilityFoodSystem) && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Sustainability</Card.Title>

                {sustainabilityPlan && (
                  <div className="mb-4">
                    <h5>General Sustainability Plan</h5>
                    <p>{sustainabilityPlan}</p>
                  </div>
                )}

                <Row>
                  {sustainabilityTransportation && (
                    <Col md={6} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <Badge bg="info" className="me-2">Transportation</Badge>
                          </Card.Title>
                          <p>{sustainabilityTransportation}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}

                  {sustainabilityHousing && (
                    <Col md={6} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <Badge bg="info" className="me-2">Housing</Badge>
                          </Card.Title>
                          <p>{sustainabilityHousing}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}

                  {sustainabilityEnergy && (
                    <Col md={6} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <Badge bg="info" className="me-2">Energy</Badge>
                          </Card.Title>
                          <p>{sustainabilityEnergy}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}

                  {sustainabilityGreenSpace && (
                    <Col md={6} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <Badge bg="info" className="me-2">Green Space</Badge>
                          </Card.Title>
                          <p>{sustainabilityGreenSpace}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}

                  {sustainabilityFoodSystem && (
                    <Col md={6} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <Badge bg="info" className="me-2">Food System</Badge>
                          </Card.Title>
                          <p>{sustainabilityFoodSystem}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Impact Assessment Section */}
      {landPeopleImpact && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Impact Assessment</Card.Title>
                <h5>How Decisions Affect People and Land</h5>
                <p>{landPeopleImpact}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProvincePage;
