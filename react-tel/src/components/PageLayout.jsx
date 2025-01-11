//Author: Braden Vivas

import React from "react";
import SideBar from "./SideBar";
import "./PageLayout.css";


/*
    Persistent layout component for each page.
*/
function PageLayout({ children }) {
    return (
        <div className="container-fluid">
            <div className="version-bar"/>
            <div className="version-title">
                SSRTelemetry v0.0.1 - Rover UI for telemetry and autonomous control
            </div>
            <SideBar />
            <div className="page-content">
                {children}
            </div>
        </div>
    );
}

export default PageLayout;
