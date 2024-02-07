import React from 'react';
import { Link } from 'react-router-dom';
import DateChooser from './DateChooser';
import DayView from './DayView';

const Home = ({ selectedDate, handleDateChange }) => {
  return (
    <div>
      <div className="mb-4">
        <DateChooser onDateChange={handleDateChange} />
      </div>
      {selectedDate && <DayView date={selectedDate} />}
      <div className="mt-4">
        <Link to="/create-appointment" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Appointment</Link>
      </div>
    </div>
  );
};

export default Home;