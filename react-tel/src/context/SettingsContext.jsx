// Hook implementation for storing parameter states

import React, { createContext, useReducer, useContext } from 'react';

// Inital parameters
export const DEFAULT_TILE_LAYER_URL = 'http://localhost:8080/styles/basic-preview/512/{z}/{x}/{y}.png';
// URL to express server that acts as an interface to the mqtt broker.
export const DEFAULT_TELEMETRY_ADDRESS_URL = 'http://localhost:4001'
export const DEFAULT_TELEMETRY_QOS = '0';

// Reducer function (consolidates a states update and fetch logic)
// Here this function manages the update and fetch states of settings
function SettingsReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_MAP_SETTINGS':
      return { ...state, tile_url: action.payload.tile_url }; // Update the state with the new URL  
    case 'UPDATE_TELEMETRY_SETTINGS':
      return { ...state, 
        telemetry_url: action.payload.telemetry_url,
        telemetry_qos: action.payload.telemetry_qos
      }; // Update the state with the new URL
    default:
      throw new Error('Unknown action type: Add a new action to SettingsContext');
  }
}

// Context is in charge of prop drilling or in simple terms sending
// data from one component to another component
const SettingsContext = createContext();

// Create a provider component
// This is what provides data access points to our components
// The provider has default settings
export function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(SettingsReducer, 
    {
      tile_url: DEFAULT_TILE_LAYER_URL,
      telemetry_url: DEFAULT_TELEMETRY_ADDRESS_URL,
      telemetry_qos: DEFAULT_TELEMETRY_QOS
    });

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function UseSettingsGlobalState() {
  return useContext(SettingsContext);
}