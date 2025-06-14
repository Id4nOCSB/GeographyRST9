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
            name: "Intel Technology Park",
            type: "Technology",
            position: [51.02, -114.1] as [number, number],
            employees: 50000,
            description: "A technology hub not only for Intel but also for many other tech companies, fostering innovation and development."
        },
        {
            id: 3,
            name: "Hostne Grand farms",
            type: "Agriculture",
            position: [50.9, -114.2] as [number, number],
            employees: 6000,
            description: "A major agricultural processing and distribution center."
        },
        {
            id: 4,
            name: "Monarch Mining Co.",
            type: "Mining",
            position: [51.1, -114.3] as [number, number],
            employees: 3500,
            description: "A large mining operation extracting valuable minerals, such as iron and copper."
        },
        {
            id: 5,
            name: "Harmony Bankers",
            type: "Banking",
            position: [51.15, -114.0] as [number, number],
            employees: 20000,
            description: "A vital financial institution providing banking services to the nation and beyond."
        }
    ],

    // Key facts about the province
    keyFacts: [
        {fact: "Official Language", value: "English and French"},
        {fact: "Major Cities", value: "Harmony City, SherClarke, South Macedonia"},
        {fact: "Main Industries", value: "Technology, Banking"},
        {fact: "Famous Landmarks", value: "Harmony Tower, Great Lakes National Park"},
        {fact: "Year Founded", value: "2026"}
    ],

    // Images of the province (replace with actual image URLs)
    images: [
        {
            url: "https://northernontario.travel/sites/default/files/styles/banner_xl/public/_Outdoor-Adventure-mountains-in-ontario-Header-.jpg?itok=Ztq6ZsHI",
            caption: "Beautiful landscape in the province"
        },
        {
            url: "https://th.bing.com/th/id/OIP.lSYJtrZvU1lrHQS8oFaK6gHaDN?rs=1&pid=ImgDetMain",
            caption: "A mini hub skyline"
        },
        {
            url: "https://andredenisimages.weebly.com/uploads/8/3/4/3/8343708/7741150_orig.jpg",
            caption: "Local wildlife in their natural habitat"
        },
        {
            url: "https://th.bing.com/th/id/OIP.44-5e2r3E_WBOHzXqj5GdwHaE7?rs=1&pid=ImgDetMain",
            caption: "A traditional cultural event"
        },
        {
            url: "https://th.bing.com/th/id/R.e9b4f59d52158453b15f5b75f30ae6cb?rik=o3sqN%2fsHX3Clsg&pid=ImgRaw&r=0&sres=1&sresct=1",
            caption: "One of the province's major industries"
        },
        {
            url: "https://images.squarespace-cdn.com/content/v1/5266049fe4b08e763cc00c4b/1472836689352-AERO2QQPG013IV269COM/ke17ZwdGBToddI8pDm48kCX-V5vw-8h9IBXN10-_8XN7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0p4Wyba38KfG317vYluk45_zZdtnDCZTLKcP2mivxmYi50xvY5saIGKMgOza9mH4XA/image-asset.jpeg",
            caption: "A significant natural feature in the province"
        }
    ],

    // New fields added as requested
    landforms: "A relatively flat land shaped by glaciers. It is home to countless lakes, dense forests, and vast river systems. The location on the great lakes has caused the region to have a strong connection to the water and is vital to the nation of Canada.",
    climate: "The climate in this region is not the same across all parts. The majority of the population resides near the Great Lakes, where the average summer temperature is 22 °C and the average winter temperature is -4 °C. It is a temperate zone with the vast stabilizing effects of the Great Lakes. There is a lot of precipitation in the region, averaging 900mm per year.",
    ecozones: "This region is host to a diverse Mixedwood Plains ecozone. This includes rich and fertile land, warm climate for the nation and a great many resources both renewable and less so. This zone hosts much of Canada’s biodiversity and vital Indigenous regions.",
    physicalProcessExplained: "Thermal Stratification is the process of water separating based on its temperature. The hot water raises to the surface whilst the cold water sinks to the bottom of the lakes. This process occurs in the spring and summer. This leads to a interesting movement of fish and other living organisms in the lakes.",
    naturalResources: [
        "Forests (timber, biodiversity)",
        "Lakes and rivers (freshwater, fish, recreation)",
        "Fertile soil (agriculture, local food)",
        "Minerals and ores (iron, copper, rare earths)",
        "Wind and solar (renewable energy)",
        "Hydropower (lake and river energy)",
        "Wildlife (hunting, ecotourism)",
        "Stone and gravel (construction)"
    ],
    indigenousPlaceNames: [
        { originalName: "Waabshkiiganaang (new Barrie)", indigenousName: "Place of white waters", nation: "Anishinabee" },
        { originalName: "Mishigami-Wiikwedong (Owen’s sound)", indigenousName: "The great bay of water, same core as for michigan", nation: "Anishinabee" }
    ],
    indigenousLandSharing: "Land is shared with the indigenous people in a simple manner. The land where they reside is their land and it is recognized as such. In areas where they are not a prominent group, it will be set up in a manner where they are given equal rights to the rest of the inhabitants of the region no more and no less.",
    indigenousValueIncorporation: "Every tree is replanted and 50 cents are donated per tree to the indigenous people of the province. Fishing is sustainable as there are limits on the amount of fish a fisherman can fish that fluctuate per region and are target to help small operations more than larger ones. Indigenous knowledge or perspectives on stewardship are respected.",
    demographicsEthnicity: [
        { ethnicGroup: "Jewish", percentage: 6 },
        { ethnicGroup: "Chinese", percentage: 11 },
        { ethnicGroup: "Indian", percentage: 20 },
        { ethnicGroup: "Canadian", percentage: 28 },
         { ethnicGroup: "Indigenous", percentage: 5 },
          { ethnicGroup: "Other", percentage: 30 }
    ],
    demographicsAge: [
        { ageGroup: "0–19", percentage: 23 },
        { ageGroup: "20–39", percentage: 35 },
        { ageGroup: "40–64", percentage: 30 },
        { ageGroup: "65+", percentage: 12 }
    ],
    majorPopulationTrend: "Urban Sprawl and mini centers.",
    sustainabilityHousing: "We plan to create sustainable housing by creating mixed use regions. The property tax will be changed to equal cost of the government for the services that it provides. The government will pay for the first floor of construction in a high rise and sell it to businesses whose customer base is that of the people in the highrises. This will incentivise walkability. Increased public transportation demand will lead to a system of mini hubs that specialize on certain industries. Homes will be between mini hubs with highrises. This leads to a system where all people have access to the housing they want and the transportation abilities that suit them.",
    sustainabilityEnergy: "The plan for energy creation has to be both economically viable and sustainable. The main energy source should be nuclear using the uranium that is produced within our nation. This will lead to a stable energy source which our people can depend on. Whilst we will also invest into windmills and solar panels to help grow our diversity as a province and a nation.",
    sustainabilityGreenSpace: "The plan for greenspace in the province is to combine the urban developments with green ideas. We plan to use rooftop farms to help keep food fresh and limit gas cost and pollution, and to give everyone a chance to learn about farming. We will take much of the land usually used for car infrastructure, move the necessary infrastructure vertically, and build the rest of the area into a zone full of parks, shops, and other walking zones.",
    sustainabilityFoodSystem: "The food system sustainability plan in Lake Nova digs into local, strong, and community-based food supplies. Urban farming plans like rooftop gardening, vertical farming, and community greenhouses are vital for residential and commercial zones to limit food miles and center on self sufficiency. Local farmer’s markets are helped through the provincial and municipal funds and zoning laws that prioritize food access in all regions of the province. Schools and other public buildings partner with local farmers to give fresh meals whilst the provincial composting program has turned turn organic waste into nutrient-rich soil. This interloop system limits dependance on international food supply chains and ensures that food supplies remain open to all, environmentally friendly, and rooted in the local community. (OpenAI, 2025)",
    populationPyramid: [
        { ageGroup: "0-4", male: 320000, female: 300000 },
        { ageGroup: "5-9", male: 330000, female: 310000 },
        { ageGroup: "10-14", male: 340000, female: 320000 },
        { ageGroup: "15-19", male: 350000, female: 330000 },
        { ageGroup: "20-24", male: 400000, female: 390000 },
        { ageGroup: "25-29", male: 420000, female: 410000 },
        { ageGroup: "30-34", male: 430000, female: 420000 },
        { ageGroup: "35-39", male: 440000, female: 430000 },
        { ageGroup: "40-44", male: 420000, female: 410000 },
        { ageGroup: "45-49", male: 410000, female: 400000 },
        { ageGroup: "50-54", male: 390000, female: 380000 },
        { ageGroup: "55-59", male: 370000, female: 360000 },
        { ageGroup: "60-64", male: 350000, female: 340000 },
        { ageGroup: "65-69", male: 300000, female: 320000 },
        { ageGroup: "70-74", male: 250000, female: 270000 },
        { ageGroup: "75-79", male: 200000, female: 220000 },
        { ageGroup: "80+", male: 150000, female: 180000 }
    ],
    aiPlanning: `As a province we plan to use artificial intelligence and integrate it into the perfect city assistant. We will use AI to help control traffic lights to not only be the most efficient for the majority of people, but also to make it faster not to speed. We will use it to help analyze public transportation users and to fit the demand to supply not only in the time periods but also taking daily events into account. We will use AI and integrate it with road sensors to know what roads to repair and when, how many cars use said road and where there are often crashes and speeders. This will not only make our province safer but save us money in the long run. We plan to also use AI to help builders understand where there is demand for housing and of what price and type. This will also help us know how many more systems we need for public transportation. This will also help us plan ahead for sustainability plans.`,
    islandCityPlan: `If we want a province of the future we have to build it. We have to work with the resources we have and take full power of what we can to make this the future. Our goal is to create a new city. A floating city built right off our coast and anchored to the mainland. This is no sort of gimmick it is a truly smart system that will revitalize our nation. We will use climate controlled environments through our natural resources. We will use mixed use spaced and in house gardens for oxygen. Don't worry about food as we will create vertical farms that are self sufficient by robot workers, that charge through a cycle of the same water used for the plants. We will also have the water filtration systems so we can take the water from the great lake and turn it into safe drinkable water for our people. Our electricity will be collected through the hydro of the lake with our bottom based lake water movement systems. Our trains and all transport will be built on maglev that will not only bring you throughout the city but also to the mainland. This will be not only fast but also very efficient and safe. Due to the prebuilt design it is zero emission with the farms and clean energy accounting for all the human negatives. Some may call this a fantasy but in truth all these factors already exist across the world. This is the modern creation of our nation and it will be a vital part of our future security. A city of the future doesn't need to be expensive for our environment and even for our people and it will pay back for itself through rent, property taxes, and the cost savings from investing in lowering emission. That is the goal for our future and it is feasible, we are a strong nation that is in need of a modern vision. This is our future, this is our plan.`,
    projectReflection: `Throughout the time that I was creating LakeNova, I understood something vital for my future conversations. I understood how geography and sustainability are not just connected but intertwined in a way that I never thought. Cities have to balance their economic strength with their future sustainability. The importance of indigenous communities in our nation can help us understand how to do things in a different way, our future is built on our present and we need to use this knowledge to build it. This is what I learned throughout the creation of this project.`,
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
