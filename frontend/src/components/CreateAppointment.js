import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    start_time: '',
    end_time: '',
    patient_name: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/appointments/create/`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="create-appointment p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="doctor" className="block font-semibold mb-1">Doctor ID:</label>
          <input
            type="number"
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-semibold mb-1">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="start_time" className="block font-semibold mb-1">Start Time:</label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end_time" className="block font-semibold mb-1">End Time:</label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="patient_name" className="block font-semibold mb-1">Patient Name:</label>
          <input
            type="text"
            id="patient_name"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Appointment</button>
      </form>
    </div>
  );
};

export default CreateAppointment;