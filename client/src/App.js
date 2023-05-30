import {
  BrowserRouter as Router, 
  Routes, 
  Route} from "react-router-dom";
import "./index.css" 
import React from 'react';
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Donor from "./pages/forms/Donor";
import RequestAid from "./pages/forms/RequestAid";



function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage/>} />
            <Route path="/admin" element={<Login/>} />
            <Route path="/admin/dashboard" element={<Home/>} />
            <Route path="/" element={<Main/>} />
            <Route path="/donate" element={<Donor/>}/>
            <Route path="/request-aid" element={<RequestAid/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
