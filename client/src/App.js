import {
  BrowserRouter as Router, 
  Routes, 
  Route} from "react-router-dom";
import "./index.css" 
import React from 'react';
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Dashboard from "./pages/dashboard/Dashboard";
import Donor from "./pages/donor/Donor";



function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage/>} />
            <Route path="/admin" element={<Login/>} />
            <Route path="/admin/dashboard" element={<Dashboard/>} />
            <Route path="/" element={<Main/>} />
            <Route path="/donate" element={<Donor/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
