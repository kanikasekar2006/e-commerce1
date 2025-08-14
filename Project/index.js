import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import Register from './Register';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard';
import ConfirmOrder from './ConfirmOrder';
import PaymentSuccess from './PaymentSuccess';
import About from './About';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/Login" element= {<Login/>}/>
    <Route path="/Dashboard" element={<Dashboard/>}/> 
     <Route path="/ConfirmOrder" element={<ConfirmOrder />} />
     <Route path="/payment-success" element={<PaymentSuccess />} />
    <Route path="/About" element={<About />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
