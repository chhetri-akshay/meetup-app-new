import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from "../src/components/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllEvent from './components/AllEvent';
import EventDetails from './components/EventDetails'

function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<AllEvent />} />
        <Route path="/eventDetails/:eventId" element={<EventDetails />} />
      </Routes>
    </>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);