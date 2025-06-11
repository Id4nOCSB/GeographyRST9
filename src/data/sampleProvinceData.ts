// This is sample data for a fictional Canadian province
// Replace with your actual province data

export const sampleProvinceData = {
    name: "Lake Nova",
    capital: "Harmony City",
    population: 11000000,
    area: 115000,
    description: "Lakenova is an ultra-modern, urban province located in the south of modern day Ontario,  It is a major global hub for banking, technology, and innovation. Rich in forests, lakes, and fertile land, the province pushes for sustainable industries including lumber, fishing, and agriculture. Its climate, controlled by the Great Lakes, creates interesting ecosystems and lots of biodiversity. Lakenova’s sustainability plan emphasizes mixed-use housing, walkability, and public transit mini-hubs, whils’t integrating Indigenous values and companionship. The province manages resources responsibly through reforestation, regulated fishing, and a strong energy strategy centered on domestic nuclear power. With a culturally varient grand population of 11 million people, Lakenova redefines urban sprawl issues through innovative land use, showcasing a forward thinking approach that is necessary for the blending of economic growth with environmental care and social inclusion to build a prosperous and sustainable future.",
    mapCenter: [45.0, -80.0] as [number, number], // Latitude and longitude of the center of your province

    // Population density data for different regions within the province
    populationDensityData: [
        {region: "Harmony city", density: 9658},
        {region: "Sherclarke", density: 6739},
        {region: "South Macedonia", density: 4208},
        {region: "Conductor Semi", density: 3685},
        {region: "Theshir", density: 965},
        {region: "Cafebecian", density: 37},
        {region: "Oranzna", density: 15}
    ],

    // Industry locations within the province
    industries: [
        {
            id: 1,
            name: "ManuX",
            type: "Manufacturing",
            position: [43.69, -80.35] as [number, number],
            employees: 5000,
            description: "A large manufacturing facility producing Xray machines for the great Canadian nation."
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
        {fact: "Official Language", value: "English and French"},
        {fact: "Major Cities", value: "City 1, City 2, City 3"},
        {fact: "Climate", value: "Describe the climate here"},
        {fact: "Main Industries", value: "List main industries"},
        {fact: "Natural Resources", value: "List natural resources"},
        {fact: "Famous Landmarks", value: "List famous landmarks"},
        {fact: "Year Founded", value: "Year the province was founded"}
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
    ],

    // New fields added as requested
    landforms: "Rolling hills, lakes, and river valleys.",
    climate: "Humid continental with warm summers and cold winters.",
    ecozones: "Mixedwood Plains, Boreal Shield.",
    physicalProcessExplained: "Glacial retreat shaped the landscape, forming lakes and fertile soil.",
    naturalResources: ["Timber", "Freshwater", "Minerals", "Fertile soil"],
    indigenousPlaceNames: [
        { originalName: "Harmony City", indigenousName: "Nibiwakamig", nation: "Anishinaabe" },
        { originalName: "Lake Nova", indigenousName: "Mishigamaa", nation: "Ojibwe" }
    ],
    indigenousLandSharing: "Co-management of parks and protected areas with Indigenous communities.",
    indigenousValueIncorporation: "Indigenous stewardship principles in resource management.",
    demographicsEthnicity: [
        { ethnicGroup: "Indigenous", percentage: 10 },
        { ethnicGroup: "European", percentage: 60 },
        { ethnicGroup: "Asian", percentage: 20 },
        { ethnicGroup: "Other", percentage: 10 }
    ],
    majorPopulationTrend: "Urbanization and increasing cultural diversity.",
    sustainabilityPlan: "Net-zero emissions by 2050, green infrastructure investment.",
    sustainabilityTransportation: "Expansion of electric public transit and bike lanes.",
    sustainabilityHousing: "Affordable, energy-efficient mixed-use housing developments.",
    sustainabilityEnergy: "Focus on nuclear, hydro, and solar energy.",
    sustainabilityGreenSpace: "Urban parks, reforestation, and green corridors.",
    sustainabilityFoodSystem: "Support for local agriculture and sustainable fisheries.",
    landPeopleImpact: "Policies to minimize urban sprawl and protect natural habitats."
};

// This is a simplified GeoJSON for Canadian provinces
// In a real application, you would use a complete GeoJSON file
export const simplifiedCanadaGeoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Lake Nova"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-76.38213014886612, 44.27119644824775],
                        [-80.09324347328828, 44.47130522837279],
                        [-81.36503698303243, 45.4005013782538],
                        [-81.93632606663162, 45.35419832916366],
                        [-82.43364424806886, 42.98917643235139],
                        [-83.14151071934985, 42.06292409976017],
                        [-82.50705024669885, 41.86441115188866],
                        [-78.92550719882686, 42.85881745857684],
                        [-79.06832946972668, 43.29016611627121],
                        [-76.38213014886612, 44.27119644824775]
                    ]
                ]
            }
        },
    ]
};
