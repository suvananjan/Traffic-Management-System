# Backend Installation Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Step-by-Step Installation

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd backend
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Environment Configuration

Create a `.env` file in the backend directory:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your MongoDB connection string:

\`\`\`
MONGODB_URI=mongodb://localhost:27017/traffic-signals
PORT=5000
NODE_ENV=development
\`\`\`

### 4. Database Setup

Seed the database with sample data:

\`\`\`bash
node scripts/seedDatabase.js
\`\`\`

This will create:
- 6 traffic signals (3 in Guntur, 3 in Bangalore)
- 3 sample routes between cities
- Traffic data for each signal
- Sample alerts

### 5. Start the Server

Development mode (with auto-reload):
\`\`\`bash
npm run dev
\`\`\`

Production mode:
\`\`\`bash
npm start
\`\`\`

The server will start on `http://localhost:5000`

### 6. Verify Installation

Check if the server is running:
\`\`\`bash
curl http://localhost:5000/api/health
\`\`\`

You should see:
\`\`\`json
{ "status": "Server is running" }
\`\`\`

## Troubleshooting

### MongoDB Connection Error

If you get a MongoDB connection error:
1. Ensure MongoDB is running locally or provide a valid cloud connection string
2. Check your MONGODB_URI in the .env file
3. Verify network connectivity if using MongoDB Atlas

### Port Already in Use

If port 5000 is already in use:
1. Change the PORT in .env file
2. Or kill the process using port 5000

### Module Not Found

If you get module not found errors:
1. Delete node_modules folder: `rm -rf node_modules`
2. Reinstall dependencies: `npm install`

## API Testing

Use tools like Postman or curl to test the API:

\`\`\`bash
# Get all signals
curl http://localhost:5000/api/signals

# Get all routes
curl http://localhost:5000/api/routes

# Get routes between cities
curl "http://localhost:5000/api/routes?startPoint=Guntur&endPoint=Bangalore"
\`\`\`

## Next Steps

1. Start the frontend development server
2. Open http://localhost:3000 in your browser
3. Begin using the Traffic Signal Management System
