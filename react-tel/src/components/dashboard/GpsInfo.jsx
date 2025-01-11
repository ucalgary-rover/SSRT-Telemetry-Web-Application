
/*
Authors: Marc Ty
*/

import React, { useState, useEffect, useRef } from 'react';
import './GpsInfo.css';

import { UseSettingsGlobalState } from '../../context/SettingsContext.jsx';

function GpsInfo() {
    // Provides access to user settings located in the settings menu
    const { state, dispatch } = UseSettingsGlobalState();
    const [ubloxmeta, setUbloxMeta] = useState(null);
    
    // For use with settings tab, when server parameters are changed
    useEffect(() => {
        // This use effect runs on inital render and when the settings are changed in the settings tab
    }, [state.telemetry_qos, state.telemetry_url]);
    
    return (
        <div className="gps-data-container">
            <div className="gps-data-header">
                <img src="/devices/ublox-gnss-antenna.png" alt="ublox-gnss" className="gps-image"/>
                <h6>u-blox GNSS antenna</h6>
            </div>
            <hr className="styled-line" />
            <div className="gps-data-entry"><strong>Latitude: {ubloxmeta?.latitude ?? "N/A"}</strong> </div>
            <div className="gps-data-entry"><strong>Longitude: {ubloxmeta?.longitude ?? "N/A"}</strong> </div>
            <div className="gps-data-entry"><strong>North/South: {ubloxmeta?.north_south ?? "N/A"}</strong> </div>
            <div className="gps-data-entry"><strong>East/West: {ubloxmeta?.east_west ?? "N/A"}</strong> </div>
            <div className="gps-data-entry"><strong>Speed: {ubloxmeta?.speed ?? "N/A"} m/s</strong> </div>
            <div className="gps-data-entry"><strong>Time: {ubloxmeta?.time ?? "N/A"}</strong> </div>
            <div className="gps-data-entry"><strong>Date: {ubloxmeta?.date ?? "N/A"}</strong> </div>
        </div>
    );
};

export default GpsInfo;
