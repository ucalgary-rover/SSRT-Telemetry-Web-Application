import React from 'react';

import TelemetryServerSetup from '../components/settings/TelemetryServerSetup';
import MapServerSetup from '../components/settings/MapServerSetup'

function Settings () {
    return (
        <div className="page-content">
            <div className="row">
                <div className="col-lg-6">
                    <div className="bg-light p-3">
                        <TelemetryServerSetup></TelemetryServerSetup>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="bg-light p-3">
                        <MapServerSetup></MapServerSetup>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;