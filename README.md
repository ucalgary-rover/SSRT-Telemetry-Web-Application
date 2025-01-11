# SSRTelemetry 

React app for viewing sensor data from a host server. Supports hot mode reloading with Docker (instant feedback on code change). Docker is used primarily to ensure clean dependencies and allow the React app to integrate with an out-of-the-box tile server solution built for Docker found here: https://hub.docker.com/r/maptiler/tileserver-gl.

## Run and build vite-react app

 The app is configured to run on port 4000. The app can be run standalone, for full functionality and integration with a map-tile-server run as docker. 

### Base standalone app
This app does not support tile map server.
1. Change directory into react-tel.
2. Run ```npm install```.
3. Run ```npm run dev```.

### React app + tile map server
Before running and building React app + tile map server, download Alberta maptiles from here: https://data.maptiler.com/downloads/tileset/osm/north-america/canada/alberta/. Paste the .mbtiles downloaded in "tile-serv" directory. Then change the name of the downloaded .mbtiles file to "alberta_source_tiles.mbtiles".

1. Install Docker and Docker-compose.

This can be done by installing Docker Desktop which has all the functionality needed to run Docker applications

See here:
https://docs.docker.com/compose/install/

Manual installs of Docker Engine can be done on Linux here. This allows Docker to be a Daemon (Normally Docker only runs when Docker Desktop is running):
https://docs.docker.com/engine/

2. While in the same directory as README.md, run ```docker-compose up```

3. This sets up the React + Vite app, reachable on http://localhost:4000 and tile map server (for viewing tiles on the map component within React).

4. Open the web app through the url. The app supports hmr which means changes to the source will change the web app.

5*. The tilemap server can also be opened on http://localhost:8080.

## Tests
The React vite app uses vitest to test the functionality of some components for the interface. These tests can be ran by either running the bash file tests.sh or running npm run test in a terminal while in the react-tel directory.

## Appendices 

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


