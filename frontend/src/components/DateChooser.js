import React, { useState } from 'react';

const DateChooser = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Choose a date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border border-gray-300 rounded-md p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Submit</button>
    </form>
  );
};

export default DateChooser;
