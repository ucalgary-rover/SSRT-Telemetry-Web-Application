//Author: Braden Vivas

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NoPage from "./pages/NoPage";
import PageLayout from "./components/PageLayout";
import HomePage from "./pages/HomePage"
import Settings from "./pages/Settings";

import { SettingsProvider } from './context/SettingsContext';


/*

  Establishes all of the routes of the application.
  Each page has a route which can be navigated using the Navbar links or using the url
  Every main page has a Layout element attached to it for the Navbar
  An invalid page will navigate to NoPage.

*/

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PageLayout>
              <HomePage />
            </PageLayout>} />
          <Route path="/Dashboard" element={
            <PageLayout>
              <SettingsProvider>
                <Dashboard />
              </SettingsProvider>
            </PageLayout>} />
          <Route path="/Settings" element={
            <PageLayout>
              <SettingsProvider>
                <Settings />
              </SettingsProvider>
            </PageLayout>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

