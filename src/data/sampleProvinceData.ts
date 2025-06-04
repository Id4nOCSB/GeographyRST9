// This is sample data for a fictional Canadian province
// Replace with your actual province data

export const sampleProvinceData = {
  name: "Your Province Name",
  capital: "Capital City",
  population: 2500000,
  area: 72000,
  description: "This is a detailed description of your province. Include information about its geography, history, economy, and culture. Discuss what makes this province unique and interesting. You can add as much detail as needed to provide a comprehensive overview.",
  mapCenter: [51.0, -114.0] as [number, number], // Latitude and longitude of the center of your province

  // Population density data for different regions within the province
  populationDensityData: [
    { region: "Urban Area 1", density: 1200 },
    { region: "Urban Area 2", density: 950 },
    { region: "Suburban Region 1", density: 450 },
    { region: "Suburban Region 2", density: 380 },
    { region: "Rural Area 1", density: 25 },
    { region: "Rural Area 2", density: 15 },
    { region: "Remote Region", density: 2 }
  ],

  // Industry locations within the province
  industries: [
    {
      id: 1,
      name: "Major Manufacturing Plant",
      type: "Manufacturing",
      position: [51.05, -114.05] as [number, number],
      employees: 5000,
      description: "A large manufacturing facility producing industrial equipment."
    },
    {
      id: 2,
      name: "Technology Park",
      type: "Technology",
      position: [51.02, -114.1] as [number, number],
      employees: 8000,
      description: "A cluster of technology companies and startups."
    },
    {
      id: 3,
      name: "Agricultural Center",
      type: "Agriculture",
      position: [50.9, -114.2] as [number, number],
      employees: 1200,
      description: "A major agricultural processing and distribution center."
    },
    {
      id: 4,
      name: "Mining Operation",
      type: "Mining",
      position: [51.1, -114.3] as [number, number],
      employees: 3500,
      description: "A large mining operation extracting valuable minerals."
    },
    {
      id: 5,
      name: "Tourism Hub",
      type: "Tourism",
      position: [51.15, -114.0] as [number, number],
      employees: 2000,
      description: "A popular tourist destination with various attractions."
    }
  ],

  // Key facts about the province
  keyFacts: [
    { fact: "Official Language", value: "English and French" },
    { fact: "Major Cities", value: "City 1, City 2, City 3" },
    { fact: "Climate", value: "Describe the climate here" },
    { fact: "Main Industries", value: "List main industries" },
    { fact: "Natural Resources", value: "List natural resources" },
    { fact: "Famous Landmarks", value: "List famous landmarks" },
    { fact: "Year Founded", value: "Year the province was founded" }
  ],

  // Images of the province (replace with actual image URLs)
  images: [
    { 
      url: "https://via.placeholder.com/800x600?text=Province+Landscape", 
      caption: "Beautiful landscape in the province" 
    },
    { 
      url: "https://via.placeholder.com/800x600?text=Capital+City", 
      caption: "The capital city skyline" 
    },
    { 
      url: "https://via.placeholder.com/800x600?text=Local+Wildlife", 
      caption: "Local wildlife in their natural habitat" 
    },
    { 
      url: "https://via.placeholder.com/800x600?text=Cultural+Event", 
      caption: "A traditional cultural event" 
    },
    { 
      url: "https://via.placeholder.com/800x600?text=Industry", 
      caption: "One of the province's major industries" 
    },
    { 
      url: "https://via.placeholder.com/800x600?text=Natural+Feature", 
      caption: "A significant natural feature in the province" 
    }
  ]
};

// This is a simplified GeoJSON for Canadian provinces
// In a real application, you would use a complete GeoJSON file
export const simplifiedCanadaGeoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Your Province Name"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-115.0, 50.5],
            [-113.0, 50.5],
            [-113.0, 51.5],
            [-115.0, 51.5],
            [-115.0, 50.5]
          ]
        ]
      }
    },
    // Add other provinces as needed
    {
      "type": "Feature",
      "properties": {
        "name": "Alberta"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-120.0, 49.0],
            [-110.0, 49.0],
            [-110.0, 60.0],
            [-120.0, 60.0],
            [-120.0, 49.0]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "British Columbia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-139.0, 49.0],
            [-120.0, 49.0],
            [-120.0, 60.0],
            [-139.0, 60.0],
            [-139.0, 49.0]
          ]
        ]
      }
    }
  ]
};
