import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.js';
import EditAppointment from './components/EditAppointment.js';
import CreateAppointment from './components/CreateAppointment.js';

import './App.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Doctor Schedule Management</h1>
        <Routes>
          <Route
            path="/"
            element={<Home selectedDate={selectedDate} handleDateChange={handleDateChange} />}
          />
          <Route path="/edit-appointment/:id" element={<EditAppointment />} />
          <Route path="/create-appointment" element={<CreateAppointment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;