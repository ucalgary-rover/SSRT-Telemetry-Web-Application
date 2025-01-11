/*
Authors: Braden Vivas, Marc Ty
*/

import { Link, useNavigate, useLocation } from 'react-router-dom';

import "./SideBar.css";

/*
    Builds a sidebar for navigation
*/

function SideBar() {

    // Initialize location and navigation elements
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div id="sidebar">
            <button className="sidebar-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffCanvas" aria-controls="sidebarOffCanvas" />

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebarOffCanvas" aria-labelledby="sidebarOffCanvasLabel">
                <div className="offcanvas-header">
                    <div className="sidebar-header" id="sidebarOffCanvasLabel">
                        <img src="/ssrt/ssrt-logo.png" alt="team-logo"/>
                        <h3>Schulich Space Rover Team</h3>
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <hr className="styled-line" />

                <div className="offcanvas-body">
                    <ul className="sidebar-body">
                        <h3>SSRTelemetry</h3>
                        <li>
                            <div className={`${location.pathname === "/" ? "sidebar-active" : "sidebar-inactive"}`}>
                                <Link to="/" className="link">
                                    Home
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className={`${location.pathname === "/Dashboard" ? "sidebar-active" : "sidebar-inactive"}`}>
                                <Link to="/Dashboard" className="link">
                                    Dashboard
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className={`${location.pathname === "/Settings" ? "sidebar-active" : "sidebar-inactive"}`}>
                                <Link to="/Settings" className="link">
                                    Settings
                                </Link>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </div >
    );

}

export default SideBar;