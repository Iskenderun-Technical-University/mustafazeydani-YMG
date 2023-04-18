import {
  BrowserRouter as Router, 
  Routes, 
  Route} from "react-router-dom";
import "./index.css" 
import React from 'react';
import NotFoundPage from "./components/NotFoundPage";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Admin from "./pages/admin/Admin";



function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage/>} />
            <Route path="/admin" element={<Login/>} />
            <Route path="/admin/dashboard" element={<Admin/>} />
            <Route path="/" element={<Main/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
