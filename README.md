# Weather Information

Small fullstack project that uses openweathermap.org to display weather information
I've chosen the single-page application(SPA) approach for the frontend and the MVC(without views) architetural pattern for the backend
Used technologies: NodeJS, ExpressJS, MongoDB, Redis, Vue

### Configuration

## Backend

Make a copy from .env.example and rename it as .env and configure it
```
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct"
FORECAST_API_URL = "http://api.openweathermap.org/data/2.5/forecast"

OPEN_WEATHER_API_KEY=
SESSION_SECRET=
BACKEND_PORT=3000
```

Install depencies and start
```bash
$ npm install
$ npm run start
```

## Frontend

Again, make a copy from .env.example and rename it as .env and edit it as you wish
```
VITE_APP_BASE_URL=http://localhost:3000
VITE_ICON_URL=http://openweathermap.org/img/wn
```

Install depencies and start (feel free to build it instead)
```bash
$ npm install
$ npm run dev
```

My first decent README.md :)
