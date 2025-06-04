export interface ProvinceData {
  name: string;
  capital: string;
  population: number;
  area: number;
  description: string;
  mapCenter: [number, number]; // [latitude, longitude]
  provinceShape?: GeoJSON.Feature; // GeoJSON data for the province shape

  // Physical geography information
  landforms?: string;
  climate?: string;
  ecozones?: string;
  physicalProcessExplained?: string;
  naturalResources?: string[];

  // Indigenous information
  indigenousPlaceNames?: { 
    originalName: string; 
    indigenousName: string;
    nation: string;
  }[];
  indigenousLandSharing?: string;
  indigenousValueIncorporation?: string;

  // Demographics
  demographicsEthnicity?: {
    ethnicGroup: string;
    percentage: number;
  }[];
  majorPopulationTrend?: string;

  // Sustainability
  sustainabilityPlan?: string;
  sustainabilityTransportation?: string;
  sustainabilityHousing?: string;
  sustainabilityEnergy?: string;
  sustainabilityGreenSpace?: string;
  sustainabilityFoodSystem?: string;

  // Impact assessment
  landPeopleImpact?: string;

  // Existing fields
  populationDensityData: { 
    region: string; 
    density: number 
  }[];
  industries: {
    id: number;
    name: string;
    type: string;
    position: [number, number];
    employees?: number;
    description?: string;
  }[];
  keyFacts: { 
    fact: string; 
    value: string 
  }[];
  images: { 
    url: string; 
    caption: string 
  }[];
}
