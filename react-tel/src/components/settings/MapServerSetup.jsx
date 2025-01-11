import React, { useState, useEffect, useRef} from "react";

import { UseSettingsGlobalState, DEFAULT_TILE_LAYER_URL } from '../../context/SettingsContext.jsx';
// Provides access to user settings located in the settings menu
import "./MapServerSetup.css";

// Tile Server URL
function MapServerSetup () {
    const { state, dispatch } = UseSettingsGlobalState();
    const mapServerAddressInputRef = useRef(null);

    // Sets default map setting on dispatch
    useEffect(() => {
        FetchState();
    }, [dispatch]);

    const updateMapServerParams = (url) => {
        if (mapServerAddressInputRef.current) {
            mapServerAddressInputRef.current.value = url;
        }
        dispatch({ type: 'UPDATE_MAP_SETTINGS', payload: { tile_url: url } });
    };

    function ToDefaults () {
        updateMapServerParams(DEFAULT_TILE_LAYER_URL);
    }

    // uses global states made available by context layer
    function FetchState() {
        const url = state.tile_url || DEFAULT_TILE_LAYER_URL;
        updateMapServerParams(url);
    }

    // Uses inputs to the form
    function SaveChanges () { 
        const url = mapServerAddressInputRef.current?.value || DEFAULT_TILE_LAYER_URL;
        updateMapServerParams(url);
    }

    return  (
        <div className="container">
            <div className="menu-header">
                <h3>Map Server</h3>
                <img src='bootstrap-icons/map-fill.svg' alt="mapIcon" className="map-icon"/>
            </div>
            <div className="menu-content">
                <hr className="styled-line" />
                <button onClick={ToDefaults} type="button" className="btn btn-light btn-sm p-1 float-end me-10">Reset to defaults</button>
                <div className="form-group">
                    <label htmlFor="mapServerAddressFormInput">Maptile Server Address</label>
                    <input type="address" className="form-control" id="mapServerAddressFormInput" 
                    placeholder="tile-server-url" ref={mapServerAddressInputRef}></input>
                </div>
                <div className="d-flex py-2" id="indicative">
                <button onClick={SaveChanges} type="button" className="btn btn-dark btn-md">Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default MapServerSetup
