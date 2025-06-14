import React, { useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import CanadaMap from '../Map/CanadaMap';
import PopulationDensity from '../DataVisualization/PopulationDensity';
import PopulationPyramid from '../DataVisualization/PopulationPyramid';
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
    landPeopleImpact,
    populationPyramid,
    aiPlanning,
    islandCityPlan,
    projectReflection,
    demographicsAge // Added demographicsAge
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
        <Row className="mb-4 align-items-center flex-row-reverse">
          <Col md={6}>
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
          <Col md={6} className="d-flex justify-content-center">
            <img src="https://d3e1m60ptf1oym.cloudfront.net/93a6da4f-e3c0-487e-9d56-3b35f4e8cff8/_DSC7530_uxga.jpg" alt="Physical Geography" style={{maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(25,118,210,0.12)'}} />
          </Col>
        </Row>
      )}

      {/* Demographics Section */}
      {(demographicsEthnicity || majorPopulationTrend || populationPyramid || demographicsAge) && (
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

                {demographicsAge && demographicsAge.length > 0 && (
                  <div className="mb-4">
                    <h5>Population by Age Group</h5>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Age Group</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demographicsAge.map((age, index) => (
                          <tr key={index}>
                            <td>{age.ageGroup}</td>
                            <td>{age.percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}

                {majorPopulationTrend && (
                  <div className="mb-4">
                    <h5>Major Population Trends</h5>
                    <p>{majorPopulationTrend}</p>
                  </div>
                )}

                {populationPyramid && populationPyramid.length > 0 && (
                  <div>
                    <h5>Population Pyramid</h5>
                    <PopulationPyramid data={populationPyramid} />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Indigenous Information Section */}
      {(indigenousPlaceNames || indigenousLandSharing || indigenousValueIncorporation) && (
        <Row className="mb-4 align-items-center">
          <Col md={6}>
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
          <Col md={6} className="d-flex justify-content-center">
            <img src="https://th.bing.com/th/id/R.3da0218bea4f9736b42f84ee3b51d6de?rik=iet%2fuCtpjCo9hQ&pid=ImgRaw&r=0" alt="Indigenous" style={{maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(25,118,210,0.12)'}} />
          </Col>
        </Row>
      )}

      {/* Sustainability Section */}
      {(sustainabilityPlan || sustainabilityTransportation || sustainabilityHousing || 
        sustainabilityEnergy || sustainabilityGreenSpace || sustainabilityFoodSystem) && (
        <Row className="mb-4 align-items-center flex-row-reverse">
          <Col md={6} className="d-flex flex-column align-items-center gap-3">
            <img src="https://th.bing.com/th/id/OIP.LL2jnXyzIr0_JC73z9duEAHaEO?r=0&rs=1&pid=ImgDetMain" alt="Sustainability" style={{maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(25,118,210,0.12)'}} />
            {/* Add your custom image below this line */}
            <img src="https://th.bing.com/th/id/OIP.IH01aUJcJNg9ontWTgLsmAHaFj?r=0&rs=1&pid=ImgDetMain" alt="Custom Sustainability" style={{maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(25,118,210,0.12)'}} />
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Sustainability</Card.Title>
                {sustainabilityPlan && (
                  <div className="mb-4">
                    <h5>General Sustainability Plan</h5>
                    <p>{sustainabilityPlan}</p>
                  </div>
                )}
                {sustainabilityTransportation && (
                  <div className="mb-4">
                    <Card className="w-100">
                      <Card.Body>
                        <Card.Title>
                          <Badge bg="info" className="me-2">Transportation</Badge>
                        </Card.Title>
                        <p>{sustainabilityTransportation}</p>
                      </Card.Body>
                    </Card>
                  </div>
                )}
                {sustainabilityHousing && (
                  <div className="mb-4">
                    <Card className="w-100">
                      <Card.Body>
                        <Card.Title>
                          <Badge bg="info" className="me-2">Housing</Badge>
                        </Card.Title>
                        <p>{sustainabilityHousing}</p>
                      </Card.Body>
                    </Card>
                  </div>
                )}
                {sustainabilityEnergy && (
                  <div className="mb-4">
                    <Card className="w-100">
                      <Card.Body>
                        <Card.Title>
                          <Badge bg="info" className="me-2">Energy</Badge>
                        </Card.Title>
                        <p>{sustainabilityEnergy}</p>
                      </Card.Body>
                    </Card>
                  </div>
                )}
                {sustainabilityGreenSpace && (
                  <div className="mb-4">
                    <Card className="w-100">
                      <Card.Body>
                        <Card.Title>
                          <Badge bg="info" className="me-2">Green Space</Badge>
                        </Card.Title>
                        <p>{sustainabilityGreenSpace}</p>
                      </Card.Body>
                    </Card>
                  </div>
                )}
                {sustainabilityFoodSystem && (
                  <div className="mb-4">
                    <Card className="w-100">
                      <Card.Body>
                        <Card.Title>
                          <Badge bg="info" className="me-2">Food System</Badge>
                        </Card.Title>
                        <p>{sustainabilityFoodSystem}</p>
                      </Card.Body>
                    </Card>
                  </div>
                )}
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

      {/* AI Planning Section */}
      {aiPlanning && (
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Planning with AI</Card.Title>
                <p>{aiPlanning}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <img src="https://th.bing.com/th/id/OIP.21b2JeQI_l-e9pHfCCJvSgHaE8?r=0&o=7rm=3&rs=1&pid=ImgDetMain" alt="AI Planning" style={{maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(25,118,210,0.12)'}} />
          </Col>
        </Row>
      )}

      {/* Island City Plan Section */}
      {islandCityPlan && (
        <Row className="mb-4 align-items-center flex-row-reverse">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>The Island City Vision</Card.Title>
                <p>{islandCityPlan}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <img src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-7c54-622f-a9c8-b38af2904924/raw?se=2025-06-13T17%3A29%3A18Z&sp=r&sv=2024-08-04&sr=b&scid=0ce6d289-aedf-54d9-98bf-59b34ff29924&skoid=bbd22fc4-f881-4ea4-b2f3-c12033cf6a8b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-13T14%3A03%3A44Z&ske=2025-06-14T14%3A03%3A44Z&sks=b&skv=2024-08-04&sig=9v0ZC2H4UPn3t9fjrAJdvGS7iIVPjpgiJozm/9zuhVc%3D" alt="Island City" style={{maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(25,118,210,0.12)'}} />
          </Col>
        </Row>
      )}

      {/* Project Reflection Section */}
      {projectReflection && (
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Project Reflection</Card.Title>
                <p>{projectReflection}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80" alt="Reflection" style={{maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(25,118,210,0.12)'}} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProvincePage;
