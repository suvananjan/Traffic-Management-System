# Smart Traffic Signal Management System

A comprehensive full-stack application for managing traffic signals across cities with real-time monitoring, route optimization, and administrative controls.

## Project Structure

\`\`\`
traffic-signal-system/
├── backend/
│   ├── models/
│   │   ├── Signal.js
│   │   ├── Route.js
│   │   ├── Traffic.js
│   │   └── Alert.js
│   ├── routes/
│   │   ├── signals.js
│   │   ├── routes.js
│   │   ├── traffic.js
│   │   └── alerts.js
│   ├── scripts/
│   │   └── seedDatabase.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── MapView.jsx
    │   │   ├── RouteFinder.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── styles/
    │   │   ├── Dashboard.css
    │   │   ├── MapView.css
    │   │   ├── RouteFinder.css
    │   │   └── AdminDashboard.css
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .gitignore
\`\`\`

## Features

- **Dashboard**: Real-time traffic statistics and signal status overview
- **Map View**: Interactive map with traffic signal locations and status indicators
- **Route Finder**: Find optimal routes between cities with traffic information
- **Admin Dashboard**: Manage traffic signals, add/delete signals, and monitor system
- **Real-time Monitoring**: Live traffic flow and congestion level tracking
- **Alert System**: Automatic alerts for traffic issues and signal malfunctions

## Installation

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file based on `.env.example`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Update `.env` with your MongoDB connection string:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/traffic-signals
   PORT=5000
   \`\`\`

5. Seed the database:
   \`\`\`bash
   node scripts/seedDatabase.js
   \`\`\`

6. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Signals
- `GET /api/signals` - Get all signals
- `GET /api/signals/:id` - Get signal by ID
- `POST /api/signals` - Create new signal
- `PUT /api/signals/:id` - Update signal
- `DELETE /api/signals/:id` - Delete signal

### Routes
- `GET /api/routes` - Get all routes (supports query params: startPoint, endPoint)
- `GET /api/routes/:id` - Get route by ID
- `POST /api/routes` - Create new route
- `PUT /api/routes/:id` - Update route
- `DELETE /api/routes/:id` - Delete route

### Traffic
- `GET /api/traffic` - Get all traffic data
- `GET /api/traffic/:signalId` - Get traffic data for specific signal
- `POST /api/traffic` - Create traffic record

### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts/:id` - Get alert by ID
- `POST /api/alerts` - Create new alert
- `PUT /api/alerts/:id` - Update alert
- `DELETE /api/alerts/:id` - Delete alert

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- React 18
- Vite
- Leaflet.js (Maps)
- CSS3

## Environment Variables

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb://localhost:27017/traffic-signals
PORT=5000
NODE_ENV=development
\`\`\`

## Database Models

### Signal
- signalId (String, unique)
- location (GeoJSON Point)
- city (String)
- status (red/yellow/green)
- redDuration, yellowDuration, greenDuration (Numbers)
- vehicleCount (Number)
- lastUpdated (Date)

### Route
- routeId (String, unique)
- startPoint (String)
- endPoint (String)
- distance (Number)
- duration (Number)
- signals (Array of Signal IDs)
- congestionLevel (low/medium/high)
- efficiency (Number)
- coordinates (Array of coordinates)

### Traffic
- trafficId (String, unique)
- signalId (String)
- vehicleCount (Number)
- congestionLevel (low/medium/high)
- averageWaitTime (Number)
- timestamp (Date)

### Alert
- alertId (String, unique)
- signalId (String)
- message (String)
- severity (low/medium/high)
- resolved (Boolean)
- createdAt (Date)
- resolvedAt (Date)

## Usage

1. **Dashboard**: View real-time statistics about traffic signals and flow
2. **Map View**: See all traffic signals on an interactive map
3. **Route Finder**: Enter start and end cities to find optimal routes
4. **Admin Dashboard**: Add new signals, manage existing ones, and monitor system health

## Future Enhancements

- Real-time WebSocket updates
- Machine learning-based traffic prediction
- Mobile app integration
- Advanced analytics and reporting
- Integration with OSRM for real routing
- User authentication and authorization
- Traffic camera integration

## License

MIT

## Support

For issues and questions, please open an issue on the repository.
