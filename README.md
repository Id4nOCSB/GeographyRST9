# Canadian Province Geography Tool

This interactive web application allows you to explore and customize information about Canadian provinces. You can edit province data, create custom maps, visualize population density, and mark industry locations.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Using the Application](#using-the-application)
  - [Viewing Province Data](#viewing-province-data)
  - [Editing Province Data](#editing-province-data)
  - [Drawing on Maps](#drawing-on-maps)
  - [Saving Your Work](#saving-your-work)
  - [Customizing JSON Files Directly](#customizing-json-files-directly)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Additional Help](#additional-help)

## Getting Started

### Prerequisites

Before you can use this application, you'll need to install some software on your computer. Don't worry - we'll walk you through each step!

1. **Install Node.js and npm**
   - Node.js is a software that allows JavaScript to run on your computer
   - npm (Node Package Manager) comes with Node.js and helps install other software

   **Download and install Node.js:**
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download the "LTS" (Long Term Support) version - this is the most stable
   - Run the installer and follow the prompts
   - Accept all default settings during installation
   - When finished, restart your computer

2. **Install Git (Optional, but recommended)**
   - Git helps download and manage code

   **Download and install Git:**
   - Go to [https://git-scm.com/downloads](https://git-scm.com/downloads)
   - Download the version for your operating system
   - Run the installer and follow the prompts
   - Accept all default settings during installation

3. **Install Visual Studio Code (Optional, but helpful)**
   - This is a program that makes it easier to view and edit code files

   **Download and install VS Code:**
   - Go to [https://code.visualstudio.com/](https://code.visualstudio.com/)
   - Download the version for your operating system
   - Run the installer and follow the prompts
   - Accept all default settings during installation

### Installation

Now that you have the necessary software, let's get the application running:

1. **Download the project**

   **Option 1: If you installed Git:**
   - Open Command Prompt (Windows) or Terminal (Mac)
   - Navigate to where you want to save the project:
     ```
     cd Desktop
     ```
   - Clone the repository:
     ```
     git clone [repository-url]
     ```
     (Replace [repository-url] with the actual URL provided)

   **Option 2: If you didn't install Git:**
   - Download the project as a ZIP file
   - Extract the ZIP file to your Desktop or another location you can easily find

2. **Install project dependencies**
   - Open Command Prompt (Windows) or Terminal (Mac)
   - Navigate to the project folder:
     ```
     cd Desktop\georsttool
     ```
     (If you saved it somewhere else, adjust the path accordingly)
   - Install the required packages:
     ```
     npm install
     ```
   - This might take a few minutes - it's downloading all the necessary components

3. **Start the application**
   - In the same Command Prompt or Terminal window, run:
     ```
     npm start
     ```
   - The application will automatically open in your web browser
   - If it doesn't open automatically, go to [http://localhost:3000](http://localhost:3000) in your browser

## Using the Application

### Viewing Province Data

When you first open the application, you'll see information about a sample Canadian province:

- **Overview**: Basic information about the province
- **Key Facts**: Important details about the province
- **Location**: A map showing the province's location
- **Population Density**: A chart showing population density by region
- **Industry Locations**: A map showing major industries in the province
- **Images**: Photos related to the province

### Editing Province Data

You can customize all the information about the province:

1. Click the "Edit Province Data" button at the top of the page
2. Use the tabs to navigate between different sections:
   - **Basic Information**: Change the province name, capital, population, etc.
   - **Population Density**: Edit population data for different regions
   - **Industries**: Add or edit industry locations
   - **Key Facts**: Customize important facts about the province
   - **Province Shape**: Draw a custom shape for the province on the map
   - **Images**: Add or edit images of the province
3. Make your changes in each section
4. Click "Save Changes" at the bottom when you're done

### Drawing on Maps

The application includes two ways to draw on maps:

1. **Province Shape**: In edit mode, go to the "Province Shape" tab
   - Use the drawing tools in the top-right corner of the map
   - Click the square icon to draw a rectangle
   - Click the polygon icon to draw a custom shape
   - Click the circle icon to draw a circle
   - Use the edit tool (middle icon) to modify existing shapes
   - Use the delete tool (trash icon) to remove shapes

2. **Industry Locations**: On the main view, scroll down to the Industry Locations section
   - Use the drawing tools in the top-right corner of the map
   - Draw blue areas to highlight regions of interest

### Saving Your Work

Your changes are automatically saved to your browser's local storage when you click "Save Changes". This means:

- Your data will persist even if you close the browser and come back later
- If you want to start over, click the "Reset to Default Data" button at the top of the page

### Customizing JSON Files Directly

This application is designed to work without a backend server, making it perfect for hosting on GitHub Pages. All province data is stored in JSON files that you can edit directly:

1. **Edit the Province Data File**:
   - Open the file `public/provinceData.json` in any text editor
   - Replace the example data with your own province information
   - Save the file

2. **Edit the GeoJSON File (Optional)**:
   - If you want to customize the map shapes, open `public/canadaGeoJson.json`
   - Modify the coordinates for your province or add new provinces
   - Make sure the province name in the GeoJSON matches the name in your provinceData.json

**Example JSON Structure:**

```json
{
  "name": "Alberta",
  "capital": "Edmonton",
  "population": 4371000,
  "area": 661848,
  "description": "Alberta is a province in Western Canada...",

  "keyFacts": [
    { "fact": "Official Language", "value": "English" },
    { "fact": "Major Cities", "value": "Calgary, Edmonton, Red Deer" }
  ],

  "images": [
    { 
      "url": "https://example.com/alberta-mountains.jpg", 
      "caption": "Rocky Mountains in Alberta" 
    }
  ]
}
```

After editing these files, rebuild and redeploy your application to see the changes.

## Deployment

To make your website publicly accessible (not just on localhost), you can deploy it to GitHub Pages:

1. **Update the homepage URL**
   - Open the `package.json` file
   - Change the `homepage` field to match your GitHub username and repository name:
     ```
     "homepage": "https://yourusername.github.io/georsttool"
     ```
     (Replace "yourusername" with your actual GitHub username)

2. **Create a GitHub repository**
   - Go to [GitHub](https://github.com) and sign in
   - Click the "+" icon in the top-right corner and select "New repository"
   - Name your repository "georsttool"
   - Make it public
   - Click "Create repository"

3. **Push your code to GitHub**
   - Open Command Prompt (Windows) or Terminal (Mac)
   - Navigate to your project folder
   - Initialize a Git repository (if you haven't already):
     ```
     git init
     git add .
     git commit -m "Initial commit"
     ```
   - Connect to your GitHub repository:
     ```
     git remote add origin https://github.com/yourusername/georsttool.git
     ```
     (Replace "yourusername" with your actual GitHub username)
   - Push your code:
     ```
     git push -u origin main
     ```
     (If you're using an older version of Git, you might need to use `master` instead of `main`)

4. **Deploy to GitHub Pages**
   - Run the following command:
     ```
     npm run deploy
     ```
   - This will build your project and publish it to GitHub Pages
   - After a few minutes, your website will be available at the URL you specified in the `homepage` field

5. **Update your deployment**
   - Whenever you make changes to your project, commit them to Git:
     ```
     git add .
     git commit -m "Description of changes"
     git push
     ```
   - Then deploy the updated version:
     ```
     npm run deploy
     ```

## Troubleshooting

**The application won't start**
- Make sure you've installed Node.js correctly
- Try running `npm install` again
- Check that you're in the correct folder when running commands

**Changes aren't saving**
- Make sure you click the "Save Changes" button after making edits
- Try using a different web browser (Chrome or Firefox recommended)

**Maps aren't loading**
- Check your internet connection
- Try refreshing the page
- Make sure you haven't blocked location services in your browser

## Additional Help

If you need more assistance:

- Check the [React documentation](https://reactjs.org/) for general React help
- For map-related questions, see the [Leaflet documentation](https://leafletjs.com/)
- Contact the project maintainer for specific questions about this application
