import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

/*
Render the root of the React Dom at index.js. App.js will contain all of the routing code
*/

createRoot(document.getElementById('root')).render(
  <App />
)
