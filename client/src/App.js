import {
  BrowserRouter as Router, 
  Routes, 
  Route,
  Outlet} from "react-router-dom";
import Panel from "./pages/panel/Panel";
import "./index.css" 
import React from 'react';
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/forms/Login";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Donor from "./pages/forms/Donor";
import RequestAid from "./pages/forms/RequestAid";
import Dreq from "./pages/donationRequests/Dreq"
import Areq from "./pages/aidRequests/Areq";
import Dhis from "./pages/donationHistory/Dhis";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Panel/>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="app">
      <div className="container">
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="donation-requests" element={<Dreq />} />             
            <Route path="aid-requests" element={<Areq />} />             
            <Route path="donation-history" element={<Dhis />} />             
          </Route>
          <Route path="/donate" element={<Donor />} />
          <Route path="/request-aid" element={<RequestAid />} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;


