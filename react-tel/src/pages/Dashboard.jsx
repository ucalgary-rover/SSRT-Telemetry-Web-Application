import React from 'react';
import {useEffect} from 'react';

import Map from '../components/dashboard/Map.jsx'
import GpsInfo from '../components/dashboard/GpsInfo.jsx'

import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="page-content">
            <div className="row">
                <div className="col-md-6">
                    <div className="bg-light p-3">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row">
                                <Map></Map>
                                <GpsInfo></GpsInfo>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard