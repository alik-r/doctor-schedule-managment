import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../api';

const EditAppointment = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    patient_name: ''
  });

  useEffect(() => {
    fetchAppointment(id);
  }, [id]);

  const fetchAppointment = async (id) => {
    try {
      const response = await axios.get(`/api/appointments/${id}`);
      setAppointment(response.data);
      setFormData({
        date: response.data.date || '', 
        start_time: response.data.start_time || '', 
        end_time: response.data.end_time || '', 
        patient_name: response.data.patient_name || '' 
      });
    } catch (error) {
      console.error('Error fetching appointment:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/appointments/update/${id}/`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-appointment p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
      </form>
    </div>
  );
};

export default EditAppointment;