# Url-shortener MERN App

## Tech Stack
- React
- Node.js
- Express
- MongoDB

## Environment Variables

Create a `.env` file in backend:

```env
PORT=5000
BASE_URL=http://localhost:5000
FRONTEND_URL=your_frontend_url
MONGO_URI=mongodb://localhost:27017/url-merndb
```

Create a `.env` file in frontend:

```env
VITE_BACKEND_URL=http://localhost:5000
```

## Run Frontend
cd frontend
npm install
npm run dev

## Run Backend
cd backend
npm install
npm run dev