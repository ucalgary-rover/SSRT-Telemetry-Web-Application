import React, { useState, useEffect, useRef } from "react";

import "./TelemetryServerSetup.css";

import { UseSettingsGlobalState, DEFAULT_TELEMETRY_ADDRESS_URL
    , DEFAULT_TELEMETRY_QOS } from '../../context/SettingsContext.jsx';

function TelemetryServerSetup () {

    const { state, dispatch } = UseSettingsGlobalState();
    const telemetryServerAddressInputRef = useRef(null);
    const qosInputRef = useRef(null);

    // Sets default map setting on dispatch
    useEffect(() => {
        FetchState();
    }, [dispatch]);
    
    const updateTelemetryServerParams = (url, qos) => {
        if (telemetryServerAddressInputRef.current) {
            telemetryServerAddressInputRef.current.value = url;
        }
        if (qosInputRef.current) {
            qosInputRef.current.value = qos;
        }
        dispatch({ type: 'UPDATE_TELEMETRY_SETTINGS', payload: { 
            telemetry_url: url, telemetry_qos: qos} });
    }

    function ToDefaults () {
        updateTelemetryServerParams(DEFAULT_TELEMETRY_ADDRESS_URL, DEFAULT_TELEMETRY_QOS
        );
    }

    // uses global states made available by context layer
    function FetchState() {
        const url = state.telemetry_url || DEFAULT_TELEMETRY_ADDRESS_URL;
        const qos = state.telemetry_qos || DEFAULT_TELEMETRY_QOS;

        updateTelemetryServerParams(url, qos);
    }

    // Uses inputs to the form
    function SaveChanges () { 
        const url = telemetryServerAddressInputRef.current?.value || DEFAULT_TELEMETRY_ADDRESS_URL;
        const qos = qosInputRef.current?.value || DEFAULT_TELEMETRY_QOS;

        updateTelemetryServerParams(url, qos);
    }

    return  (
        <div className="container">
            <div className="menu-header">
                <h3>Telemetry Server</h3>
                <img src='bootstrap-icons/database-fill-gear.svg' alt="dbIcon" className="db-icon"/>
            </div>
            <div className="menu-content">
                <hr className="styled-line" />
                <button type="button" onClick={ToDefaults} className="btn btn-light btn-sm p-1 float-end me-10">Reset to defaults</button>
                <div className="form-group">
                    <label htmlFor="addressFormInput">MQTT Telemetry Server Address</label>
                    <input type="address" className="form-control" id="addressFormInput" 
                    placeholder="mqtt://hostname:port" ref={telemetryServerAddressInputRef}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="qosFormInput">QOS (Determines quality of service, ranges from 0-2)</label>
                    <input type="number" className="form-control" id="qosFormInput"
                    placeholder="0" min="0" max="2" ref={qosInputRef}/>
                </div>
                <div className="d-flex py-2" id="indicative">
                <button type="button" className="btn btn-dark btn-md" onClick={SaveChanges}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default TelemetryServerSetup