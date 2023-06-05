import {
  BrowserRouter as Router, 
  Routes, 
  Route,
  Outlet,
  Navigate} from "react-router-dom";
import Panel from "./pages/panel/Panel";
import "./index.css" 
import React, {useContext} from 'react';
import { AuthContext } from "./context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/forms/Login";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Donor from "./pages/forms/Donor";
import RequestAid from "./pages/forms/RequestAid";
import Dreq from "./pages/donationRequests/Dreq"
import Areq from "./pages/aidRequests/Areq";
import AdminDhis from "./pages/adminDonationHistory/Dhis";
import PublicDhis from "./pages/publicDonationHistory/Dhis";


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

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    if(window.location.pathname!=='/admin' && window.location.pathname!=='/' && window.location.pathname!=='/donate' && window.location.pathname!=='/request-aid') {
      return <Navigate to={"/admin"}/>
    }
    return children   
  }
  else if(currentUser) {
    if(window.location.pathname==='/admin' || window.location.pathname==='/admin/') {
      return <Navigate to={"/admin/dashboard"}/>
    }
    return children
  }
}

function App() {
  return (
    <div className="app">
      <div className="container">
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }/>
          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Home />} />
            <Route path="donation-requests" element={<Dreq />} />             
            <Route path="aid-requests" element={<Areq />} />             
            <Route path="donation-history" element={<AdminDhis />} />             
          </Route>
          <Route path="/donate" element={<Donor />} />
          <Route path="/request-aid" element={<RequestAid />} />
          <Route path="/donation-history" element={<PublicDhis />} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;


