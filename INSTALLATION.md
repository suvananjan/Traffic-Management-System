# Frontend Installation Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

## Step-by-Step Installation

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd frontend
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will open automatically at `http://localhost:3000`

### 4. Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates an optimized production build in the `dist` folder.

### 5. Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Configuration

The frontend is configured to connect to the backend at `http://localhost:5000`. If your backend is running on a different URL, update the fetch URLs in the component files.

## Project Structure

\`\`\`
src/
├── pages/
│   ├── Dashboard.jsx       # Main dashboard with statistics
│   ├── MapView.jsx         # Interactive map with signals
│   ├── RouteFinder.jsx     # Route search and optimization
│   └── AdminDashboard.jsx  # Admin controls
├── styles/
│   ├── Dashboard.css
│   ├── MapView.css
│   ├── RouteFinder.css
│   └── AdminDashboard.css
├── App.jsx                 # Main app component
├── App.css                 # App styles
├── index.css               # Global styles
└── main.jsx                # Entry point
\`\`\`

## Features

### Dashboard
- Real-time traffic statistics
- Signal status overview
- Traffic flow metrics
- Average wait times

### Map View
- Interactive Leaflet map
- Signal location markers
- Color-coded signal status (red/yellow/green)
- Popup information on marker click

### Route Finder
- Search routes between cities
- View multiple route options
- Detailed route information
- Congestion level display
- Efficiency ratings

### Admin Dashboard
- Add new traffic signals
- Delete existing signals
- View all signals in a table
- Manage signal parameters

## Troubleshooting

### Backend Connection Error

If you see connection errors:
1. Ensure the backend server is running on http://localhost:5000
2. Check browser console (F12) for error messages
3. Verify CORS is enabled on the backend

### Map Not Loading

If the map doesn't display:
1. Check browser console for errors
2. Ensure Leaflet CSS is loaded (check index.html)
3. Verify internet connection for map tiles

### No Routes Displaying

If routes don't show up:
1. Ensure backend is running and database is seeded
2. Check that you're using valid city names (Guntur, Bangalore)
3. Check browser console for API errors

## Development Tips

- Use browser DevTools (F12) to debug
- Check the Network tab to see API calls
- Use Console tab to see error messages
- React DevTools extension is helpful for component debugging

## Deployment

### Deploy to Vercel

\`\`\`bash
npm run build
vercel
\`\`\`

### Deploy to Netlify

\`\`\`bash
npm run build
netlify deploy --prod --dir=dist
\`\`\`

### Deploy to GitHub Pages

Update vite.config.js:
\`\`\`js
export default {
  base: '/repository-name/',
  // ... rest of config
}
\`\`\`

Then:
\`\`\`bash
npm run build
# Deploy dist folder to GitHub Pages
\`\`\`

## Next Steps

1. Customize the styling to match your brand
2. Add more cities and signals to the database
3. Implement real-time updates with WebSockets
4. Add user authentication
5. Integrate with real traffic data APIs
