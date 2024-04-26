import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './Front-end/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './Front-end/Profile';
import Watchlist from './Front-end/Watchlist';
import Sell from './Front-end/Sell';
import Messages from './Front-end/Messages';
import SignIn from './login/signin';
import SignOut from './login/signout';
import ListingPage from './Front-end/ListingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/signout" element={<SignOut/>} />
            <Route path="/listing/:id" element={<ListingPage />} /> 
            <Route path="/sell/:id" element={<Sell />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
